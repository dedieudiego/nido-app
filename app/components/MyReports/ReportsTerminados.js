import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, ActivityIndicator} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import CardReport from './CardReport'
import { supabase } from '../../lib/supabase'
import hornero_etapa4 from '../../components/assets/Nidos/formulario/etapa1/etapa4/HORNERO-VECTOR-13.png'

export default function ReportsTerminados({navigation}) {
  const {currentUser} = useContext(AppStateContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = async() => {
    if (isConnected) {
      const { data, error } = await supabase.from('nests')
        .select(
          `
            *,
            nests_steps(
              *,
              locations(*)
            )
          `
        )
        .eq('profile_id', currentUser.profile.id)
        .eq('last_step', 4)
        .order('id', {ascending: false})
  
      setData(data)
      if (data?.length) {
        DeviceStorage.saveItem('finishedNests', JSON.stringify(data))
      };
      setLoading(false);
    } else {
      DeviceStorage.getItem('finishedNests').then((data) => {
        if (data) {
          setData(JSON.parse(data));
        }
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    if (currentUser.profile) getData()
  }, [currentUser])

  return (
    <ScrollView style={{marginTop: Constants.statusBarHeight}}>
      <View style={styles.vwScreen}>
        <View style={styles.vwMain}>
          <Image source={hornero_etapa4} style={styles.imageHornero} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Mis nidos terminados</Text>
          </View>

          {loading && <ActivityIndicator size="large" color="#CD8C59" />}
          {!loading && data?.map((item) => 
            <View key={item.id}>
              <CardReport isComplete={true} data={item} />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  vwScreen: {
    flex: 6,
    justifyContent: 'center',
    marginBottom: 100,
  },
  vwMain: {
    flex: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageHornero: {
    width: 300,
    height: 230,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: '#00D7A2',
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
