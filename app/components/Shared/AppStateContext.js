import {createContext} from 'react'
const AppStateContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isConnected: true,
  setIsConnected: () => {},
  dataNidos: {},
  setDataNidos: () => {},
  updateDataNidos: {},
  setUpdateDataNidos: () => {},
  refreshStorage: {},
  setRefreshStorage: () => {},
  pendingNests: {},
  setPendingNests: () => {},
  syncing: {},
  setSyncing: () => {},
  location: {},
  isIOS: false,
  isAndroid: false
})
export default AppStateContext
