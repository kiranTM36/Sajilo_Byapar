import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { STATUSES } from '../status/STATUSES'
import axios from 'axios'
import config from '../config/config'

interface categoryData {
    id : Number ,
    categoryName : string
}

interface categoryState {
    category : categoryData[] ,
    status : string
}

const initialState :categoryState = {
    category : [],
    status : ''
}

const categorySlice = createSlice({
    name : "category",
    initialState ,
    reducers : {
        setCategory(state , action : PayloadAction <categoryData[]>){
            state.category = action.payload
        },
        setStatus(state , action : PayloadAction<string>){
            state.status = action.payload
        }
    }
})

export const { setCategory , setStatus } = categorySlice.actions
export default categorySlice.reducer

export function getCategory(){
    return async function getCategoryThunk( dispatch : any ) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.get(`${config}category/all`)

            if(response.status === 200 ){
                dispatch(setCategory(response.data.categorys))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}