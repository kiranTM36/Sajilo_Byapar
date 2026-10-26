import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { STATUSES } from "../status/STATUSES"
import axios from "axios"
import config from "../config/config"
import type { AppDispatch } from "./store"

interface sales {
    id : number,
    saleId : number
    userName : string ,
    paidAmount : number ,
    totalAmount : number
    saleDate : Date,
    productName : string
    itemQty : number
    price : number
}

interface salesState {
    sales : sales[],
    sale : sales[] ,
    status : string
}

const initialState : salesState = {
    sales : [],
    sale : [] ,
    status : ""
}

const salesSlice = createSlice({
    name : 'sales',
    initialState ,
    reducers : {
        setsales(state , action : PayloadAction<sales[]>){
            state.sales = action.payload
        },
        setsale(state , action : PayloadAction<sales[]>){
            state.sale = action.payload
        },
        setStatus(state , action : PayloadAction <string>){
            state.status = action.payload
        }
    }
})

export const { setsale , setsales , setStatus } = salesSlice.actions
export default salesSlice.reducer

export function getAllsales(){
    return async function getAllsalesorThunk(dispatch : AppDispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}sales/view`)
            if(response.status == 200 || response.status === 201){
                dispatch(setsales(response.data.sales))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            console.error(error);
            
        }
    }
}

export function getSinglesale(id: number){
    return async function getSinglesaleThunk(dispatch : AppDispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}sales/view/${id}`)
            if(response.status == 200 || response.status === 201){
                dispatch(setsale(response.data.sale))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            console.error(error);
            
        }
    }
}