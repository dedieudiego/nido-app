import React from 'react'
import Constants from 'expo-constants'
import {StyleSheet, Text} from 'react-native'

export default function VersionAppText() {
  return <Text style={styles.text}>v. {Constants.expoConfig.version}</Text>
}

const styles = StyleSheet.create({
  text: {
    color: '#5A6072',
    textAlign: 'left',
    fontSize: 12,
    lineHeight: 25,
    fontFamily: 'Roboto_500Medium',
  },
})
