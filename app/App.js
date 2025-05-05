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
import {View, Text, StyleSheet} from 'react-native'
import DeviceStorage from './components/Shared/DeviceStorage'
import Moment from 'moment/min/moment-with-locales'
import { supabase } from './lib/supabase'

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  //USER DATA INITILIZATION
  useEffect(() => {
    DeviceStorage.getItem('userPersistance').then((res) => {
      let user = JSON.parse(res)
      
      if (user) {
        if (Moment().isAfter(Moment(user.session.expires_at * 1000))) {
          refreshSession();
        } else setCurrentUser(user)
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
})
