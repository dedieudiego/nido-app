import React, {useState, useEffect} from 'react'
import NavConfig from './components/Config/NavConfig'
import AppStateContext from './components/Shared/AppStateContext'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import DeviceStorage from './components/Shared/DeviceStorage'
import Moment from 'moment/min/moment-with-locales'
import { supabase } from './lib/supabase'
import NetInfo from '@react-native-community/netinfo'
import { navigate } from './components/Config/NavigationService'

export default function App() {
  // CONTEXT
  const [currentUser, setCurrentUser] = useState(null)
  const [isConnected, setIsConnected] = useState(true)
  const [dataNidos, setDataNidos] = useState(null)
  const [updateDataNidos, setUpdateDataNidos] = useState(false)

  const value = {
    currentUser,
    setCurrentUser,
    isConnected,
    setIsConnected,
    dataNidos,
    setDataNidos,
    updateDataNidos,
    setUpdateDataNidos,
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  const [session, setSession] = useState(null)
  const [pendingNests, setPendingNests] = useState(null)

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
    navigate('EndReport')
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
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  //USER DATA INITILIZATION
  useEffect(() => {
    DeviceStorage.getItem('userPersistance').then((res) => {
      let user = JSON.parse(res)
      
      if (user) {
        console.log("USER", user);
        if (Moment().isAfter(Moment(user.session.expires_at * 1000))) {
          refreshSession();
        } else setCurrentUser(user)

        DeviceStorage.getItem('nests').then((res) => {
          let nests = JSON.parse(res)

          if (nests?.length && nests.some((nest) => nest.step.profile_id === user.profile.id)) {
            setPendingNests(nests);
          } else {
            setPendingNests(null);
          }
        })
      }
    })
  }, [])

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando fuentes...</Text>
      </View>
    )
  }

  return (
    <AppStateContext.Provider value={value}>
      {!isConnected && <View style={styles.warning}>
        <Text style={{textAlign: 'center'}}>No tienes conexión a internet</Text>  
      </View>}
      {isConnected && pendingNests && <TouchableOpacity onPress={syncNests} style={styles.pendingNests}>
        <Text style={styles.btnGeneralText}>Tienes nidos para sincronizar, haz click aquí</Text>  
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
    marginTop: 60,
    padding: 6,
    zIndex: 9
  },
  pendingNests: {
    width: '100%',
    padding: 6,
    backgroundColor: '#57AAF2',
    zIndex: 9,
    marginTop: 60
  },
  btnGeneralText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
