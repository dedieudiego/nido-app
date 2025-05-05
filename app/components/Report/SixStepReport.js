import React, {useContext, useState} from 'react'
import {StyleSheet, View, Text, ScrollView, PanResponder} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import BtnGeneral from './BtnGeneral'

export default function SixStepReport({navigation}) {
  const {dataNidos, setDataNidos} = useContext(AppStateContext)
  const [selectedHeight, setSelectedHeight] = useState(dataNidos.altura ? dataNidos.altura : 20)

  const continueReport = (e) => {
    setDataNidos({...dataNidos, altura: selectedHeight})
    navigation.navigate('PhotoBelow')
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const {dy} = gestureState
      const adjustmentFactor = 0.2 // Ajusta este valor para cambiar la sensibilidad
      const newHeight = Math.max(0, Math.min(40, selectedHeight - dy * adjustmentFactor))
      setSelectedHeight(Math.round(newHeight))
    },
  })

  return (
    <View style={{flex: 1, marginTop: Constants.statusBarHeight + 60}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>¿A qué altura estimás que está el nido?</Text>
        </View>

        <View style={styles.vwMain}>
          <View style={styles.bar}>
            <View
              style={[styles.point, {bottom: `${(selectedHeight / 40) * 100}%`}]}
              {...panResponder.panHandlers}
            />
          </View>
          <Text style={styles.selectedHeight}>
            <Text>Altura seleccionada:</Text> {Math.floor(selectedHeight)} metros
          </Text>

          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport()
              }}
              text={'Guardar'}
            />
          </View>
        </View>
      </View>
    </View>
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
    paddingTop: 30,
  },
  btnContainer: {
    marginBottom: 20,
    paddingTop: 30,
  },
  bar: {
    width: 2,
    height: 200,
    backgroundColor: '#ccc',
    position: 'relative',
  },
  point: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#57AAF2',
    position: 'absolute',
    left: -13,
  },
  selectedHeight: {
    paddingTop: 15,
    color: '#666',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
  },
})
