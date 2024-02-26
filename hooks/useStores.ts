import { useContext, createContext } from 'react'
import { rootStore } from 'stores'

const storeContext = createContext(rootStore)

export const useStores = () => {
  return useContext(storeContext)
}
