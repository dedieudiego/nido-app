import React, {useContext, useState, useEffect} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import CardReport from './CardReport'
import DeviceStorage from '../Shared/DeviceStorage'
import { supabase } from '../../lib/supabase'
import hornero_etapa2 from '../../components/assets/Nidos/formulario/etapa1/q1/HORNERO-VECTOR-05.png'

export default function MyReports({navigation}) {
  const {currentUser, setUpdateDataNidos, isConnected} = useContext(AppStateContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const continueReports = (item) => {
    setUpdateDataNidos(true)
    navigation.navigate('Report', {item})
  }

  const getData = async() => {
    console.log({isConnected})
    if (currentUser.profile) {
      if (isConnected) {
        const { data, error } = await supabase.from('nests').select(
          `
            *,
            nests_steps(
              *,
              locations(*)
            )
          `
        )
        .eq('profile_id', currentUser.profile.id)
        .neq('last_step', 4)
        .order('id', {ascending: false})
    
        setData(data);
        setLoading(false);
        if (!error) {
          if (data?.length) {
            DeviceStorage.saveItem('currentNests', JSON.stringify(data))
          } else {
            DeviceStorage.removeItem('currentNests');
          };
        }
      } else {
        DeviceStorage.getItem('currentNests').then((data) => {
          if (data) {
            setData(JSON.parse(data));
          }
          setLoading(false);
        });
      }
    }
  }

  useEffect(() => {
    getData()
  }, [currentUser])

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight}}>
      <View style={styles.vwScreen}>
        <View style={styles.vwMain}>
          <Image source={hornero_etapa2} style={styles.imageHornero} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Mis nidos en construcción</Text>
          </View>

          {loading && <ActivityIndicator size="large" color="#CD8C59" />}
          {!loading && data?.map((item) => 
            <TouchableOpacity onPress={() => continueReports(item)} key={item.id}>
              <CardReport isComplete={false} data={item} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  vwScreen: {
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginBottom: 100,
  },
  vwMain: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardReport: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 20,
    height: 135,
  },
  imageHornero: {
    height: 230,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: '#CD8C59',
    borderRadius: 20,
    height: 45,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 40,
  },
  titleText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'Roboto_700Bold',
  },
})
