import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'
import config from '../config/config'

interface customerData {
    id : number
    userName: string
    phoneNo: string
    role: string
}

interface userData {
    id : number
    userName : string
    phoneNo : string,
    password : string
}

interface userState {
    users : userData[]
    user : userData | null
    status : string
    token : string
    customers : customerData[]
}

const initialState : userState = {
    users : [] ,
    user : null ,
    status : '' ,
    token : '',
    customers : []

}

const authSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setusers (state , action :PayloadAction<userData[]>){
            state.users = action.payload
        },
        setuser (state , action :PayloadAction<userData>){
            state.user = action.payload
        },
        setStatus (state , action : PayloadAction<string>){
            state.status = action.payload
        },
        setCustomer(state , action : PayloadAction<customerData[]>){
            state.customers = action.payload
        },
        setToken (state , action : PayloadAction <string>){
            state.token = action.payload
        }
    }
})

export const { setusers , setuser , setStatus , setToken ,setCustomer } = authSlice.actions
export default authSlice.reducer

export function getusers(){
    return async function getuserThunk(dispatch : any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}user/all`)
            if(response.status === 200){
                dispatch(setusers(response.data.user))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function signUp(data : userData ){
    return async function signUpThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post("",data)

            if(response.status === 200 ){
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function login(data : userData ){
    return async function loginThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post("",data)

            if(response.status === 200 ){
                dispatch(setToken(response.data.token))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function getAllCustomer() {
    return async function getAllCustomerThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}user/all/customer`)

            console.log("API RESPONSE:", response.data)

            if (response.status === 200 || response.status=== 201) {
                dispatch(setCustomer(response.data.customers))
                dispatch(setStatus(STATUSES.SUCCESS))
            }

        } catch (error) {
            console.error(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}