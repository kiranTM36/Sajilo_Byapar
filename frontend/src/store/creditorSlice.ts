import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'
import config from '../config/config'

interface creditData {
    cId : number
    salesId : number
    customerId : number
    creditAmount : number
    dueDate : Date
    userName : string
    paidAmount : number
}

interface creditState {
    creditors : creditData[],
    status : string
}

const initialState : creditState = {
    creditors : [],
    status : ''
}

const creditSlice = createSlice({
    name : "credit",
    initialState,
    reducers : {
        setCreditor(state , action : PayloadAction <creditData[]>){
            state.creditors = action.payload
        },
        setStatus(state , action: PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const { setCreditor, setStatus } = creditSlice.actions
export default creditSlice.reducer

export function getAllCreditor() {
    return async function getAllCreditorThunk(dispatch:any){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}creditor/all`)

            if(response.status >= 200 || response.status < 300){
                dispatch(setCreditor(response.data.credit))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}