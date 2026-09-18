import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../store/store'
import { getSingleUser } from '../store/userSlice'

const SingleCustomer = () => {
    const {id} = useParams()

    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state:RootState) => state.user)

    useEffect(() => {
        if(id){
            dispatch(getSingleUser(Number(id)))
        }
    } , [dispatch , id])

    console.log(user)
  return (
    <div>SingleCustomer</div>
  )
}

export default SingleCustomer