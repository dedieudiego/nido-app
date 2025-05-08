import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const BtnGeneral = ({text, subtitle, action, isSelected, isDisabled}) => {
  return (
    <TouchableOpacity style={[styles.btnGeneral, isSelected && styles.selected, isDisabled && styles.disabled]} onPress={action}>
      <Text style={styles.btnGeneralText}>{text}</Text>
      {subtitle && <Text style={styles.btnGeneralSubtitleText}>{subtitle}</Text>}
    </TouchableOpacity>
  )
}

export default BtnGeneral

const styles = StyleSheet.create({
  btnGeneral: {
    backgroundColor: '#57AAF2',
    width: 330,
    height: 57,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selected: {
    backgroundColor: '#57AAF299',
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  btnGeneralText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  btnGeneralSubtitleText: {
    color: '#FFFFFF',
    textAlign: 'center',
    alignContent: 'center',
    fontSize: 11,
    fontFamily: 'Roboto_400Regular',
  },
})
