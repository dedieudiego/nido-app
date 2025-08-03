import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import BtnGeneral from './BtnGeneral'
import * as Location from 'expo-location'

const theMargin = Constants.statusBarHeight + 30
export default function SetName({navigation, route}) {
  const {dataNidos, setDataNidos, updateDataNidos} = useContext(AppStateContext)
  const [name, setName] = useState("Nuevo nido");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const continueReport = () => {
    setDataNidos({...dataNidos, nombre: name})
    navigation.navigate('EndReport');
  }

  const relocate = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Permiso denegado')
      setError('Permiso para compartir ubicación denegado. Revisar permisos en los settings de tu celular')
      return
    };

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    })
    let geocode = await Location.reverseGeocodeAsync(location.coords)

    const ubicacion = {
      city: geocode[0].city,
      country: geocode[0].country,
      postalCode: geocode[0].postalCode,
      region: geocode[0].region,
      subregion: geocode[0].subregion,
      street: geocode[0].street,
      number: geocode[0].streetNumber,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setDataNidos({...dataNidos, ubicacion})
    setLoading(false);
  }

  useEffect(() => {
    let locationName = dataNidos.ubicacion?.city ?? 'Ciudad no encontrada';
    if (dataNidos.ubicacion?.street) {
      locationName += ` - ${dataNidos.ubicacion.street}`;
      if (dataNidos.ubicacion?.number) locationName += ` ${dataNidos.ubicacion.number}`;
    };
    setName(locationName);
  }, [dataNidos])

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>Cómo querés llamar a este nido?</Text>
          <Text style={styles.textSubTitle}>
            Considerá que podés encontrar varios nidos cercanos entre si, es importante que puedas distinguirlos individualmente para su seguimiento
          </Text>
        </View>

        <View style={styles.vwMain}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TouchableOpacity style={{...styles.btnGeneral, opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto'}} onPress={relocate}>
            {loading && <ActivityIndicator size='large' color='#57AAF2' />}
            {!loading && (
              <>
                <Text style={{ color: '#57AAF2', textAlign: 'center' }}>Relocalizar</Text>
                {!!error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
              </>
            )}
          </TouchableOpacity>
          <BtnGeneral
            action={() => {
              continueReport()
            }}
            isDisabled={!name}
            text={'Guardar nido'}
          />
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
  input: {
    width: 330,
    height: 57,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    borderColor: '#000000',
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 60
  },
  btnGeneral: {
    borderColor: '#57AAF2',
    borderWidth: 2,
    width: 330,
    height: 57,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20
  },
})
