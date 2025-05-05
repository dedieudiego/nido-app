import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Modal,
  Image,
} from 'react-native'
import Constants from 'expo-constants'
import {config} from '../Config/Config'
import axios from 'axios'
import DeviceStorage from '../Shared/DeviceStorage'
import imagenMensajeEnviado from '../assets/imagenMensajeEnviado.png'
import ModalSinConexion from '../Shared/ModalSinConexion'
import AppStateContext from '../Shared/AppStateContext'

const theMargin = Constants.statusBarHeight + 80
var url = config.url.API_URL + 'changepassword'

export default function PassChanger({navigation}) {
  const {currentUser, setCurrentUser, isConnected} = useContext(AppStateContext)
  const [actualPass, setActualPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [repeatNewPass, setRepeatNewPass] = useState('')

  const [errorActual, setErrorActual] = useState('')
  const [errorNew, setErrorNew] = useState('')
  const [errorNewRepeat, setErrorNewRepeat] = useState('')
  const [modalOkVisible, setModalOkVisible] = useState(false)

  const validateForm = () => {
    let vResult = true

    if (actualPass === '') {
      setErrorActual('La contraseña actual es obligatoria.')
      vResult = false
    } else setErrorActual('')

    if (newPass === '') {
      setErrorNew('La nueva contraseña es obligatoria')
      vResult = false
    } else setErrorNew('')

    if (repeatNewPass === '') {
      setErrorNewRepeat('Repetir nueva contraseña es obligatorio')
      vResult = false
    } else setErrorNewRepeat('')

    if (newPass !== repeatNewPass) {
      setErrorNewRepeat('Las contraseñas nuevas deben coincidir')
      setErrorNew('Las contraseñas nuevas deben coincidir')
      vResult = false
    } else setErrorNewRepeat('')

    return vResult
  }

  const sendPassChanger = () => {
    if (validateForm()) {
      const data = {token: currentUser.access_token, currentpass: actualPass, newpass: newPass}

      axios
        .put(url, data)
        .then(function (response) {
          DeviceStorage.removeItem('userPersistance')
          setCurrentUser(null)
          setModalOkVisible(!modalOkVisible)
        })
        .catch(function (error) {
          if (error.response) {
            setErrorNewRepeat(error.response.data.message)
          } else if (error.request) {
            setErrorNewRepeat(error.request)
          } else {
            setErrorNewRepeat(error.message)
          }
        })
    }
  }

  const exitPassChanger = () => {
    setModalOkVisible(!modalOkVisible)
    navigation.navigate('Inicio')
  }

  //OFFLINE
  if (!isConnected) {
    return (
      <ScrollView style={{marginTop: theMargin}}>
        <View style={styles.vwScreen}>
          <ModalSinConexion navigation={navigation} />
        </View>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalOkVisible}
          onRequestClose={exitPassChanger}>
          <View style={stylesModal.centeredView}>
            <View style={{...stylesModal.modalView, paddingTop: 50, paddingBottom: 50}}>
              <View style={{alignSelf: 'center'}}>
                <Image source={imagenMensajeEnviado} />
              </View>
              <Text style={stylesModal.modalTitle}>Contraseña modificada</Text>
              <Text style={stylesModal.modalText}>Deberás volver a ingresar.</Text>

              <TouchableHighlight
                style={{...stylesModal.btnCancelOk, marginTop: 20, width: 165}}
                underlayColor='#FFFFFF'
                onPress={exitPassChanger}>
                <Text style={stylesModal.textBtnCancelOk}>Continuar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <View style={styles.vwMain}>
          <View style={{flex: 0.15, alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>Contraseña actual</Text>
          </View>

          <TextInput
            editable
            maxLength={40}
            style={styles.textInput}
            textContentType='password'
            secureTextEntry={true}
            onChangeText={(text) => setActualPass(text)}
          />
          {errorActual !== '' && <Text style={styles.messages}>{errorActual}</Text>}

          <View style={{flex: 0.15, alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>Tu nueva contraseña</Text>
          </View>

          <TextInput
            editable
            maxLength={40}
            style={styles.textInput}
            textContentType='password'
            secureTextEntry={true}
            onChangeText={(text) => setNewPass(text)}
          />
          {errorNew !== '' && <Text style={styles.messages}>{errorNew}</Text>}

          <View style={{flex: 0.15, alignSelf: 'flex-start', marginLeft: '7%'}}>
            <Text style={styles.textLabelInput}>Repetir nueva contraseña</Text>
          </View>

          <TextInput
            editable
            maxLength={40}
            style={styles.textInput}
            textContentType='password'
            secureTextEntry={true}
            onChangeText={(text) => setRepeatNewPass(text)}
          />
          {errorNewRepeat !== '' && <Text style={styles.messages}>{errorNewRepeat}</Text>}

          <TouchableHighlight
            style={styles.btnLogin}
            activeOpacity={1}
            underlayColor='#000000'
            onPress={sendPassChanger}>
            <Text style={styles.txtButton}>Guardar</Text>
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
  },
  textLabelInput: {
    textAlign: 'left',
    color: '#5A6072',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Roboto_400Regular',
  },
  btnLogin: {
    backgroundColor: '#57AAF2',
    width: '90%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 10,
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
  },
  vwMain: {
    flex: 5,
    alignItems: 'center',
  },
  text: {
    color: '#5A6072',
    textAlign: 'center',
  },
})

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 55,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 30,
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#5A6072',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 30,
    letterSpacing: 0.28,
    fontFamily: 'Roboto_400Regular',
  },
  modalTitle: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#57AAF2',
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    lineHeight: 26,
    letterSpacing: 1.1,
  },
  btnDeleteOk: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C40000',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 20,
    marginRight: 10,
    width: 130,
  },
  btnCancelOk: {
    backgroundColor: '#57AAF2',
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    width: 130,
  },
  textBtnCancelOk: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  textBtnDeleteOk: {
    color: '#C40000',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
