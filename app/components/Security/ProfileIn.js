import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, TouchableHighlight, Image, Modal, ScrollView} from 'react-native'

import iconMiPerfil from '../assets/Profile/iconMiPerfil.png'
import iconoMisReportes from '../assets/Profile/iconoMisReportes.png'
import iconSeguinos from '../assets/Profile/iconSeguinos.png'
import iconSeguridad from '../assets/Profile/iconSeguridad.png'
import iconFacebook from '../assets/Social/iconFacebook.png'
import iconInstagram from '../assets/Social/iconInstagram.png'
import btnCerrar from '../assets/btnCerrar.png'
import DeviceStorage from '../Shared/DeviceStorage'
import * as Linking from 'expo-linking'
import AppStateContext from '../Shared/AppStateContext'
import VersionAppText from '../Shared/VersionAppText'
import { supabase } from '../../lib/supabase'

export default function ProfileIn({navigation}) {
  const {currentUser, setCurrentUser} = useContext(AppStateContext)
  const [modalVisible, setModalVisible] = useState(false)

  const closeSession = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (!error) {
      setCurrentUser(null)
      DeviceStorage.removeItem('userPersistance').then(navigation.navigate('Inicio'))
    }
  }

  useEffect(() => {
    if (!currentUser) navigation.navigate('Inicio')
  }, [currentUser])

  return (
    <View style={styles.vwScreen}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableHighlight
                underlayColor='#FFFFFF'
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}>
                <Image source={btnCerrar} />
              </TouchableHighlight>
            </View>
            <Text style={stylesModal.modalText}>Seguinos</Text>

            <TouchableHighlight
              style={{...stylesModal.fbButton}}
              onPress={() => {
                Linking.openURL('https://www.facebook.com/')
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={iconFacebook} />
                <Text style={stylesModal.textStyle}>Facebook NidoHornerosApp</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={{...stylesModal.igButton}}
              onPress={() => {
                Linking.openURL('https://www.instagram.com/')
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={iconInstagram} />
                <Text style={stylesModal.textStyle}>Instagram NidoHornerosApp</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View style={styles.vwMenu}>
        <View style={{flex: 1}}></View>

        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={styles.textTitle}>Hola {currentUser && currentUser.name} </Text>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#57AAF2'
            styles={styles.btnLink}
            onPress={closeSession}>
            <Text style={styles.textSubTitle}>Cerrar sesión</Text>
          </TouchableHighlight>
        </View>

        <View style={{flex: 0.5}}></View>
      </View>

      <ScrollView style={styles.vwOverMenu} showsVerticalScrollIndicator={false}>
        <View style={{flex: 0.1}}></View>

        <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 30}}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#FFFFFF'
            styles={styles.btnLink}
            onPress={() => navigation.navigate('MyProfile')}>
            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <View style={{paddingRight: 25}}>
                <Image style={styles.logos} source={iconMiPerfil} />
              </View>

              <View>
                <Text style={styles.text}>Mi perfil</Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#FFFFFF'
            styles={styles.btnLink}
            onPress={() => navigation.navigate('MyReports')}>
            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <View style={{paddingRight: 25}}>
                <Image style={styles.logos} source={iconoMisReportes} />
              </View>

              <View>
                <Text style={styles.text}>Mis reportes</Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#FFFFFF'
            styles={styles.btnLink}
            onPress={() => navigation.navigate('ChangePass')}>
            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <View style={{paddingRight: 25}}>
                <Image style={styles.logos} source={iconSeguridad} />
              </View>

              <View>
                <Text style={styles.text}>Cambiar contraseña</Text>
              </View>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={1}
            underlayColor='#FFFFFF'
            styles={styles.btnLink}
            onPress={() => {
              setModalVisible(true)
            }}>
            <View style={{flexDirection: 'row', marginBottom: 30}}>
              <View style={{paddingRight: 25}}>
                <Image style={styles.logos} source={iconSeguinos} />
              </View>

              <View>
                <Text style={styles.text}>Seguinos</Text>
              </View>
            </View>
          </TouchableHighlight>

          <VersionAppText />
        </View>

        <View style={{flex: 0.2}}></View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  logos: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  textTitle: {
    fontFamily: 'Roboto_700Bold',
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 22,
    letterSpacing: 1.1,
    paddingBottom: 10,
  },
  textSubTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.28,
    paddingBottom: 10,
    fontFamily: 'Roboto_400Regular',
  },
  btnLogin: {
    backgroundColor: '#FFFFFF',
    color: '#5A6072',
    width: 130,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: '#5A6072',
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: 0.28,
    fontFamily: 'Roboto_400Regular',
  },
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  vwOverMenu: {
    flex: 0.75,
    width: '90%',
    alignSelf: 'center',
  },
  vwMenu: {
    flex: 0.25,

    backgroundColor: '#57AAF2',
    alignItems: 'stretch',
  },
  text: {
    color: '#5A6072',
    fontSize: 14,
    letterSpacing: 0.28,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
  },
})

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 30,
  },
  fbButton: {
    backgroundColor: '#4267B2',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    paddingLeft: 20,
    marginTop: 10,
  },
  igButton: {
    backgroundColor: '#F00075',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    paddingLeft: 20,
    marginBottom: 40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#333741',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0.72,
    fontFamily: 'Roboto_400Regular',
  },
})
