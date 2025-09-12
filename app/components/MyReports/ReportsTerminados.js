import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'
import AppStateContext from '../Shared/AppStateContext'
import CardReport from './CardReport'
import DeviceStorage from '../Shared/DeviceStorage'
import { supabase } from '../../lib/supabase'
import hornero_etapa4 from '../../components/assets/Nidos/formulario/etapa1/etapa4/HORNERO-VECTOR-13.png'

export default function ReportsTerminados({navigation}) {
  const {currentUser, isConnected, pendingNests, syncing, setSyncing, isIOS} = useContext(AppStateContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const { navigate } = navigation;

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
      
      if (!error) {
        if (data?.length) {
          DeviceStorage.saveItem('finishedNests', JSON.stringify(data))
        } else {
          DeviceStorage.removeItem('finishedNests');
        };
      }
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

  const syncNests = () => {
    if (!syncing) {
      setSyncing(true);
      navigate('EndReport');
    };
  }

  useEffect(() => {
    if (currentUser.profile) getData()
  }, [currentUser])

  return (
    <ScrollView style={{marginTop: isIOS ? Constants.statusBarHeight + 30 : Constants.statusBarHeight}}>
      <View style={styles.vwScreen}>
        <View style={styles.vwMain}>
          <Image source={hornero_etapa4} style={styles.imageHornero} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Mis nidos terminados</Text>
          </View>

          {pendingNests?.length && (
            <TouchableOpacity disabled={!isConnected} onPress={syncNests}>
              <Text style={{...styles.pendingText, backgroundColor: isConnected ? '#57AAF2' : '#eee', color: isConnected ? '#fff' : '#666'}}>Tienes cambios pendientes para sincronizar cuando se reestablezca la conexión a internet</Text>
            </TouchableOpacity>
          )}

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
  pendingText: {
    fontSize: 12,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    textAlign: 'center'
  }
})
