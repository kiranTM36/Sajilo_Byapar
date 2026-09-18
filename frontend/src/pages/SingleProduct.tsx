import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getSingleProducts } from '../store/productSlice'
import { useParams } from 'react-router-dom'
import config from '../config/config'

const SingleProduct = () => {

    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {singleProduct} = useSelector((state:RootState) => state.product)

    useEffect(() => {
        if (id) {
            dispatch(getSingleProducts(Number(id)))
        }
    }, [dispatch, id])

    console.log(singleProduct)
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='h-3/5 w-1/2 relative border  border-gray-200 rounded-2xl bg-white shadow-2xl flex justify-center items-center p-4 '>
            <div className='h-3/4 w-4/10 '>
                <img src={`${config}uploads/${singleProduct?.image}`} alt="" />
                <p className='absolute z-10 px-2 rounded-md top-3 left-3 bg-amber-100 text-amber-700'>{singleProduct?.categoryName}</p>
            </div>
            <div className='h-full w-6/10'>
                <h1 className='text-2xl font-bold'>{singleProduct?.productName.toUpperCase()}</h1>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct