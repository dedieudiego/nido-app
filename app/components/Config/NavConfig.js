import React, { useEffect } from 'react'
import {StyleSheet} from 'react-native'

import Login from '../Security/Login'
import Register from '../Security/Register'
import PassChanger from '../Security/PassChanger'
import PassRecovery from '../Security/PassRecovery'
import MyProfile from '../Security/MyProfile'
import ProfileIn from '../Security/ProfileIn'

import DeleteProfile from '../Security/DeleteProfile'
import ReportIntro from '../Report/ReportIntro'

import PhotoBelow from '../Report/PhotoBelow'

import CameraBelow from '../Report/CameraBelow'
import MyReports from '../MyReports/MyReports'

import * as Linking from 'expo-linking';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import FirstStepReport from '../Report/FirstStepReport'
import SecondStepReport from '../Report/SecondStepReport'
import ThirdStepReport from '../Report/ThirdStepReport'
import FourthStepReport from '../Report/FourthStepReport'
import FiveStepReport from '../Report/FiveStepReport'
import SixStepReport from '../Report/SixStepReport'
import SevenStepReport from '../Report/SevenStepReport'
import SetName from '../Report/SetName'
import EndReport from '../Report/EndReport'
import ReportsTerminados from '../MyReports/ReportsTerminados'
import AboutHorneros from '../Info/AboutHorneros'
import Home from '../Home'
import OnboardingScreen from '../Onboarding'

const Stack = createStackNavigator()

export default function NavConfig() {
  const backButtonStyle = {
    color: '#5A6072',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  }

  const optionsSecurity = {
    headerTitleStyle: styles.headerTitle,
    headerShown: true,
    headerTitleAlign: 'center',
    headerTransparent: 'false',
    headerBackTitle: 'Atrás',
    headerTintColor: '#000000',
    headerBackTitleStyle: backButtonStyle,
  }

  useEffect(() => {
    const handleDeepLink = (event) => {
      let data = Linking.parse(event.url);
      console.log('Deep link data:', data);

      if (data.path === 'reset-password') {
        navigation.navigate('ChangePass', { accessToken: data.queryParams?.access_token });
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer 
      theme={HornerosTheme}
      linking={{
        prefixes: ['com.nidohorneros://'],
        config: {
          screens: {
            ChangePass: 'ChangePass',
          },
        },
      }}
    >
      <Stack.Navigator initialRouteName='Inicio' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Inicio' component={Home} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerShown: false,
            title: 'Reportar',
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />
        <Stack.Screen
          name='Report'
          component={ReportIntro}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerShown: true,
            title: null,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen
          name='ChangePass'
          component={PassChanger}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerShown: true,
            title: 'Cambiar contraseña',
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='PassRecovery'
          component={PassRecovery}
          options={{...optionsSecurity, title: 'Recupero de Contraseña'}}
        />

        <Stack.Screen
          name='MyProfile'
          component={MyProfile}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerShown: true,
            title: 'Mi perfil',
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='ProfileIn'
          component={ProfileIn}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerShown: true,
            title: 'Mi perfil',
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='DeleteProfile'
          component={DeleteProfile}
          options={{
            headerTitleStyle: styles.headerTitle,
            headerShown: true,
            title: 'Eliminar cuenta',
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='CameraBelow'
          component={CameraBelow}
          options={{headerTitleStyle: styles.headerTitle, headerShown: false}}
        />

        <Stack.Screen
          name='PhotoBelow'
          component={PhotoBelow}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='FirstStepReport'
          component={FirstStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='AboutHorneros'
          component={AboutHorneros}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='EndReport'
          component={EndReport}
          options={{
            headerShown: false,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />
        <Stack.Screen
          name='SixStepReport'
          component={SixStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='SevenStepReport'
          component={SevenStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='SetName'
          component={SetName}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='SecondStepReport'
          component={SecondStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='ThirdStepReport'
          component={ThirdStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='FourthStepReport'
          component={FourthStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='FiveStepReport'
          component={FiveStepReport}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='MyReports'
          component={MyReports}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            cardStyle: {backgroundColor: '#F7F7F7'},
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />

        <Stack.Screen
          name='ReportsTerminados'
          component={ReportsTerminados}
          options={{
            headerShown: true,
            headerTitle: false,
            headerTitleAlign: 'center',
            headerTransparent: 'true',
            headerBackTitle: 'Atrás',
            cardStyle: {backgroundColor: '#F7F7F7'},
            headerTintColor: '#000000',
            headerBackTitleStyle: backButtonStyle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HornerosTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#5A6072',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
})
