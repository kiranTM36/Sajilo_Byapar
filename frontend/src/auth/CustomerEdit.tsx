import React from 'react'
import CustomerForm, { type customerData } from './CustomerForm'

const CustomerEdit = () => {
    const handleEdit = async(data:customerData) => {

    }
  return (
    <CustomerForm name='Edit'onEvent={handleEdit} />
  )
}

export default CustomerEdit