import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice' 
import userSlice from './userSlice'
import categorySlice from './categorySlice'


export const store = configureStore({
    reducer : {
        product : productSlice ,
        user : userSlice ,
        category : categorySlice
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 