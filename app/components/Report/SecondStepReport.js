import React, {useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import hornero_q2 from '../../components/assets/Nidos/formulario/etapa1/q2/HORNERO-VECTOR-06.png'
import BtnGeneral from './BtnGeneral'

const theMargin = Constants.statusBarHeight + 60
export default function SecondStepReport({navigation}) {
  const {dataNidos, setDataNidos} = useContext(AppStateContext)

  const continueReport = (e) => {
    setDataNidos({...dataNidos, lluvia: e})
    navigation.navigate('ThirdStepReport')
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>¿Sabes si llovió recientemente?</Text>
        </View>

        <View style={styles.vwMain}>
          <Image source={hornero_q2} style={styles.imageHornero} />

          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('ultimas-24hs')
              }}
              isSelected={dataNidos?.lluvia === 'ultimas-24hs' && true}
              text={'Si, en las últimas 24 hs.'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('ultimas-48hs')
              }}
              isSelected={dataNidos?.lluvia === 'ultimas-48hs' && true}
              text={'Si, en las últimas 48 hs.'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('no-llovio')
              }}
              isSelected={dataNidos?.lluvia === 'no-llovio' && true}
              text={'No ha llovido'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('no-estoy-seguro-si-llovio')
              }}
              isSelected={dataNidos?.lluvia === 'no-estoy-seguro-si-llovio' && true}
              text={'No sé si llovió'}
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
