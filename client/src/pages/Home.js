import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllBikes } from '../redux/actions/bikesActions'

function Home() {
  const {bikes, loading} = useSelector(state=>state.bikesReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBikes())
  }, [])

  return (
    <DefaultLayout>
        <h1>Home Page</h1>
        <h1>The length of bikes array is {bikes.length}</h1>
    </DefaultLayout>
  )
}

export default Home