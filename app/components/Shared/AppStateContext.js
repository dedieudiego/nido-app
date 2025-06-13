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
  pendingNests: {},
  setPendingNests: () => {},
})
export default AppStateContext
