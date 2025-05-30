import React, {useState, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native'
import Constants from 'expo-constants'
import imagenMensajeEnviado from '../assets/imagenMensajeEnviado.png'
import ModalSinConexion from '../Shared/ModalSinConexion'
import AppStateContext from '../Shared/AppStateContext'
import { supabase } from '../../lib/supabase'

const theMargin = Constants.statusBarHeight + 80

export default function PassRecovery({navigation}) {
  const {isConnected} = useContext(AppStateContext)
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorMail] = useState('')
  const [modalOkVisible, setModalOkVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = () => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const sendPassRecovery = async () => {
    setIsLoading((prev) => !prev)
    setErrorMail('')
    if (validateEmail()) {
      const data = {email: email}

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: 'com.nidohorneros://ChangePass'
        // redirectTo: 'exp://127.0.0.1:8081/--/ChangePass'
      });

      if (error) setErrorMail('Encontramos un error. Por favor intenta más tarde.');
      else {
        setModalOkVisible(!modalOkVisible)
        setIsLoading(false);
      };
    } else {
      setErrorMail('El email ingresado es inválido.')
      setIsLoading(false)
    }
  }

  const exitPassRecovery = () => {
    setModalOkVisible(!modalOkVisible)
    navigation.goBack()
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
          onRequestClose={exitPassRecovery}>
          <View style={stylesModal.centeredView}>
            <View style={{...stylesModal.modalView, paddingTop: 50, paddingBottom: 50}}>
              <View style={{alignSelf: 'center'}}>
                <Image source={imagenMensajeEnviado} />
              </View>

              <Text style={stylesModal.modalTitle}>Revisa tu correo</Text>

              <Text style={stylesModal.modalText}>
                Hemos enviado un correo a tu dirección para que puedas recuperar tu contraseña.
              </Text>

              <TouchableHighlight
                style={{...stylesModal.btnCancelOk, width: 165}}
                activeOpacity={1}
                underlayColor='#FFFFFF'
                onPress={exitPassRecovery}>
                <Text style={stylesModal.textBtnCancelOk}>Continuar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <View style={styles.vwMain}>
          <TextInput
            editable
            placeholder='Correo electrónico'
            placeholderTextColor="#999"
            maxLength={40}
            autoCompleteType='email'
            style={styles.textInput}
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            onChangeText={(text) => setEmail(text)}
          />
          {errorEmail !== '' && <Text style={styles.messages}>{errorEmail}</Text>}

          <TouchableHighlight
            style={styles.btnLogin}
            activeOpacity={1}
            underlayColor='#000000'
            disabled={isLoading}
            onPress={sendPassRecovery}>
            {isLoading ? (
              <ActivityIndicator size='large' color='#FFFFFF' />
            ) : (
              <Text style={styles.txtButton}>Recuperar contraseña</Text>
            )}
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
  btnLogin: {
    backgroundColor: '#00D7A2',
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
    color: '#00D7A2',
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
    backgroundColor: '#00D7A2',
    borderColor: '#00D7A2',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 20,
    width: 130,
  },
  textBtnCancelOk: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
