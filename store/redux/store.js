import {configureStore} from '@reduxjs/toolkit'
import authenticationReducer from './authentication'

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
})