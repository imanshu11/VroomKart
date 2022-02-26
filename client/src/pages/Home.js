import React from 'react'
import { useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'

function Home() {
  const {bikes} = useSelector(state=>state.bikesReducer)
  return (
    <DefaultLayout>
        <h1>Home Page</h1>
        <h1>The length of bikes array is {bikes.length}</h1>
    </DefaultLayout>
  )
}

export default Home