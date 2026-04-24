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
  Platform,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import Hornero from '../assets/Nidos/hornero-logo-fin-variables.png'
import btnCerrar from '../assets/btnCerrar.png'
import IconGoogle from '../assets/iconGoogle.png'
import IconApple from '../assets/iconApple.png'

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
  const [oauthProviderLoading, setOauthProviderLoading] = useState('')

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

    if (error) setIsLogged(error.message);
    else {
      const user = {...data, profile: profile[0]};
      setCurrentUser(user);
      const jsonValue = JSON.stringify(user)
      DeviceStorage.saveItem('userPersistance', jsonValue)

      navigate('Inicio')
    }
  }

  const buildUserInfoFromOAuth = (user, provider) => {
    const metadata = user?.user_metadata || {}
    const identityData = user?.identities?.find((identity) => identity.provider === provider)?.identity_data || {}

    const metadataFullName = metadata.full_name || metadata.name || identityData.full_name || identityData.name || ''
    const fullNameParts = metadataFullName.split(' ').filter(Boolean)

    const email = metadata.email || identityData.email || user?.email || ''
    const emailBase = email.split('@')[0] || ''
    const emailParts = emailBase.split(/[._-]/).filter(Boolean)

    const fallbackGivenName = emailParts[0] || 'Usuario'
    const fallbackFamilyName = emailParts.slice(1).join(' ') || (provider === 'apple' ? 'Apple' : 'Social')

    const givenName =
      metadata.given_name ||
      metadata.first_name ||
      identityData.given_name ||
      identityData.first_name ||
      fullNameParts[0] ||
      fallbackGivenName

    const familyName =
      metadata.family_name ||
      metadata.last_name ||
      identityData.family_name ||
      identityData.last_name ||
      fullNameParts.slice(1).join(' ') ||
      fallbackFamilyName

    return {
      email,
      givenName,
      familyName,
    }
  }

  const oauthLogin = async (provider) => {
    setOauthProviderLoading(provider)

    const redirectTo = Linking.createURL('auth/callback')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        scopes: provider === 'apple' ? 'name email' : undefined,
      }
    })

    if (error) {
      setOauthProviderLoading('')
      return setIsLogged(error.message)
    }

    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectTo
    )

    if (result.type === 'success') {
      const query = result.url.split('?')[1]?.split('#')[0] || ''
      const queryParams = new URLSearchParams(query)
      const code = queryParams.get('code')

      let sessionData
      let sessionError

      if (code) {
        const response = await supabase.auth.exchangeCodeForSession(code)
        sessionData = response.data
        sessionError = response.error
      } else {
        const fragment = result.url.split('#')[1] || ''
        const params = new URLSearchParams(fragment)

        const access_token = params.get('access_token')
        const refresh_token = params.get('refresh_token')

        if (!access_token || !refresh_token) {
          setOauthProviderLoading('')
          return setIsLogged('No se pudo completar la autenticacion social.')
        }

        const response = await supabase.auth.setSession({
          access_token,
          refresh_token
        })

        sessionData = response.data
        sessionError = response.error
      }

      if (sessionError) {
        setOauthProviderLoading('')
        return setIsLogged(sessionError.message);
      }

      if (sessionData.user) {
        const { data: profile } = await supabase.from('profiles')
          .select('*')
          .eq('user_id', sessionData.user.id)
          .single()
        
        if (!profile) {
          const userInfo = buildUserInfoFromOAuth(sessionData.user, provider)
          createProfile(sessionData, userInfo);
        } else {
          const user = {...sessionData, profile};
          setCurrentUser(user)
    
          const jsonValue = JSON.stringify(user)
          DeviceStorage.saveItem('userPersistance', jsonValue)
    
          navigate('Inicio')
        }
      }
    }

    setOauthProviderLoading('')
  }

  const googleLogin = async () => oauthLogin('google')
  const appleLogin = async () => oauthLogin('apple')

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
                <Text>{oauthProviderLoading === 'google' ? 'Conectando con Google...' : 'Vincular con mi cuenta Google'}</Text>
              </View>
            </TouchableHighlight>

            {Platform.OS === 'ios' && (
              <TouchableHighlight
                style={styles.btnSocial}
                activeOpacity={0.5}
                underlayColor='#ffffff'
                onPress={appleLogin}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <Image source={IconApple} />
                  <Text>{oauthProviderLoading === 'apple' ? 'Conectando con Apple...' : 'Vincular con mi cuenta Apple'}</Text>
                </View>
              </TouchableHighlight>
            )}
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
  },
  appleIcon: {
    width: 18,
    height: 18,
    borderRadius: 10,
    backgroundColor: '#111111',
    color: '#FFFFFF',
    textAlign: 'center',
    overflow: 'hidden',
    fontFamily: 'Roboto_700Bold',
  }
})
