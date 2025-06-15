import React, {useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import hornero_q4 from '../../components/assets/Nidos/formulario/etapa1/q4/HORNERO-VECTOR-10.png'
import BtnGeneral from './BtnGeneral'

const theMargin = Constants.statusBarHeight + 30
export default function FourthStepReport({navigation}) {
  const {dataNidos, setDataNidos} = useContext(AppStateContext)

  const continueReport = (e) => {
    setDataNidos({...dataNidos, tipoDeFuente: e})
    navigation.navigate('FiveStepReport')
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>La/s fuente/s de agua es/son:</Text>
        </View>

        <View style={styles.vwMain}>
          <Image source={hornero_q4} style={styles.imageHornero} />

          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('artificial')
              }}
              isSelected={dataNidos?.tipoDeFuente === 'artificial' && true}
              text={'Artificial'}
              subtitle={'Ej: canilla, acequia, canal, sistema de riego.'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('natural')
              }}
              isSelected={dataNidos?.tipoDeFuente === 'natural' && true}
              text={'Natural'}
              subtitle={'Ej: arroyo, lago, charco de lluvia, río.'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('natural-artificial')
              }}
              isSelected={dataNidos?.tipoDeFuente === 'natural-artificial' && true}
              text={'Natural y artificial'}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: '#5A6072',
    fontSize: 20,
    textAlign: 'left',
    lineHeight: 28,
    fontFamily: 'Roboto_700Bold',
    paddingHorizontal: 20,
  },
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  vwMain: {
    flex: 7,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 150,
    resizeMode: 'contain',
  },
  imageHornero: {
    width: 320,
    resizeMode: 'contain',
  },
  btnContainer: {
    marginBottom: 20,
  },
})
