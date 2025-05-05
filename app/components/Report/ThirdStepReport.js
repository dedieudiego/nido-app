import React, {useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import hornero_q3 from '../../components/assets/Nidos/formulario/etapa1/q3/AGUA-VECTOR-08.png'

const theMargin = Constants.statusBarHeight + 60
export default function ThirdStepReport({navigation, route}) {
  const {dataNidos, setDataNidos} = useContext(AppStateContext)

  const continueReport = (e) => {
    if (e === 'si') {
      setDataNidos({...dataNidos, fuente: e})
      navigation.navigate('FourthStepReport')
    } else {
      setDataNidos({...dataNidos, fuente: e})
      navigation.navigate('FiveStepReport')
    }
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>
            ¿Ves una fuente de agua a menos de 50 metros del nido?
          </Text>
          <Text style={styles.textSubTitle}>
            Ejemplo: arroyo, charco de lluvia, lago, canilla, sistema de riego.
          </Text>
        </View>

        <View style={styles.vwMain}>
          <Image source={hornero_q3} style={styles.imageHornero} />

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btnGeneral, dataNidos?.fuente === 'si' && styles.BtnSelected]}
              onPress={() => {
                continueReport('si')
              }}>
              <Text style={styles.btnGeneralText}>Si</Text>
            </TouchableOpacity>
            <View style={{width: 10}}></View>
            <TouchableOpacity
              style={[styles.btnGeneralOutline, dataNidos?.fuente === 'no' && styles.BtnSelected]}
              onPress={() => {
                continueReport('no')
              }}>
              <Text style={styles.btnGeneralTextOutline}>No</Text>
            </TouchableOpacity>
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
  textSubTitle: {
    color: '#5A6072',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 22,
    fontFamily: 'Roboto_400Regular',
    paddingHorizontal: 20,
    paddingTop: 10,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnGeneral: {
    backgroundColor: '#57AAF2',
    width: '45%',
    height: 57,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  BtnSelected: {
    backgroundColor: '#57AAF299',
  },
  btnGeneralOutline: {
    borderColor: '#57AAF2',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '45%',
    height: 57,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnGeneralText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  btnGeneralTextOutline: {
    color: '#57AAF2',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
