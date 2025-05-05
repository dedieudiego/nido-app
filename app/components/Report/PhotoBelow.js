import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, BackHandler, Image} from 'react-native'
import Constants from 'expo-constants'
import ModalCancel from '../Shared/ModalCancel'
import photo from '../../components/assets/Nidos/formulario/etapa1/q6/photo.png'
import BtnGeneral from './BtnGeneral'

const theMargin = Constants.statusBarHeight + 60
export default function PhotoBelow({navigation}) {
  const [cancelModal, setCancelModal] = useState(false)
  useEffect(() => {
    const backAction = () => {
      setCancelModal((prev) => !prev)
      return true
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [])

  const onCancelReport = () => {
    setCancelModal((prev) => !prev)
    navigation.navigate('Inicio')
  }

  return (
    <View style={styles.vwScreen}>
      <ModalCancel
        isVisible={cancelModal}
        onClose={() => setCancelModal((prev) => !prev)}
        onAccept={onCancelReport}
      />

      <Text style={styles.textTitle}>Por favor, sacá una foto del nido que descubriste</Text>
      <Image source={photo} style={styles.imgPicture}></Image>
      <BtnGeneral
        action={() => {
          navigation.navigate('CameraBelow')
        }}
        text='Tomar una foto'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  vwScreen: {
    alignItems: 'center',
    marginTop: theMargin,
    height: '100%',
  },
  imgPicture: {
    marginBottom: 20,
  },
  textTitle: {
    color: '#5A6072',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'Roboto_700Bold',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
})
