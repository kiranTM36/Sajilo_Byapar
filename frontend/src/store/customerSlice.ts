import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface customerData {
    customerName : string
    phoneNo : string,
    password : string
}

interface customerState {
    customer : customerData  | null
    status : string
    token : string
}

const initialState : customerState = {
    customer : null ,
    status : '' ,
    token : ''

}

const customerSlice = createSlice({
    name : 'customer',
    initialState ,
    reducers : {
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

export const { setCustomer  , setStatus , setToken } = customerSlice.actions
export default customerSlice.reducer