import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'
import Constants from 'expo-constants'

import AppStateContext from '../Shared/AppStateContext'

import hornero_q5 from '../../components/assets/Nidos/formulario/etapa1/q5/HORNERO-VECTOR-15.png'

import BtnGeneral from './BtnGeneral'

import * as Location from 'expo-location'

const isIOS = Platform.OS === 'ios';
const theMargin = isIOS ? Constants.statusBarHeight + 60 : Constants.statusBarHeight + 30

export default function FiveStepReport({navigation, route}) {
  const {currentUser, dataNidos, setDataNidos, updateDataNidos} = useContext(AppStateContext)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    ;(async () => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permiso para acceder a la ubicación fue denegado')
        return
      }

      // let location = await Location.getCurrentPositionAsync({})
      // let geocode = await Location.reverseGeocodeAsync(location.coords)
      // let city = geocode[0].city

      // const ubicacion = [
      //   {
      //     city: geocode[0].city,
      //     country: geocode[0].country,
      //     postalCode: geocode[0].postalCode,
      //     region: geocode[0].region,
      //     subregion: geocode[0].subregion,
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude
      //   },
      // ]
      // setLocation(ubicacion)
    })()
  }, [])

  const continueReport = (e) => {
    if (updateDataNidos) {
      setDataNidos({...dataNidos, contexto: e})
      navigation.navigate('PhotoBelow')
    } else {
      setDataNidos({...dataNidos, contexto: e})
      navigation.navigate('SixStepReport')
    }
  }

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>El nido se encuentra en un contexto:</Text>
        </View>

        <View style={styles.vwMain}>
          <Image source={hornero_q5} style={styles.imageHornero} />

          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('urbano')
              }}
              isSelected={dataNidos?.contexto === 'urbano' && true}
              text={'Urbano'}
              subtitle={'Grandes y pequeñas ciudades'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('rural')
              }}
              isSelected={dataNidos?.contexto === 'rural' && true}
              text={'Rural'}
              subtitle={'Áreas no urbanizadas, zonas agropecuarias y agroindustriales'}
            />
          </View>
          <View style={styles.btnContainer}>
            <BtnGeneral
              action={() => {
                continueReport('natural')
              }}
              text={'Natural'}
              isSelected={dataNidos?.contexto === 'natural' && true}
              subtitle={'Entorno no modificado por el hombre'}
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
    width: 320,
    resizeMode: 'contain',
  },
  btnContainer: {
    marginBottom: 20,
  },
})
