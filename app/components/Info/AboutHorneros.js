import React from 'react'
import Constants from 'expo-constants'
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native'
import logo from '../../components/assets/Nidos/hornero-logo-fin-variables.png'
import hornero_etapa3 from '../../components/assets/Nidos/formulario/etapa1/etapa3/HORNERO-VECTOR-11.png'

export default function AboutHorneros() {
  return (
    <ScrollView style={styles.vwScreen}>
      <View style={styles.vwMiddle}>
        <Image source={logo} style={styles.logoHornero} />
        <Text style={styles.titleBlue}>¿Qué es “HORNERO”?</Text>
        <Text style={styles.textParagraph}>
          Es un proyecto en el que los ciudadanos y las ciudadanas registramos el proceso de
          construcción de nidos de horneros (Furnarius rufus) para conocer más sobre el
          comportamiento de un ave típica de Argentina, Uruguay, Paraguay, Bolivia y Brasil.{'\n'}
          {'\n'}
          Buscamos además generar un vínculo entre la gente y la naturaleza con el objetivo de
          revalorizar la naturaleza que nos rodea en forma cotidiana.
        </Text>

        <Text style={styles.textParagraph}></Text>

        <Image source={hornero_etapa3} style={styles.imageHornero} />
        <Text style={styles.titleBlue}>¿Qué comportamiento estudiamos?</Text>
        <Text style={styles.textParagraph}>
          Queremos saber más sobre el comportamiento de construcción del nido y los factores
          ambientales que llevan a los horneros a construir su nido. ¿Por qué? Porque los horneros
          se caracterizan por construir ellos mismos sus nidos, y dependen directamente de la
          disponibilidad de agua para ello. Y porque los nidos de aves tienen un efecto directo
          sobre el éxito reproductivo y la supervivencia de los individuos. En el contexto de cambio
          climático, entender cómo y cuándo los horneros construyen sus nidos nos permitirá entender
          si los horneros pueden (o no) adaptarse a los cambios ambientales que se esperan.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  vwScreen: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 50,
  },
  vwMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  textParagraph: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: 'Roboto_400Regular',
  },
  titleBlue: {
    color: '#57AAF2',
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 18.75,
    fontFamily: 'Roboto_700Bold',
    paddingVertical: 15,
    width: '100%',
  },
  logoHornero: {
    width: 270,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  imageHornero: {
    height: 230,
    width: 330,
    resizeMode: 'cover',
    marginBottom: 40,
  },
})
