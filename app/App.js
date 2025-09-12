import React, {useState, useEffect, useRef} from 'react'
import { StatusBar } from 'react-native';
import NavConfig from './components/Config/NavConfig'
import AppStateContext from './components/Shared/AppStateContext'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import DeviceStorage from './components/Shared/DeviceStorage'
import Moment from 'moment/min/moment-with-locales'
import { supabase } from './lib/supabase'
import NetInfo from '@react-native-community/netinfo'
import { navigate } from './components/Config/NavigationService'
import * as Location from 'expo-location'

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export default function App() {
  // CONTEXT
  const [currentUser, setCurrentUser] = useState(null)
  const [isConnected, setIsConnected] = useState(true)
  const [dataNidos, setDataNidos] = useState(null)
  const [updateDataNidos, setUpdateDataNidos] = useState(false)
  const [refreshStorage, setRefreshStorage] = useState(false);
  const [pendingNests, setPendingNests] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [location, setLocation] = useState(false);
  const watchId = useRef(null)

  const value = {
    currentUser,
    setCurrentUser,
    isConnected,
    setIsConnected,
    dataNidos,
    setDataNidos,
    updateDataNidos,
    setUpdateDataNidos,
    refreshStorage,
    setRefreshStorage,
    pendingNests,
    setPendingNests,
    syncing,
    setSyncing,
    location,
    isIOS,
    isAndroid
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permiso denegado')
        return
      }

      watchId.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        async (location) => {
          console.log("LOC", location);
          if (location.coords) {
            let geocode = await Location.reverseGeocodeAsync(location.coords)
            console.log("LOCATION", geocode);
      
            const ubicacion = {
              city: geocode[0].city,
              country: geocode[0].country,
              postalCode: geocode[0].postalCode,
              region: geocode[0].region,
              subregion: geocode[0].subregion,
              street: geocode[0].street,
              number: geocode[0].streetNumber,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
            setLocation(ubicacion)
          }
        }
      )
    })()

    // Limpieza cuando se desmonta el componente
    return () => {
      if (watchId.current) {
        watchId.current.remove()
      }
    }
  }, [])

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  const [session, setSession] = useState(null)

  const refreshSession = async() => {
    const { data, error } = await supabase.auth.refreshSession()

    const { data: profile } = await supabase.from('profiles')
      .select('*')
      .eq('user_id', data.user.id)
      .single()

    const user = {...data, profile};
    setCurrentUser(user)

    const jsonValue = JSON.stringify(user)
    DeviceStorage.saveItem('userPersistance', jsonValue)
  }

  const syncNests = () => {
    if (!syncing) {
      setSyncing(true);
      navigate('EndReport')
    };
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log("CHECK CONNECTION");
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      // setIsConnected(false);
    });

    return () => unsubscribe();
  }, []);

  //USER DATA INITILIZATION
  useEffect(() => {
    DeviceStorage.getItem('userPersistance').then((res) => {
      let user = JSON.parse(res)
      
      if (user) {
        if (Moment().isAfter(Moment(user.session.expires_at * 1000))) {
          refreshSession();
        } else setCurrentUser(user)

        DeviceStorage.getItem('nests').then((res) => {
          let nests = JSON.parse(res)

          if (nests?.length && nests.some((nest) => nest.step.profile_id === user.profile.id)) {
            setPendingNests(nests);
            setSyncing(false);
          } else {
            setPendingNests(null);
          }
        })
      }
    })
  }, [isConnected])

  useEffect(() => {
    if (currentUser) {
      setTimeout(() => {
        DeviceStorage.getItem('nests').then((res) => {
          let nests = JSON.parse(res);
    
          if (nests?.length && nests.some((nest) => nest.step.profile_id === currentUser.profile.id)) {
            setPendingNests(nests);
          } else {
            setPendingNests(null);
          }
        })
        setRefreshStorage(false);
      }, 2000)
    }
  }, [refreshStorage])

  useEffect(() => {
    if (isConnected && pendingNests && !syncing) {
      setTimeout(syncNests, 1000)
    }
  }, [isConnected, pendingNests])

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando fuentes...</Text>
      </View>
    )
  }

  return (
    <AppStateContext.Provider value={value}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      {!isConnected && <View style={{...styles.warning, marginTop: isIOS ? 60 : 0}}>
        <Text style={{textAlign: 'center'}}>No tienes conexión a internet</Text>  
      </View>}
      {isConnected && pendingNests?.length && <TouchableOpacity disabled={syncing} onPress={syncNests} style={{...styles.pendingNests, marginTop: isIOS ? 60 : 0, opacity: syncing ? 0.5 : 1}}>
        <Text style={styles.btnGeneralText}>{syncing ? 'Sincronizando nidos...' : 'Tienes nidos para sincronizar, haz click aquí'}</Text>
      </TouchableOpacity>}
      <NavConfig />
    </AppStateContext.Provider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: 'white',
  },
  warning: {
    width: '100%',
    backgroundColor: 'red',
    padding: 6,
    zIndex: 9
  },
  pendingNests: {
    width: '100%',
    padding: 6,
    backgroundColor: '#57AAF2',
    zIndex: 9
  },
  btnGeneralText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
