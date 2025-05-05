import React, {useEffect, useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'
import {FontAwesome} from '@expo/vector-icons'
import AppStateContext from '../Shared/AppStateContext'
import { supabase } from '../../lib/supabase'
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer'

import hornero_etapa1 from '../../components/assets/Nidos/formulario/etapa1/q1/HORNERO-VECTOR-02.png'
import hornero_etapa2 from '../../components/assets/Nidos/formulario/etapa1/q1/HORNERO-VECTOR-05.png'
import hornero_etapa3 from '../../components/assets/Nidos/formulario/etapa1/etapa3/HORNERO-VECTOR-11.png'
import hornero_etapa4 from '../../components/assets/Nidos/formulario/etapa1/etapa4/HORNERO-VECTOR-13.png'

const theMargin = Constants.statusBarHeight + 60

export default function EndReport({navigation, route}) {
  const {currentUser, dataNidos, updateDataNidos} = useContext(AppStateContext)
  const { navigate } = navigation;

  const uploadImageToSupabase = async(uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    const fileName = `${currentUser.profile.id}-${Date.now()}.jpg`;
  
    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(fileName, decode(base64), {
        contentType: 'image/jpg'
      })
  
    if (error) {
      return null;
    }

    return data;
  }

  const createNest = async(step) => {
    const image = await uploadImageToSupabase(dataNidos.photo.uri)
    
    const { data, error } = updateDataNidos 
      ? { data: null, error: null }
      : await supabase.from('nests').insert({
          name: dataNidos.ubicacion?.city,
          profile_id: step.profile_id,
          last_step: step.step
        }).select()

    if (error) {
      console.log("ERROR", error);
    } else {
      const { data: location, error: locationError } = await supabase.from('locations').insert({
        city: dataNidos.ubicacion.city,
        country: dataNidos.ubicacion.country,
        postal_code: dataNidos.ubicacion.postalCode,
        latitude: dataNidos.ubicacion.latitude,
        longitude: dataNidos.ubicacion.longitude,
        region: dataNidos.ubicacion.region,
        subregion: dataNidos.ubicacion.subregion,
      }).select()

      if (location?.length && !locationError) {
        const { error: stepError } = await supabase.from('nests_steps').insert({
          ...step,
          image: image.fullPath,
          nest_id: updateDataNidos ? dataNidos.id : data[0].id,
          location_id: location[0].id
        })
        if (stepError) console.log("ERROR", stepError);
      }
    };
  };

  useEffect(() => {
    const nestStep = {
      profile_id: currentUser.profile.id,
      step: dataNidos.estadio,
      height: dataNidos.altura,
      activity: dataNidos.actividad,
      context: dataNidos.contexto,
      water_source: dataNidos.fuente === "si",
      type_of_source: dataNidos.tipoDeFuente,
      entry: dataNidos.nido
    }
    
    createNest(nestStep);
  }, [])

  // TODO: ENPOINT PARA GUARDAR LA DATA DE dataNidos.
  //Si devuelve un 200 mostrar la pantalla de Excelente si no, se tiene que crear una pantalla o popups
  //que diga que se no se guardaron por n error.

  return (
    <ScrollView style={{marginTop: theMargin}}>
      <View style={styles.vwScreen}>
        <View style={{flex: 1}}>
          <Text style={styles.textTitle}>¡Excelente!</Text>
          {updateDataNidos ? (
            <>
              <Text style={styles.textSubTitle}>
                ¡Se cargo exitosamente la etapa {dataNidos?.estadio}, felicitaciones!
              </Text>
              {dataNidos?.estadio !== 4 ? (
                <Text style={styles.textSubTitle}>
                  Recordá continuar el seguimiento de tu nido. ¡Muchas gracias!
                </Text>
              ) : (
                <Text style={styles.textSubTitle}>
                  Te agradecemos el seguimiento del nido.<br />
                  Esperamos que pronto encuentres otro nido que cargar.
                </Text>
              )}
            </>
          ) : (
            <>
              <Text style={styles.textSubTitle}>
                ¡Se cargó exitosamente tu nido en la app, felicitaciones!
              </Text>
              {dataNidos?.estadio !== 4 && (
                <Text style={styles.textSubTitle}>
                  Recordá continuar el seguimiento de tu nido. ¡Muchas gracias!
                </Text>
              )}
            </>
          )}
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

          <TouchableOpacity
            style={styles.btnMarron}
            onPress={() => {
              navigate('Inicio')
            }}>
            <FontAwesome name='home' style={{color: '#FFFFFF', fontSize: 20, marginEnd: 10}} />
            <Text style={styles.btnMarronText}>VOLVER AL HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: '#57AAF2',
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: 'Roboto_700Bold',
    paddingHorizontal: 20,
  },
  textSubTitle: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Roboto_400Regular',
    paddingHorizontal: 30,
    paddingTop: 20,
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
    width: 350,
    resizeMode: 'contain',
  },
  btnMarron: {
    backgroundColor: '#CD8C59',
    width: 330,
    height: 57,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnMarronText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
})
