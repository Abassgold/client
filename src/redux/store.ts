import { configureStore } from '@reduxjs/toolkit'
import auth from './slice/auth'
import darkMode from './slice/darkMode'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth,
      darkMode,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']