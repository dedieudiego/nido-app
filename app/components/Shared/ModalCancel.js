import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Modal} from 'react-native'

export default function ModalCancel({isVisible, onClose, onAccept}) {
  return (
    <Modal animationType='fade' transparent={true} visible={isVisible} onRequestClose={onClose}>
      <View style={stylesModal.centeredView}>
        <View style={stylesModal.modalView}>
          <Text style={stylesModal.modalTitleCancel}>¿Cancelar reporte?</Text>
          <Text style={stylesModal.modalText}>Si cancelás perderás los datos cargados</Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={stylesModal.btnDeleteOk} onPress={onAccept}>
              <Text style={stylesModal.textBtnDeleteOk}>Sí, cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stylesModal.btnCancelOk} onPress={onClose}>
              <Text style={stylesModal.textBtnCancelOk}>Volver</Text>
            </TouchableOpacity>
          </View>
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
    color: '#57AAF2',
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    lineHeight: 26,
    letterSpacing: 1.1,
  },
  modalTitleCancel: {
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
    padding: 10,
    marginRight: 10,
    width: 130,
  },
  btnCancelOk: {
    backgroundColor: '#767D91',
    borderColor: '#767D91',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
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
