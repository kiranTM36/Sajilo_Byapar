import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { STATUSES } from '../status/STATUSES'

interface categoryData {
    _id: string,
    categoryName: string
}

interface productData {
    _id: string,
    productName : string
    markedPrice: number,
    category: categoryData,
    image: string,
    description: string
}

interface productState {
    products: productData[],
    singleProduct: productData | null,
    status: string
}

interface createProduct {
    productName : string
    markedPrice: number,
    categoryId: string,
    image: string,
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
    return async function getProductThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.get('')
            if (response.status === 201 || response.status === 200) {
                dispatch(setProducts(response.data.products))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function getSingleProducts( _id : string) {
    return async function getSingleProductsThunk(dispatch: any) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await axios.get('')
            if (response.status === 201 || response.status === 200) {
                dispatch(setSingleProduct(response.data.product))
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function createProduct(data : createProduct){
    return async function createProductThunk(dispatch:any) {
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await axios.post('' , data)
            
            if(response.status === 201 || response.status === 200){
                dispatch(setStatus(STATUSES.SUCCESS))
            }
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}