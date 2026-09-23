import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'
import config from '../config/config'

interface customerData {
    id : number
    userName: string
    phoneNo: string
    role: string,
    createdAt : Date
}

interface createCustomer {
    userName: string
    phoneNo: string
    password : string
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
    customers : [],

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

export function signUp(data : createCustomer ){
    return async function signUpThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post(`${config}user/add`,data)

            if(response.status >= 200 || response.status < 300 ){
                dispatch(setStatus(STATUSES.SUCCESS))
                return true
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function login(data : createCustomer ){
    return async function loginThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post(`${config}user/login`,data , {
                withCredentials : true
            })

            if(response.status === 200 ){
                dispatch(setToken(response.data.token))
                dispatch(setStatus(STATUSES.SUCCESS))
                localStorage.setItem('User', JSON.stringify(data))
                localStorage.setItem('token' , response.data.token)

                return true
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

export function deleteUser(id: number){
    return async function deleteUserThunk(dispatch:any) {

        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.delete(`${config}user/${id}` , 
                {
                    withCredentials : true
                }
            )

            if(response.status === 201 || response.status === 200){
                alert("user Deleted")
                return true
            }
        } catch (error) {
            
        }
        
    }
}

export function getSingleUser(id : number){
    return async function getSingleUserThunk(dispatch : any){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}user/${id}`)

            if(response.status >= 200 || response.status < 300){
                dispatch(setuser(response.data.user))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}