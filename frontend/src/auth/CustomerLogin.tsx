import React from 'react'
import CustomerForm, { type customerData } from './CustomerForm'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store/store'
import { login } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const CustomerLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const handleLogin = async(data : customerData) => {
        const success = await dispatch(login(data))

        if(success){
            alert("Login Sucessgully")
            navigate('/')
        }
    }
  return (
    <CustomerForm name='Login' onEvent={handleLogin} />
  )
}

export default CustomerLogin