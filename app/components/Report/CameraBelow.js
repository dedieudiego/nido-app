import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native'
import Constants from 'expo-constants'
import {CameraView, useCameraPermissions} from 'expo-camera'
import CameraControl from './CameraControl'
import btnCerrar from '../assets/btnCerrar.png'
import AppStateContext from '../Shared/AppStateContext'
import * as Location from 'expo-location'

const theMargin = Constants.statusBarHeight + 20
export default function CameraBelow({navigation}) {
  const {dataNidos, setDataNidos, updateDataNidos} = useContext(AppStateContext)
  const [cameraRef, setCameraRef] = useState(null)
  const [isCameraReady, setIsCameraReady] = useState(false)

  const [photoBelow, setPhotoBelow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    ;(async () => {
      let location = await Location.getCurrentPositionAsync({})
      let geocode = await Location.reverseGeocodeAsync(location.coords)

      const ubicacion = {
        city: geocode[0].city,
        country: geocode[0].country,
        postalCode: geocode[0].postalCode,
        region: geocode[0].region,
        subregion: geocode[0].subregion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      setLocation(ubicacion)
    })()
  }, [])

  if (!permission) {
    return (
      <View style={styles.vwScreen}>
        <View style={styles.vwMain}>
          <Text style={styles.textDescription}>Accediendo a la cámara...</Text>
        </View>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.vwScreen}>
        <View style={styles.vwMain}>
          <Text style={styles.textDescription}>
            Sin acceso a la cámara. Necesitamos tu permiso.
          </Text>
          <Button onPress={requestPermission} title='Otorgar permiso' />
        </View>
      </View>
    )
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const sendNextStep = () => {
    setDataNidos({...dataNidos, photo: photoBelow, ubicacion: location})
    if (dataNidos.estadio === 4) {
      navigation.navigate('SevenStepReport')
    } else {
      if (updateDataNidos) {
        navigation.navigate('EndReport')
      } else {
        navigation.navigate('SetName')
      }
    }
  }

  const takePicture = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
        fixOrientation: false,
      })
      setPhotoBelow(photo)
    }
  }

  return <View style={stylesCam.container}>
      <CameraView
        style={stylesCam.camera}
        ref={(ref) => {
          setCameraRef(ref)
        }}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log('cammera error', error)
        }}
        facing={'back'}>
        <CameraControl isLoading={loading} onTakePicture={takePicture} />
      </CameraView>

        {photoBelow && <View style={styles.vwScreenConfirm}>
      <View style={styles.vwMain}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={btnCerrar} />
          </TouchableOpacity>
          <Text style={styles.textDescription}>Si está bien, continuá el proceso</Text>
        </View>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Image
            source={photoBelow}
            style={{height: 300, width: 300, borderWidth: 1, borderColor: '#CECECE'}}></Image>
        </View>
      </View>

      <View style={styles.vwBottom}>
        <View style={{flex: 1, flexDirection: 'columns', alignItems: 'center'}}>
          <TouchableHighlight
            style={styles.btnVolver}
            activeOpacity={1}
            underlayColor='#000000'
            onPress={() => setPhotoBelow(null)}>
            <Text style={styles.txtButtonVolver}>Volver a sacar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.btnLogin}
            activeOpacity={1}
            underlayColor='#000000'
            onPress={sendNextStep}>
            <Text style={styles.txtButton}>Continuar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>}

    </View>
  
}

const stylesCam = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    height: '100%',
  },
})

const styles = StyleSheet.create({
  textDescription: {
    color: '#5A6072',
    fontSize: 16,
    lineHeight: 30,
    letterSpacing: 0.32,
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
  btnVolver: {
    backgroundColor: '#FFFFFF',
    borderColor: '#5A6072',
    borderWidth: 1,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    width: 330,
    marginBottom: 20,
  },
  btnLogin: {
    backgroundColor: '#57AAF2',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    width: 330,
  },
  txtButton: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  txtButtonVolver: {
    color: '#5A6072',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  vwScreen: {
    flex: 6,
    justifyContent: 'center',
    marginTop: theMargin,
  },
  vwScreenConfirm: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    paddingTop: theMargin,
    bottom: 0,
    left: 0,
    right: 0
  },
  vwMain: {
    alignItems: 'center',
    marginBottom: 60,
  },
  vwBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
})
