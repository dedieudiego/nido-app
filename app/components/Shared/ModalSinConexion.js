import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, Modal} from 'react-native'
import imgSinConexion from '../assets/iconSinConexion.png'

export default function ModalSinConexion({navigation}) {
  const [isVisible, setModalIsVisible] = useState(true)

  const closeModal = () => {
    setModalIsVisible(!isVisible)
    navigation.goBack()
  }

  return (
    <Modal animationType='fade' transparent={true} visible={isVisible} onRequestClose={closeModal}>
      <View style={stylesModal.centeredView}>
        <View style={{...stylesModal.modalView, paddingTop: 50, paddingBottom: 50}}>
          <View style={{alignSelf: 'center'}}>
            <Image source={imgSinConexion} />
          </View>

          <Text style={stylesModal.modalTitle}>Error de conexión</Text>
          <Text style={stylesModal.modalText}>
            El acceso a esta función requiere una conexión activa a Internet
          </Text>

          <TouchableOpacity
            style={{...stylesModal.btnCancelOk, marginTop: 20, width: 165}}
            activeOpacity={0.3}
            onPress={closeModal}>
            <Text style={stylesModal.textBtnCancelOk}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

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
    color: '#C40000',
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    lineHeight: 26,
    letterSpacing: 1.1,
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
    fontFamily: 'Roboto_400Regular',
  },
})
