import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice' 
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import salesSlice from './saleSlice'


export const store = configureStore({
    reducer : {
        product : productSlice ,
        sales : salesSlice,
        user : userSlice ,
        category : categorySlice
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 