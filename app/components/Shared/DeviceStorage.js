import AsyncStorage from '@react-native-async-storage/async-storage'
const DeviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      //AsyncStorage Error: ' + error.message
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      return value
    } catch (error) {
      //AsyncStorage Error: ' + error.message
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key)
      console.log("REMOVED");
      return true
    } catch (e) {
      console.error('AsyncStorage Error: ' + error.message);
    }
  },
}

export default DeviceStorage
