import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'

interface customerData {
    _id : string
    customerName : string
    phoneNo : string,
    password : string
}

interface customerState {
    customers : customerData[]
    customer : customerData | null
    status : string
    token : string
}

const initialState : customerState = {
    customers : [] ,
    customer : null ,
    status : '' ,
    token : ''

}

const customerSlice = createSlice({
    name : 'customer',
    initialState ,
    reducers : {
        setCustomers (state , action :PayloadAction<customerData[]>){
            state.customers = action.payload
        },
        setCustomer (state , action :PayloadAction<customerData>){
            state.customer = action.payload
        },
        setStatus (state , action : PayloadAction<string>){
            state.status = action.payload
        },
        setToken (state , action : PayloadAction <string>){
            state.token = action.payload
        }
    }
})

export const { setCustomers , setCustomer , setStatus , setToken } = customerSlice.actions
export default customerSlice.reducer

export function getCustomers(){
    return async function getCustomerThunk(dispatch : any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get('http://localhost:9000/customer/all')
            if(response.status === 200){
                dispatch(setCustomers(response.data.customer))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}