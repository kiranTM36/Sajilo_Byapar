import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface adminData {
    adminName : string
    email : string,
    password : string
}

interface customerState {
    admin : adminData  | null
    status : string
    token : string
}

const initialState : customerState = {
    admin : null ,
    status : '' ,
    token : ''

}

const adminSlice = createSlice({
    name : 'Admin',
    initialState ,
    reducers : {
        setAdmin (state , action :PayloadAction<adminData>){
            state.admin = action.payload
        },
        setStatus (state , action : PayloadAction<string>){
            state.status = action.payload
        },
        setToken (state , action : PayloadAction <string>){
            state.token = action.payload
        }
    }
})

export const { setCustomer  , setStatus , setToken } = adminSlice.actions
export default adminSlice.reducer