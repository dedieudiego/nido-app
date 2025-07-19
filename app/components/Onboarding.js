import React from 'react'
import {StyleSheet, View, Image, Dimensions} from 'react-native'
import DeviceStorage from './Shared/DeviceStorage'
import Onboarding from 'react-native-onboarding-swiper'
import onboarding1 from '../components/assets/Nidos/onboarding1.png'
import onboarding2 from '../components/assets/Nidos/onboarding2.png'
import onboarding3 from '../components/assets/Nidos/onboarding3.png'

const { height } = Dimensions.get('window');

export default function OnboardingScreen({navigation}) {
  const hideTutorial = () => {
    DeviceStorage.saveItem('hideTutorial', '1')
    navigation.navigate('Inicio')
  }


  return (
    <View style={styles.vwScreen}>
      <View style={styles.vwOverMenu}>
        <Onboarding
          onSkip={hideTutorial}
          onDone={hideTutorial}
          showSkip={false}
          showNext={false}
          bottomBarColor={'transparent'}
          allowFontScaling={false}
          pages={[
            {
              backgroundColor: '#fff',
              image: (
                <View>
                  <Image source={onboarding1} style={styles.imageHornero2} />
                </View>
              ),
              title: '',
              subtitle: '¡Bienvenidos y bienvenidas\n a hacer ciencia colectiva!',
            },
            {
              backgroundColor: '#474E33',
              image: (
                <Image style={{...styles.imageHornero2, width: '60%'}} resizeMode='contain' source={onboarding2} />
              ),
              title: 'Encontrás un nido de hornero en construcción.',
              subtitle: 'Sacás el celular y registrás la etapa de construcción.',
            },
            {
              backgroundColor: '#fff',
              image: (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image source={onboarding3} style={styles.imageHornero2} />
                </View>
              ),
              title: '',
              subtitle: `¿El objetivo?\n Que puedas seguir cada nido a lo largo de su construcción.`,
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonReport: {
    height: '100%',
    resizeMode: 'contain',
  },
  vwScreen: {
    flex: 1,
    justifyContent: 'center',
  },
  vwOverMenu: {
    flex: 1,
    backgroundColor: 'green',
  },
  vwMenu: {
    flex: 1,
    alignItems: 'stretch',
  },
  vwMenuRow2: {
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'stretch',
  },
  vwTop: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  vwMiddle: {
    flex: 6.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vwBottom: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  text: {
    color: '#5A6072',
    textAlign: 'left',
    fontFamily: 'Roboto_400Regular',
  },
  textHello: {
    color: '#5A6072',
    textAlign: 'left',
    fontSize: 24,
    fontFamily: 'Roboto_700Bold',
  },
  imageHornero: {
    width: 350,
    resizeMode: 'contain',
  },
  imageHornero2: {
    height: height * 0.5,
    maxHeight: 410,
    resizeMode: 'contain',
    marginBottom: -70,
    marginTop: -50
  },
})
