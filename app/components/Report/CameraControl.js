import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import imgPhotoAbove from '../../components/assets/Nidos/formulario/etapa1/q6/photo.png'

export default function CameraControl({isLoading, onTakePicture}) {
  return isLoading ? (
    <View style={styles.vwLoading}>
      <View style={styles.vwIndicator}>
        <ActivityIndicator size='large' color='#57AAF2' />
        <Text style={styles.textDescription}>Procesando fotografía....</Text>
      </View>
    </View>
  ) : (
    <>
      <View style={{height: '80%'}}>
        <View style={styles.vwIndicator}>
          <Image source={imgPhotoAbove} style={{width: 0}}></Image>
        </View>
      </View>

      <View style={styles.vwContTakePic}>
        <View style={styles.vwTakePic}>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={onTakePicture}>
            <FontAwesome name='camera' style={{color: '#00D7A2', fontSize: 50}} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  vwLoading: {
    flex: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  vwIndicator: {
    marginTop: 40,
    alignItems: 'center',
    alignSelf: 'center',
  },
  vwContTakePic: {
    height: '20%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  vwTakePic: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-between',
    paddingBottom: 30,
  },
  textDescription: {
    color: '#5A6072',
    fontSize: 16,
    lineHeight: 30,
    letterSpacing: 0.32,
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto_400Regular',
  },
})
