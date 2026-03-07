import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import Hornero from '../assets/Nidos/hornero-logo-fin-variables.png'
import btnCerrar from '../assets/btnCerrar.png'
import IconFacebook from '../assets/iconFacebook.png'
import IconGoogle from '../assets/iconGoogle.png'

import Constants from 'expo-constants'
import {config} from '../Config/Config'
import DeviceStorage from '../Shared/DeviceStorage'
import ModalSinConexion from '../Shared/ModalSinConexion'
import AppStateContext from '../Shared/AppStateContext'
import { supabase } from '../../lib/supabase'

const url = config.url.API_URL + 'login'

WebBrowser.maybeCompleteAuthSession()

export default function Login({route, navigation}) {
  const {currentUser, setCurrentUser, isConnected} = useContext(AppStateContext)
  const { navigate } = navigation;

  const [isLogged, setIsLogged] = useState('')
  const [username, onChangeUser] = useState('')
  const [passvalue, onChangePass] = useState('')
  const [expoToken, setExpoToken] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [backToParam, setBackTo] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    //TODO >> SACAR ESTO Y TOMARLO DEL CONTEXT
    DeviceStorage.getItem('expoToken').then((result) => setExpoToken(result))
    //---------
    if (route.params) {
      var {backTo} = route.params
      setBackTo(backTo)
    }
  }, [])

  const validateForm = () => {
    let vResult = true

    if (username === '') {
      setErrorEmail('El correo electrónico es obligatorio')
      vResult = false
    } else setErrorEmail('')

    if (passvalue === '') {
      setErrorPassword('La contraseña es obligatoria')
      vResult = false
    } else setErrorPassword('')

    return vResult
  }

  const login = async () => {
    setIsLoading(true)
    if (validateForm()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: passvalue,
      })
      if (error) setIsLogged(error.message);
      else {
        const { data: profile } = await supabase.from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single()

        const user = {...data, profile};
        setCurrentUser(user)
  
        const jsonValue = JSON.stringify(user)
        DeviceStorage.saveItem('userPersistance', jsonValue)
  
        navigate('Inicio')
      }
    }
    setIsLoading(false)
  }

  const createProfile = async (data, userInfo) => {
    const { email, givenName, familyName } = userInfo;

    const { data: profile, error } = await supabase.from('profiles').insert({
      email: email,
      first_name: givenName,
      last_name: familyName,
      user_id: data.user.id,
    }).select()

    if (error) setUserMessage(error.message);
    else {
      const user = {...data, profile: profile[0]};
      setCurrentUser(user);
      const jsonValue = JSON.stringify(user)
      DeviceStorage.saveItem('userPersistance', jsonValue)

      navigate('Inicio')
    }
  }

  const googleLogin = async () => {
    const redirectTo = Linking.createURL('auth/callback')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true
      }
    })

    if (error) {
      console.log(error)
      return
    }

    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectTo
    )

    if (result.type === 'success') {

      const fragment = result.url.split('#')[1]

      const params = new URLSearchParams(fragment)

      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token
      })

      if (sessionError) {
        return setIsLogged(sessionError.message);
      }

      if (sessionData.user) {
        const { data: profile } = await supabase.from('profiles')
          .select('*')
          .eq('user_id', sessionData.user.id)
          .single()
        
        if (!profile) {
          const {full_name, email} = sessionData.user.user_metadata;

          const parts = full_name.split(' ')

          const givenName = parts[0]
          const familyName = parts.slice(1).join(' ')

          createProfile(sessionData, { givenName, familyName, email });
        } else {
          const user = {...sessionData, profile};
          setCurrentUser(user)
    
          const jsonValue = JSON.stringify(user)
          DeviceStorage.saveItem('userPersistance', jsonValue)
    
          navigate('Inicio')
        }
      }
    }
  }

  //OFFLINE
  if (!isConnected) {
    return (
      <ScrollView style={{marginTop: Constants.statusBarHeight}}>
        <View style={styles.vwScreen}>
          <ModalSinConexion navigation={navigation} />
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight}}>
      <View style={{alignSelf: 'flex-end', paddingRight: 30, paddingTop: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={btnCerrar} />
        </TouchableOpacity>
      </View>
      <View style={styles.vwScreen}>
        <View style={styles.vwTop}>
          <Image source={Hornero} style={styles.imgLogo}></Image>

          <Text style={styles.txtTitle}>Iniciar Sesión</Text>
        </View>

        <View style={styles.vwMain}>
          <TextInput
            editable
            maxLength={40}
            autoCompleteType='email'
            placeholder='Ingresá tu correo electrónico'
            placeholderTextColor="#666"
            style={styles.textInput}
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            onChangeText={(text) => onChangeUser(text)}
          />
          {errorEmail !== '' && <Text style={styles.messages}>{errorEmail}</Text>}

          <TextInput
            editable
            maxLength={40}
            placeholder='Ingresá tu contraseña'
            placeholderTextColor="#666"
            style={styles.textInput}
            textContentType='password'
            onChangeText={(text) => onChangePass(text)}
            secureTextEntry={true}
          />
          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#FFFFFF'
            onPress={() => navigation.navigate('PassRecovery')}>
            <Text style={styles.txtButtonForgot}>¿Olvidaste tu contraseña?</Text>
          </TouchableHighlight>

          {errorPassword !== '' && <Text style={styles.messages}>{errorPassword}</Text>}
          {isLogged !== '' && <Text style={styles.messages}>{isLogged}</Text>}

          <TouchableHighlight
            style={styles.btnLogin}
            activeOpacity={1}
            underlayColor='#767D91'
            onPress={login}>
            {isLoading ? (
              <ActivityIndicator size='large' color='#FFFFFF' />
            ) : (
              <Text style={styles.txtButton}>INGRESAR</Text>
            )}
          </TouchableHighlight>
        </View>

        <View style={styles.socialLogin}>
            <TouchableHighlight
              style={styles.btnSocial}
              activeOpacity={0.5}
              underlayColor='#ffffff'
              onPress={googleLogin}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Image source={IconGoogle} />
                <Text>Vincular con mi cuenta Google</Text>
              </View>
            </TouchableHighlight>

            {/* <TouchableHighlight
              style={styles.btnSocial}
              activeOpacity={1}
              onPress={() => console.log("Google")}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <Image source={IconFacebook} />
                <Text>Vincular con mi cuenta Facebook</Text>
              </View>
            </TouchableHighlight> */}
        </View>

        <View style={styles.vwBottom}>
          <TouchableHighlight
            style={styles.btnRegister}
            activeOpacity={1}
            underlayColor='#57AAF2'
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.txtButtonRegister}>Crear una cuenta nueva</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imgLogo: {
    marginBottom: 70,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BBC4DD',
    width: '90%',
    borderRadius: 10,
    paddingLeft: '3%',
    marginVertical: 10,
    color: '#000000',
  },
  txtTitle: {
    color: '#57AAF2',
    fontSize: 20,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 15,
  },
  messages: {
    width: '90%',
    textAlign: 'center',
    color: 'red',
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 5,
  },
  btnLogin: {
    backgroundColor: '#00D7A2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 35,
  },
  btnRegister: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 80,
    borderWidth: 1,
    borderColor: '#00D7A2',
  },
  txtButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
  txtButtonRegister: {
    color: '#00D7A2',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
  txtButtonForgot: {
    color: '#5A6072',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  vwScreen: {
    justifyContent: 'center',
    marginTop: 50,
  },
  vwTop: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  vwMain: {
    alignItems: 'center',
  },
  vwBottom: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  socialLogin: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 20
  },
  btnSocial: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Roboto_500Medium',
  }
})
