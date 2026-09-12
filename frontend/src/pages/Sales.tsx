import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {type AppDispatch, type RootState } from '../store/store'
import { getProducts } from '../store/productSlice'

const Sales = () => {

    // const dispatch = useDispatch<AppDispatch>()
    // const {products , status} = useSelector((state : RootState)=>state.product)
    // useEffect(() => {
    //     dispatch(getProducts())
    // } , [dispatch])

    // console.log(products , status)

    // if(products.length === 0){
    //     return <h1>No Products Alivalbe</h1>
    // }
    return (
        <div className=' w-full flex justify-start items-start p-4 flex-col gap-3'>

            <div className='h-[10vh] w-full bg-white shadow'></div>

            <div className='h-[200vh] w-full flex gap-4'>

                <div className='w-[60%] flex flex-col gap-2'>
                    <div className='w-full h-[10vh] bg-white shadow sticky top-[2vh] mb-[1vh] z-10'></div>
                    <div className='w-full h-[80vh] bg-white shadow overflow-x-hidden overflow-y-auto'>
                        <table className="w-full ">
                            <thead>
                                <tr className='bg-blue-300 sticky top-[13vh]'>
                                    <th className="p-1 text-center w-[40%]">
                                        Product
                                    </th>
                                    <th className=" p-1 text-center w-[20%]">
                                        Price
                                    </th>
                                    <th className=" p-1 text-center w-[20%]">
                                        Stock
                                    </th>
                                    <th className=" p-1 text-center w-[20%]">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className=" p-1 text-center">
                                        Chips
                                    </td>
                                    <td className=" p-1 text-center">
                                        20
                                    </td>
                                    <td className=" p-1 text-center">
                                        2
                                    </td>
                                    <td className=" p-1 text-center">
                                        Add
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='h-full w-[40%] bg-white shadow'></div>
            </div>



        </div>
    )
}

export default Sales