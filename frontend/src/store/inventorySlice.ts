import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'
import config from '../config/config'

interface inventoryData {
    id : number
    quantity : number
    purchaseDate : Date
    productId : number
    categoryName : string
    categoryId : number
    batchNo : number,
    productName : string
    purchasedPrice : number
}

interface inventoryState {
    inventory : inventoryData[],
    status : string
}

const initialState: inventoryState = {
    inventory : [],
    status : ''
}

const inventorySlice = createSlice({
    name : 'inventory',
    initialState ,
    reducers : {
        setInventory(state , action : PayloadAction <inventoryData[]>){
            state.inventory =action.payload
        },
        setStatus (state , action : PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const { setInventory , setStatus } = inventorySlice.actions
export default inventorySlice.reducer

export function showInventory(){
    return async function showInventoryThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}inventory`)
            if(response.status === 200 || response.status === 201 ){
                dispatch((setInventory(response.data.inventory)))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}