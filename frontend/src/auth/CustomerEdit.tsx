import React from 'react'
import CustomerForm, { type customerData } from './CustomerForm'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../store/store'
import { signUp } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const CustomerEdit = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate() 
    const handleEdit = async(data:customerData) => {
      const success = await dispatch(signUp(data))
      // if(success){
      //   navigate('/customers')
      //   alert("User Sign Up")
      // }else{
      //   alert("error")
      // }

      console.log(data)
    }
  return (
    <CustomerForm name='Edit' onEvent={handleEdit} />
  )
}

export default CustomerEdit