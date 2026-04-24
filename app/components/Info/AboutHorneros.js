import React, {useState, useContext} from 'react'
import Constants from 'expo-constants'
import {StyleSheet, ScrollView, View, Text, Image, Modal, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AppStateContext from '../Shared/AppStateContext'
import logo from '../../components/assets/Nidos/hornero-logo-fin-variables.png'
import hornero_etapa3 from '../../components/assets/Nidos/formulario/etapa1/etapa3/HORNERO-VECTOR-11.png'

export default function AboutHorneros() {
  const {currentUser, setCurrentUser, isConnected} = useContext(AppStateContext)
  const navigation = useNavigation()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const openDeleteModal = () => {
    setIsDeleteModalVisible(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false)
  }

  const goToDeleteProfile = () => {
    closeDeleteModal()
    navigation.navigate('DeleteProfile')
  }

  return (
    <ScrollView style={styles.vwScreen}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={closeDeleteModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>¿Querés continuar?</Text>
            <Text style={styles.modalText}>
              Vas a ir a la sección donde podrás borrar tu cuenta de forma permanente.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.btnDeleteOk} onPress={goToDeleteProfile}>
                <Text style={styles.textBtnDeleteOk}>Sí, continuar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnCancelOk} onPress={closeDeleteModal}>
                <Text style={styles.textBtnCancelOk}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.vwMiddle}>
        <Image source={logo} style={styles.logoHornero} />
        <Text style={styles.titleBlue}>¿Qué es “HORNERO”?</Text>
        <Text style={styles.textParagraph}>
          Es un proyecto en el que los ciudadanos y las ciudadanas registramos el proceso de
          construcción de nidos de horneros (Furnarius rufus) para conocer más sobre el
          comportamiento de un ave típica de Argentina, Uruguay, Paraguay, Bolivia y Brasil.{'\n'}
          {'\n'}
          Buscamos además generar un vínculo entre la gente y la naturaleza con el objetivo de
          revalorizar la naturaleza que nos rodea en forma cotidiana.
        </Text>

        <Text style={styles.textParagraph}></Text>

        <Image source={hornero_etapa3} style={styles.imageHornero} />
        <Text style={styles.titleBlue}>¿Qué comportamiento estudiamos?</Text>
        <Text style={styles.textParagraph}>
          Queremos saber más sobre el comportamiento de construcción del nido y los factores
          ambientales que llevan a los horneros a construir su nido. ¿Por qué? Porque los horneros
          se caracterizan por construir ellos mismos sus nidos, y dependen directamente de la
          disponibilidad de agua para ello. Y porque los nidos de aves tienen un efecto directo
          sobre el éxito reproductivo y la supervivencia de los individuos. En el contexto de cambio
          climático, entender cómo y cuándo los horneros construyen sus nidos nos permitirá entender
          si los horneros pueden (o no) adaptarse a los cambios ambientales que se esperan.
        </Text>

        {currentUser && (
          <View style={styles.deleteSection}>
            <Text style={styles.textParagraph}>
              Si necesitás eliminar tu cuenta, podés iniciar el proceso desde aquí. Esta acción es
              permanente y te llevará a una pantalla de confirmación final.
            </Text>

            <TouchableOpacity style={styles.deleteButton} onPress={openDeleteModal}>
              <Text style={styles.deleteButtonText}>Borrar mi cuenta</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  vwScreen: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
  },
  vwMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  textParagraph: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: 'Roboto_400Regular',
  },
  titleBlue: {
    color: '#57AAF2',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: 'Roboto_700Bold',
    paddingVertical: 15,
    width: '100%',
  },
  logoHornero: {
    width: 270,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  imageHornero: {
    height: 230,
    width: 330,
    resizeMode: 'cover',
    marginBottom: 40,
  },
  deleteSection: {
    width: '100%',
    backgroundColor: '#F7FAFD',
    borderRadius: 12,
    padding: 20,
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#D6E7F5',
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#C40000',
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  deleteButtonText: {
    color: '#C40000',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalView: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#C40000',
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    lineHeight: 26,
    letterSpacing: 1.1,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#5A6072',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.28,
    fontFamily: 'Roboto_400Regular',
  },
  modalActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnDeleteOk: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#C40000',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 8,
  },
  btnCancelOk: {
    flex: 1,
    backgroundColor: '#767D91',
    borderColor: '#767D91',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginLeft: 8,
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
