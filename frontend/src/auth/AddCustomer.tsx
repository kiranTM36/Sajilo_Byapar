import React from 'react'
import CustomerForm, { type customerData } from './CustomerForm'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { getAllCustomer, signUp } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const AddCustomer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleAddCustomer = async (data: customerData) => {
    try {

        const success = await dispatch(signUp(data))


        if(success){
            await dispatch(getAllCustomer())
            alert("New Customer Added Successfully")
            navigate('/customers')
        }else{
         alert("Something went Wrong")   
        }

    } catch (error) {
        console.log("ERROR:", error)
    }
}
  return (
    <div>
        <CustomerForm name='Add' onEvent={handleAddCustomer} />
    </div>
  )
}

export default AddCustomer