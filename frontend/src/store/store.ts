import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import customerSlice from './customerSlice'


export const store = configureStore({
    reducer : {
        product : productSlice ,
        customer : customerSlice
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 