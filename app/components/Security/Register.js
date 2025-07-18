import React, {useState, useEffect, useContext} from 'react'
import Constants from 'expo-constants'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import Hornero from '../assets/Nidos/hornero-logo-fin-variables.png'
import btnCerrar from '../assets/btnCerrar.png'
import DeviceStorage from '../Shared/DeviceStorage'
import {config} from '../Config/Config'
import axios from 'axios'
import ModalSinConexion from '../Shared/ModalSinConexion'
import AppStateContext from '../Shared/AppStateContext'
import { supabase } from '../../lib/supabase'

const url = config.url.API_URL + 'register'

const theMargin = Constants.statusBarHeight + 30
export default function Register({navigation}) {
  const {currentUser, setCurrentUser, isConnected} = useContext(AppStateContext)
  const { navigate } = navigation;

  const [name, onChangeName] = useState('')
  const [lastname, onChangeLastName] = useState('')
  const [email, onChangeEmail] = useState('')
  const [passvalue, onChangePass] = useState('')
  const [expoToken, setExpoToken] = useState('')
  const [userMessage, setUserMessage] = useState('')

  const [errorName, setErrorName] = useState('')
  const [errorLastname, setErrorLastname] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    DeviceStorage.getItem('expoToken').then((result) => setExpoToken(result))
  }, [])

  const validateEmail = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const validateForm = () => {
    let vResult = true

    if (!validateEmail()) {
      setErrorEmail('El email ingresado es inválido.')
      vResult = false
    } else setErrorEmail('')

    if (name === '') {
      setErrorName('El nombre es obligatorio')
      vResult = false
    } else setErrorName('')

    if (lastname === '') {
      setErrorLastname('El apellido es obligatorio')
      vResult = false
    } else setErrorLastname('')

    if (passvalue === '') {
      setErrorPassword('La contraseña es obligatoria')
      vResult = false
    } else setErrorPassword('')

    return vResult
  }

  const register = () => {
    setIsLoading((prevState) => !prevState)
    setUserMessage('')

    if (validateForm()) {
      const data = {
        email: email,
        name: name,
        lastname: lastname,
        password: passvalue,
        expotoken: 'NoToken',
      }

      axios
        .post(url, data)
        .then(function (response) {
          setCurrentUser(response.data)

          const jsonValue = JSON.stringify(response.data)
          DeviceStorage.saveItem('userPersistance', jsonValue)

          navigate('Login')
        })
        .catch(function (error) {
          // TODO: Manejar errores de de la API
          console.log('ERROR API', error)
          navigate('Inicio')

          // Geovin
          // if (error.response) setUserMessage(error.response.data.message)
          // else if (error.request) setUserMessage(error.request)
          // else setUserMessage(error.message)
        })
    }
    setIsLoading((prevState) => !prevState)
  }

  const signUpWithEmail = async () => {
    setIsLoading((prevState) => !prevState)

    if (validateForm()) {
      const {
        data,
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: passvalue,
        email_confirm: true
      })
      if (error) setUserMessage(error.message);
      else {
        setUserMessage("");
        createProfile(data);
      };
    }
    setIsLoading((prevState) => !prevState)
  }

  const createProfile = async (data) => {
    const { data: profile, error } = await supabase.from('profiles').insert({
      email: email,
      first_name: name,
      last_name: lastname,
      user_id: data.user.id,
    }).select()
    if (error) setUserMessage(error.message);
    else {
      const user = {...data, profile: profile[0]};
      setCurrentUser(user);
      const jsonValue = JSON.stringify(user)
      DeviceStorage.saveItem('userPersistance', jsonValue)

      navigate('Login')
    }
  }

  //OFFLINE
  if (!isConnected) {
    return (
      <View style={styles.vwScreen}>
        <ModalSinConexion navigation={navigation} />
      </View>
    )
  }

  return (
    <View style={styles.vwScreen}>
      <ScrollView>
        <View style={{alignSelf: 'flex-end', paddingRight: 30, paddingTop: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={btnCerrar} />
          </TouchableOpacity>
        </View>
        <View style={styles.vwTop}>
          <Image source={Hornero} style={styles.imgLogo}></Image>
        </View>

        <View style={styles.vwMain}>
          <TextInput
            editable
            placeholder='Nombres'
            placeholderTextColor="#666"
            autoCompleteType='name'
            style={styles.textInput}
            maxLength={50}
            textContentType='givenName'
            onChangeText={(text) => onChangeName(text)}
          />
          {errorName !== '' && <Text style={styles.messages}>{errorName}</Text>}

          <TextInput
            placeholder='Apellido'
            placeholderTextColor="#666"
            editable
            maxLength={50}
            style={styles.textInput}
            textContentType='familyName'
            onChangeText={(text) => onChangeLastName(text)}
          />
          {errorLastname !== '' && <Text style={styles.messages}>{errorLastname}</Text>}

          <TextInput
            editable
            placeholder='Correo Electrónico'
            placeholderTextColor="#666"
            maxLength={50}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCompleteType='email'
            style={styles.textInput}
            textContentType='emailAddress'
            onChangeText={(text) => onChangeEmail(text)}
          />
          {errorEmail !== '' && <Text style={styles.messages}>{errorEmail}</Text>}

          <TextInput
            editable
            placeholder='Contraseña'
            placeholderTextColor="#666"
            autoCapitalize='none'
            style={styles.textInput}
            maxLength={50}
            textContentType='newPassword'
            onChangeText={(text) => onChangePass(text)}
            secureTextEntry={true}
          />
          {errorPassword !== '' && <Text style={styles.messages}>{errorPassword}</Text>}

          <Text style={styles.messages}>{userMessage}</Text>
          {isLoading ? (
            <ActivityIndicator size='large' color='#57AAF2' />
          ) : (
            <TouchableHighlight
              style={styles.btnLogin}
              activeOpacity={1}
              underlayColor='#767D91'
              onPress={signUpWithEmail}>
              <Text style={styles.txtButton}>Crear una cuenta</Text>
            </TouchableHighlight>
          )}
          <View style={{flex: 1}}></View>
          <TouchableHighlight
            style={styles.btnRegister}
            activeOpacity={1}
            underlayColor='#57AAF2'
            onPress={() => navigate('Login')}>
            <Text style={styles.txtButtonRegister}>Ya tengo una cuenta</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  imgLogo: {
    marginBottom: 20,
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
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BBC4DD',
    width: '90%',
    borderRadius: 5,
    paddingLeft: '3%',
    marginBottom: 20,
    color: '#000000'
  },
  btnLogin: {
    backgroundColor: '#00D7A2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 15,
  },
  btnRegister: {
    backgroundColor: '#FFF',
    width: '90%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 40,
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
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
    marginTop: theMargin,
  },
  vwTop: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  vwMain: {
    flex: 5,
    alignItems: 'center',
    paddingBottom: 30
  },
})
