import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice' 
import userSlice from './userSlice'
import categorySlice from './categorySlice'
import salesSlice from './saleSlice'
import inventorySlice from './inventorySlice' 


export const store = configureStore({
    reducer : {
        product : productSlice ,
        sales : salesSlice,
        user : userSlice ,
        category : categorySlice,
        inventory : inventorySlice
    }
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 