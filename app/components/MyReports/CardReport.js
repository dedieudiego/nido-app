import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import openMap from 'react-native-open-maps';

export default function CardReport({ isComplete, data }) {
  const [location, setLocation] = useState();

  useEffect(() => {
    if (data.nests_steps?.length) {
      const { locations } = data.nests_steps[0];
      setLocation(locations);
    }
  }, [data]);

  const openInMap = () => {
    const latitude = parseFloat(location.latitude)
    const longitude = parseFloat(location.longitude)

    openMap({
      query: `${latitude},${longitude}`
    });
  }

  return (
    <View style={styles.cardReport}>
      <View style={{ paddingLeft: 26, paddingRight: 120, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.titleReport}>
          Nido #{data.id} - {data?.name ?? "Sin nombre"}
        </Text>

        {location?.latitude && location?.longitude && <TouchableOpacity onPress={openInMap}>
          <Text style={{ color: '#57AAF2', fontWeight: 'bold'}}> - Ver en Mapa</Text>
        </TouchableOpacity>}
      </View>

      {data && <ProgressSteps
        activeStep={data.last_step === 4 ? 3 : data.last_step}
        isComplete={isComplete}
        activeStepNumColor='#57AAF2'
        activeStepIconBorderColor='#57AAF2'
        activeLabelColor='#57AAF2'
        labelFontFamily='Roboto_700Bold'
        completedLabelColor='#00D7A2'
        completedProgressBarColor='#00D7A2'
        completedStepIconColor='#00D7A2'>
        <ProgressStep label='Etapa 1' removeBtnRow></ProgressStep>
        <ProgressStep label='Etapa 2' removeBtnRow></ProgressStep>
        <ProgressStep label='Etapa 3' removeBtnRow></ProgressStep>
        <ProgressStep label='Etapa 4' removeBtnRow></ProgressStep>
      </ProgressSteps>}
    </View>
  )
}

const styles = StyleSheet.create({
  titleReport: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Roboto_700Bold',
  },
  cardReport: {
    height: 150,
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
    marginHorizontal: 40,
    marginBottom: 20
  },
})
