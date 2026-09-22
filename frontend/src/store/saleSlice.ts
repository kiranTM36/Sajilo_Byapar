import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { STATUSES } from "../status/STATUSES"
import axios from "axios"
import config from "../config/config"

interface sales {
    id : number,
    userName : string ,
    paidAmount : number ,
    totalAmount : number
    saleDate : Date
}

interface salesState {
    sales : sales[],
    sale : sales | null ,
    status : string
}

const initialState : salesState = {
    sales : [],
    sale : null ,
    status : ""
}

const salesSlice = createSlice({
    name : 'sales',
    initialState ,
    reducers : {
        setsales(state , action : PayloadAction<sales[]>){
            state.sales = action.payload
        },
        setsale(state , action : PayloadAction<sales>){
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
    return async function getAllsalesorThunk(dispatch : any){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}sales/view`)
            if(response.status == 200 || response.status === 201){
                dispatch(setsales(response.data.sales))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            
        }
    }
}