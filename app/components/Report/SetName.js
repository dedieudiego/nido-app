import React, {useContext, useState} from 'react'
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import BtnGeneral from './BtnGeneral'

const theMargin = Constants.statusBarHeight + 60
export default function SetName({navigation, route}) {
  const {dataNidos, setDataNidos, updateDataNidos} = useContext(AppStateContext)
  const [name, setName] = useState(dataNidos.ubicacion?.city);
  console.log(dataNidos)

  const continueReport = () => {
    setDataNidos({...dataNidos, nombre: name})
    navigation.navigate('EndReport');
  }

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
  }
})
