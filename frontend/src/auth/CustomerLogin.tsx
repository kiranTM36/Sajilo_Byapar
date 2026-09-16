import React from 'react'
import CustomerForm, { type customerData } from './CustomerForm'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { login } from '../store/userSlice'

const CustomerLogin = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = async(data : customerData) => {
        const success = await dispatch(login(data))

        if(success){
            alert("Login Sucessgully")
        }
    }
  return (
    <CustomerForm name='Login' onEvent={handleLogin} />
  )
}

export default CustomerLogin