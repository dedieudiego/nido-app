import React, { useEffect, useContext, useState, useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import DeviceStorage from './Shared/DeviceStorage'
import Hornero from './assets/hornero.png'
import AppStateContext from './Shared/AppStateContext'
import { FontAwesome } from '@expo/vector-icons'
import VersionAppText from './Shared/VersionAppText'
import { supabase } from '../lib/supabase'
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

export default function Home({ route, navigation }) {
  const { currentUser, setCurrentUser, setUpdateDataNidos } = useContext(AppStateContext)
  const { navigate } = navigation;
  const url = Linking.useURL();

  const closeSession = async () => {
    const { error } = await supabase.auth.signOut();
      
    if (!error || error.message === "Auth session missing!") {
      setCurrentUser(null)
      DeviceStorage.removeItem('userPersistance')
    };
  }

  useEffect(() => {
    DeviceStorage.getItem('hideTutorial').then((res) => {
      if (res !== '1') navigate('Onboarding')
    })

    // HABILITAR EN CASO DE QUERER DEBUGGEAR
    // navigate('Onboarding')
  }, [])

  useEffect(() => {
    const handleDeepLink = async (event) => {
      let data = Linking.parse(event.url);

      const fragment = event.url.split('#')[1];
      const queryParams = fragment ? Object.fromEntries(new URLSearchParams(fragment)) : {};

      if (data.path === 'ChangePass' || data.hostname === 'ChangePass') {
        navigate('ChangePass', { access_token: queryParams?.access_token, refresh_token: queryParams?.refresh_token });
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const goNidosTerminados = () => {
    if (currentUser) {
      navigate('ReportsTerminados')
    } else {
      navigate('Login', { backTo: 'ReportsTerminados' })
    }
  }

  const goNuevoNido = () => {
    setUpdateDataNidos(false)
    if (currentUser) {
      navigate('Report')
    } else {
      navigate('Login', { backTo: 'Report' })
    }
  }

  const goNidoConstruccion = () => {
    if (currentUser) {
      navigate('MyReports')
    } else {
      navigate('Login', { backTo: 'MyReports' })
    }
  }

  return (
    <View style={styles.vwScreen}>
      <View style={styles.vwOverMenu}>
        <View style={styles.vwBottom}>
          {currentUser ? (
            <Text allowFontScaling={false} style={styles.textHello}>¡Hola {currentUser?.profile?.first_name}!</Text>
          ) : (
            <Text allowFontScaling={false} style={styles.textHello}>¡Hola!</Text>
          )}

          <Text allowFontScaling={false} style={styles.text}>
            Bienvenidx a la app de horneros <VersionAppText />
          </Text>
          {currentUser && (
            <View style={{zIndex: 999}}>
              <TouchableOpacity onPress={closeSession}>
                <Text allowFontScaling={false} style={styles.textClose}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={[styles.vwMiddle]}>
          <Image style={styles.imgHornero} source={Hornero}></Image>
        </View>
      </View>

      <View style={{justifyContent: 'center', paddingVertical: 16}}>
        <View style={[styles.vwMenu, { paddingHorizontal: 16 }]}>
          <TouchableOpacity style={styles.btnGeneral} onPress={() => goNuevoNido()}>
            <FontAwesome name='plus-circle' style={{ color: '#FFF', fontSize: 20 }} />
            <Text allowFontScaling={false} style={[styles.btnGeneralText, { fontSize: 20, paddingLeft: 5 }]}>
              Cargar nido nuevo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnGeneral, { marginTop: 16 }]}
            onPress={() => goNidoConstruccion()}>
            <Text allowFontScaling={false} style={[styles.btnGeneralText]}>Continuar nido en construcción </Text>
            <FontAwesome name='chevron-right' style={{ color: '#FFF', fontSize: 16 }} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.vwMenuRow2,
            {
              flexDirection: 'row',
              marginTop: 16,
              justifyContent: 'space-between',
              paddingHorizontal: 8,
            },
          ]}>
          <TouchableOpacity style={[styles.btnVertical]} onPress={() => goNidosTerminados()}>
            <FontAwesome name='check-circle' style={{ color: '#FFF', fontSize: 25 }} />
            <Text allowFontScaling={false}style={[styles.btnGeneralText, { paddingTop: 15, textTransform: 'none' }]}>
              Mis nidos{'\n'}terminados
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnVertical]}
            onPress={() => navigate('AboutHorneros')}>
            <FontAwesome name='user' style={{ color: '#FFF', fontSize: 21 }} />
            <Text allowFontScaling={false} style={[styles.btnGeneralText, { paddingTop: 15, textTransform: 'none' }]}>
              Sobre el{'\n'}Proyecto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnGeneral: {
    backgroundColor: '#00D7A2',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnVertical: {
    backgroundColor: '#57AAF2',
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 8
  },
  btnGeneralText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    textTransform: 'uppercase',
  },
  imgHornero: {
    alignSelf: 'stretch',
    pointerEvents: 'none'
  },
  vwScreen: {
    flex: 1,
    paddingBottom: 40
  },
  vwOverMenu: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EEEEEE',
    borderBottomLeftRadius: 50,
  },
  vwMenu: {
    alignItems: 'stretch',
  },
  vwMenuRow2: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  vwTop: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  vwMiddle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
  },
  vwBottom: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    backgroundColor: '#EEEEEE',
    paddingTop: 10,
  },
  text: {
    color: '#5A6072',
    textAlign: 'left',
    fontFamily: 'Roboto_400Regular',
  },
  textClose: {
    color: '#57AAF2',
    textAlign: 'left',
    fontFamily: 'Roboto_700Bold',
  },
  textHello: {
    color: '#5A6072',
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
  },
})
