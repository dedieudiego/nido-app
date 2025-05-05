import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text, TouchableHighlight, Image, Modal} from 'react-native'
import imagenCuentaEliminada from '../assets/imagenCuentaEliminada.png'
import DeviceStorage from '../Shared/DeviceStorage'
import {config} from '../Config/Config'
import axios from 'axios'
import ModalSinConexion from '../Shared/ModalSinConexion'
import AppStateContext from '../Shared/AppStateContext'
import {useNavigation} from '@react-navigation/native'

var url = config.url.API_URL + 'user'

export default function DeleteProfile() {
  const navigation = useNavigation()
  const {currentUser, setCurrentUser, isConnected} = useContext(AppStateContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalOkVisible, setModalOkVisible] = useState(false)

  const deleteAccount = () => {
    setModalVisible((prev) => !prev)

    if (currentUser) {
      axios
        .delete(url, {headers: {Authorization: `Bearer ${currentUser.access_token}`}})
        .then(function (response) {
          setModalOkVisible(!modalOkVisible)
        })
        .catch(function (error) {
          if (error.response) {
            //error.response.data.message
          } else if (error.request) {
            //error.request
          } else {
            //error.message
          }
        })
    }
  }

  const exitToInit = () => {
    setCurrentUser(null)
    DeviceStorage.removeItem('userPersistance').then(setModalOkVisible(!modalOkVisible))
    setModalOkVisible((prev) => !prev)
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
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <Text style={stylesModal.modalTitle}>¿Seguro que quieres continuar?</Text>
            <Text style={stylesModal.modalText}>Tu cuenta no se podrá recuperar</Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                style={stylesModal.btnDeleteOk}
                activeOpacity={1}
                underlayColor='#FFFFFF'
                onPress={deleteAccount}>
                <Text style={stylesModal.textBtnDeleteOk}>Sí, continuar</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={stylesModal.btnCancelOk}
                activeOpacity={1}
                underlayColor='#FFFFFF'
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={stylesModal.textBtnCancelOk}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalOkVisible}
        onRequestClose={exitToInit}>
        <View style={stylesModal.centeredView}>
          <View style={{...stylesModal.modalView, paddingTop: 50, paddingBottom: 50}}>
            <View style={{alignSelf: 'center'}}>
              <Image source={imagenCuentaEliminada} />
            </View>
            <Text style={stylesModal.modalTitle}>Cuenta eliminada</Text>
            <Text style={stylesModal.modalText}>
              Tu cuenta ha sido eliminada. Ya no tendrás acceso a tus datos.
            </Text>

            <TouchableHighlight
              style={{...stylesModal.btnCancelOk, marginTop: 20, width: 165}}
              activeOpacity={1}
              underlayColor='#FFFFFF'
              onPress={exitToInit}>
              <Text style={stylesModal.textBtnCancelOk}>Continuar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View style={{flex: 1}}></View>

      <View style={styles.vwMain}>
        <View style={{flex: 3, alignSelf: 'flex-start', marginLeft: '7%', marginRight: '7%'}}>
          <Text style={styles.textAviso}>
            Al borrar tu cuenta, se eliminarán de nuestra base de datos toda la información sobre
            tus credenciales de acceso, tu nombre, tu apellido, tu número de teléfono y tu correo
            electrónico. Tené en cuenta que una vez eliminada tu cuenta ya no podrás deshacer esta
            acción y perderás todo acceso a los datos que hayas reportado, sin posibilidad de
            recuperarlos.
          </Text>
        </View>

        <TouchableHighlight
          style={styles.btnDelete}
          activeOpacity={1}
          underlayColor='#FFFFFF'
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textBtnDelete}>Borrar mi cuenta</Text>
        </TouchableHighlight>

        <View style={{flex: 0.1}}></View>
      </View>

      <View style={styles.vwBottom}></View>
      <View style={{flex: 0.2}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  textAviso: {
    fontSize: 14,
    color: '#5A6072',
    lineHeight: 25,
    letterSpacing: 0.28,
    fontFamily: 'Roboto_400Regular',
  },
  textBtnDelete: {
    color: '#C40000',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  btnDelete: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C40000',
    borderWidth: 1,
    width: '90%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
  },
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  vwMain: {
    flex: 5,
    alignItems: 'center',
  },
  vwBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    padding: 35,
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
    color: '#C40000',
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
    backgroundColor: '#5A6072',
    borderColor: '#5A6072',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 20,
    width: 130,
  },
  textBtnCancelOk: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
  textBtnDeleteOk: {
    color: '#C40000',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
