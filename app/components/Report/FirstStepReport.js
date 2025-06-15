import React, {useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import hornero_etapa1 from '../../components/assets/Nidos/formulario/etapa1/q1/HORNERO-VECTOR-02.png'
import hornero_etapa2 from '../../components/assets/Nidos/formulario/etapa1/q1/HORNERO-VECTOR-05.png'
import hornero_etapa3 from '../../components/assets/Nidos/formulario/etapa1/etapa3/HORNERO-VECTOR-11.png'
import hornero_etapa4 from '../../components/assets/Nidos/formulario/etapa1/etapa4/HORNERO-VECTOR-13.png'
import BtnGeneral from './BtnGeneral'

const theMargin = Constants.statusBarHeight + 30
export default function FirstStepReport({navigation}) {
  const {dataNidos, setDataNidos} = useContext(AppStateContext)

  const continueReport = (e) => {
    setDataNidos({...dataNidos, actividad: e})
    navigation.navigate('SecondStepReport')
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>¿Qué actividad de construcción ves?</Text>
        </View>

        <View style={styles.vwMain}>
          {dataNidos?.estadio === 1 && (
            <Image source={hornero_etapa1} style={styles.imageHornero} />
          )}
          {dataNidos?.estadio === 2 && (
            <Image source={hornero_etapa2} style={styles.imageHornero} />
          )}
          {dataNidos?.estadio === 3 && (
            <Image source={hornero_etapa3} style={styles.imageHornero} />
          )}
          {dataNidos?.estadio === 4 && (
            <Image source={hornero_etapa4} style={styles.imageHornero} />
          )}

          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('barro-fresco')
              }}
              isSelected={dataNidos?.actividad === 'barro-fresco' && true}
              text={'Hay barro fresco sobre el nido'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('llevando-barro')
              }}
              isSelected={dataNidos?.actividad === 'llevando-barro' && true}
              text={'Hay horneros llevando barro'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('con-actividad')
              }}
              isSelected={dataNidos?.actividad === 'con-actividad' && true}
              text={'Hay horneros sobre el nido'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('sin-actividad')
              }}
              isSelected={dataNidos?.actividad === 'sin-actividad' && true}
              text={'No hay actividad, solo veo un nido'}
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
    paddingBottom: 40,
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
    width: 350,
    resizeMode: 'contain',
  },
  btnContainer: {
    marginBottom: 20,
  },
})
