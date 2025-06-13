import React, {useContext, useEffect} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'

import etapa1 from '../../components/assets/Nidos/etapas/Estadio1.png'
import etapa2 from '../../components/assets/Nidos/etapas/Estadio2.png'
import etapa3 from '../../components/assets/Nidos/etapas/Estadio3.png'
import etapa4 from '../../components/assets/Nidos/etapas/Estadio4.png'

export default function ReportIntro({navigation, route}) {
  const {dataNidos, setDataNidos, isConnected} = useContext(AppStateContext)
  const item = route.params?.item

  useEffect(() => {
    if (item) {
      const newItem = {
        estadio: item.last_step,
        id: item.id,
      }
      setDataNidos(newItem)
    } else {
      setDataNidos(null)
    }
  }, [])

  const startReport = (e) => {
    setDataNidos({...dataNidos, estadio: e})
    navigation.navigate('FirstStepReport')
  }

  const renderButton = (estadio, image, text, isDisabled) => {
    const ButtonComponent = isDisabled ? View : TouchableOpacity
    return (
      <ButtonComponent
        key={estadio}
        style={[styles.btnLogin]}
        onPress={!isDisabled ? () => startReport(estadio) : undefined}>
        {/* {isConnected ?  */}
          <Image source={image} style={!isDisabled ? styles.image : styles.imageOff} /> 
          {/* : <View style={{...styles.offlineButton, opacity: isDisabled ? 0.5 : 1}}>
              <Text style={styles.buttonTitle}>{text}</Text>
              <Text style={styles.buttonSubtitle}>Etapa {estadio}</Text>
            </View>
        } */}
      </ButtonComponent>
    )
  }

  const buttons = [
    {estadio: 1, image: etapa1, text: "Recién empieza"},
    {estadio: 2, image: etapa2, text: "En progreso"},
    {estadio: 3, image: etapa3, text: "Avanzado"},
    {estadio: 4, image: etapa4, text: "Casi terminado"},
  ]

  return (
    <ScrollView style={styles.vwMain}>
      <View style={styles.vwScreen}>
        <Text style={styles.textTitle}>¿En qué estadío de construcción está el nido?</Text>
      </View>

      {buttons.map(({estadio, image, text}) =>
        renderButton(estadio, image, text, item?.last_step && estadio <= item.last_step)
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  vwMain: {
    marginTop: Constants.statusBarHeight + 60,
    marginBottom: 40,
  },
  textTitle: {
    color: '#5A6072',
    fontSize: 20,
    textAlign: 'left',
    lineHeight: 28,
    fontFamily: 'Roboto_700Bold',
  },
  btnLogin: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  image: {
    width: 340,
    height: 150,
    resizeMode: 'contain',
    margin: 'auto'
  },
  imageOff: {
    width: 340,
    height: 150,
    opacity: 0.6,
    resizeMode: 'contain',
    margin: 'auto'
  },
  offlineButton: {
    width: 'calc(100% - 20px)',
    height: 80,
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#5A6072',
    borderRadius: 8
  },
  buttonTitle: {
    color: '#5A6072',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
  buttonSubTitle: {
    color: '#5A6072',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular'
  },
})
