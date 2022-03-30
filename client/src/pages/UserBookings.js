import { React, useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import {getAllBookings} from '../redux/actions/bookingActions'

function UserBookings() { 

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getAllBookings())

  }, [])


  return (
    <DefaultLayout>
      <h1>My Bookings</h1>
    </DefaultLayout>
  )
}

export default UserBookings