import React, {useEffect, useState, useContext} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import Constants from 'expo-constants'
import DeviceStorage from '../Shared/DeviceStorage'
import {config} from '../Config/Config'
import axios from 'axios'
import ModalSinConexion from '../Shared/ModalSinConexion'
import AppStateContext from '../Shared/AppStateContext'

var url = config.url.API_URL + 'user'

export default function MyProfile({navigation}) {
  const {currentUser, setCurrentUser, isConnected} = useContext(AppStateContext)
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userMessage, setUserMessage] = useState('')

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setLastname(currentUser.lastname)
      setPhone(currentUser.phone)
      setEmail(currentUser.email)
    }
  }, [])

  const validateEmail = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const validateForm = () => {
    setUserMessage('Cargando...')
    let vResult = true

    if (!validateEmail()) {
      setUserMessage('Email no válido')
      vResult = false
    } else setUserMessage('')

    if (name === '') {
      setUserMessage('El nombre es obligatorio.')
      vResult = false
    } else setUserMessage('')

    if (lastname === '') {
      setUserMessage('El apellido es obligatorio.')
      vResult = false
    } else setUserMessage('')

    return vResult
  }

  const saveProfile = () => {
    setIsLoading(true)

    if (validateForm()) {
      const data = {name: name, lastname: lastname, phone: phone, token: currentUser.access_token}
      axios
        .put(url, data)
        .then(function (response) {
          setCurrentUser(response.data)
          setUserMessage('')

          const jsonValue = JSON.stringify(response.data)
          DeviceStorage.removeItem('userPersistance').then((res) => {
            DeviceStorage.saveItem('userPersistance', jsonValue).then(
              navigation.navigate('ProfileIn')
            )
          })
        })
        .catch(function (error) {
          if (error.response) {
            setUserMessage(error.response.data.message)
          } else if (error.request) {
            setUserMessage(error.request)
          } else {
            setUserMessage(error.message)
          }
        })
    }
    setIsLoading(false)
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
      <View style={styles.vwScreen}>
        <View style={{alignItems: 'center'}}>
          <View style={{alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>Nombre</Text>
          </View>

          <TextInput
            editable
            maxLength={50}
            style={styles.textInput}
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <View style={{alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>Apellido</Text>
          </View>

          <TextInput
            editable
            maxLength={50}
            style={styles.textInput}
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />

          <View style={{alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>Teléfono</Text>
          </View>

          <TextInput
            editable
            maxLength={40}
            style={styles.textInput}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <View style={{alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>
              Correo Electrónico (este dato no se puede cambiar)
            </Text>
          </View>

          <View style={{alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>{email}</Text>
          </View>

          <Text style={styles.messages}>{userMessage}</Text>

          <TouchableHighlight
            style={styles.btnSave}
            activeOpacity={1}
            underlayColor='#FFFFFF'
            onPress={saveProfile}>
            {isLoading ? (
              <ActivityIndicator size='large' color='#FFFFFF' />
            ) : (
              <Text style={styles.txtButton}>Guardar</Text>
            )}
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#FFFFFF'
            onPress={() => navigation.navigate('DeleteProfile')}>
            <Text style={styles.textBtnDelete}>Quiero eliminar mi cuenta</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  messages: {
    width: '90%',
    textAlign: 'center',
    color: '#57AAF2',
    fontSize: 12,
    marginTop: 15,
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BBC4DD',
    width: '90%',
    borderRadius: 5,
    paddingLeft: '3%',
  },
  textLabelInput: {
    textAlign: 'left',
    color: '#5A6072',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Roboto_400Regular',
  },
  textBtnDelete: {
    color: '#C40000',
    fontSize: 12,
    marginTop: 40,
    fontFamily: 'Roboto_400Regular',
  },
  btnSave: {
    backgroundColor: '#57AAF2',
    width: '90%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 30,
  },
  txtButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 60,
  },
})
