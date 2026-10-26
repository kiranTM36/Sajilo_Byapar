import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { STATUSES } from '../status/STATUSES'
import config from '../config/config'
import type { AppDispatch } from './store'

interface productData {
    pId : number
    id: number,
    productName : string,
    categoryId: number
    categoryName: string
    price : number,
    image: string,
    description: string
    quantity : number
}

interface productState {
    products: productData[],
    singleProduct: productData | null,
    status: string
}

interface createProduct {
    productName : string
    markedPrice: string,
    categoryId: string,
    image: File | null,
    description: string
}

const initialState: productState = {
    products: [],
    singleProduct: null,
    status: ''
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<productData[]>) {
            state.products = action.payload
        },
        setSingleProduct(state, action: PayloadAction<productData>) {
            state.singleProduct = action.payload
        },
        setStatus(state, action: PayloadAction<string>) {
            state.status = action.payload
        }
    }
})

export const { setProducts, setSingleProduct, setStatus } = productSlice.actions
export default productSlice.reducer

export function getProducts() {
    return async function getProductThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.get(`${config}products`)
            if (response.status === 201 || response.status === 200) {
                dispatch(setProducts(response.data.products))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
            console.log(error);
            
        }
    }
}

export function getSingleProducts( id : number) {
    return async function getSingleProductsThunk(dispatch: AppDispatch) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.get(`${config}products/get/${id}`)
            if (response.status === 201 || response.status === 200) {
                dispatch(setSingleProduct(response.data.product))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
            console.log(error);
            
        }
    }
}

export function createProduct(data: FormData) {
    return async function createProductThunk(dispatch: AppDispatch) {
        

        dispatch(setStatus(STATUSES.LOADING))

        try {

            const response = await axios.post(
                `${config}products/add`,
                data
            )

            console.log(response);
            

            if (response.status === 201 || response.status === 200) {
                dispatch(setStatus(STATUSES.SUCCESS))
                return true
            }

        } catch (error) {

            dispatch(setStatus(STATUSES.ERROR))
            console.error(error)

        }

        return false
     }
}