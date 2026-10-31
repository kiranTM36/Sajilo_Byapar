import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'
import config from '../config/config'
import type { AppDispatch } from './store'


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
    role: string
    createdAt : Date
}

interface userState {
    users : userData[]
    user : userData | null
    status : string
    token : string
    customers : userData[]
}

const initialState: userState = {
    users: [],
    user: JSON.parse(localStorage.getItem('userByapar') || 'null'),
    status: '',
    token: localStorage.getItem('token') || '',
    customers: [],
}

const authSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {
        setusers (state , action :PayloadAction<userData[]>){
            state.users = action.payload
        },
        setuser (state , action :PayloadAction<userData | null>){
            state.user = action.payload
        },
        setStatus (state , action : PayloadAction<string>){
            state.status = action.payload
        },
        setCustomer(state , action : PayloadAction<userData[]>){
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
    return async function getuserThunk(dispatch : AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}user/all`)
            if(response.status === 200){
                dispatch(setusers(response.data.user))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function signUp(data : createCustomer ){
    return async function signUpThunk(dispatch:AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post(`${config}user/signup`,data, {
                withCredentials : true
            })

            if(response.status >= 200 || response.status < 300 ){
                dispatch(setStatus(STATUSES.SUCCESS))
                return true
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function login(data: createCustomer) {
    return async function loginThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post(
                `${config}user/login`,
                data,
                { withCredentials: true }
            )

            if (response.status === 200) {
                const user = response.data.user
                const token = response.data.token

                localStorage.setItem('userByapar', JSON.stringify(user))
                localStorage.setItem('token', token)

                dispatch(setuser(user))
                dispatch(setToken(token))
                dispatch(setStatus(STATUSES.SUCCESS))

                return true
            }
        } catch (error) {
            console.error(error)
            dispatch(setStatus(STATUSES.ERROR))
            return false
        }

        return false
    }
}

export function getAllCustomer() {
    return async function getAllCustomerThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}user/all/customer` , {
                withCredentials : true
            })

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
    return async function deleteUserThunk(dispatch:AppDispatch) {

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
            console.log(error);
        }
        
    }
}

export function getSingleUser(id : number){
    return async function getSingleUserThunk(dispatch : AppDispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}user/${id}`)

            if(response.status >= 200 || response.status < 300){
                dispatch(setuser(response.data.user))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
            console.log(error);
        }
    }
}

export function logOutAction() {
    return async function logOutThunk(dispatch: AppDispatch) {
        try {
            await axios.post(
                `${config}user/logout`,
                {},
                { withCredentials: true }
            )

            localStorage.removeItem('userByapar')
            localStorage.removeItem('token')

            dispatch(setuser(null))
            dispatch(setToken(''))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.error(error)
        }
    }
}
