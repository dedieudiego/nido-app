import React, {useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import hornero_der from '../../components/assets/Nidos/formulario/etapa1/q8/der/HORNERO-VECTOR-07.png'
import hornero_izq from '../../components/assets/Nidos/formulario/etapa1/q8/izq/HORNERO-VECTOR-07.png'

const theMargin = Constants.statusBarHeight + 60
export default function SevenStepReport({navigation, route}) {
  const {dataNidos, setDataNidos} = useContext(AppStateContext)

  const continueReport = (e) => {
    setDataNidos({...dataNidos, nido: e})
    navigation.navigate('EndReport')
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>Si mirás el nido de frente, ¿dónde tiene la entrada?</Text>
        </View>

        <View style={styles.vwMain}>
          <TouchableOpacity
            style={[
              styles.btnLogin,
              {marginTop: 20},
              dataNidos?.nido === 'nido-derecha' && styles.BtnSelected,
            ]}
            onPress={() => continueReport('nido-derecha')}>
            <Image source={hornero_der} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnLogin,
              {marginTop: 20},
              dataNidos?.nido === 'nido-izquierda' && styles.BtnSelected,
            ]}
            onPress={() => continueReport('nido-izquierda')}>
            <Image source={hornero_izq} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: '#5A6072',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'Roboto_700Bold',
    paddingHorizontal: 20,
  },
  btnLogin: {
    width: '90%',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    justifyContent: 'center',
  },
  BtnSelected: {
    backgroundColor: '#ccc',
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
})
