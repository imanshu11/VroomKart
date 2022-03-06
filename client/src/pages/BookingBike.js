import React from 'react'
import { Col, Row, Divider, Card } from 'antd'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { getAllBikes } from '../redux/actions/bikesActions'


function BookingBike({match}) {

  const {bikes} = useSelector(state=>state.bikesReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const[bike, setbike]=useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if(bikes.length==0)
    {
      dispatch(getAllBikes())
    }
    else
    {
      setbike(bikes.find(o=>o._id==match.params.bikeid))
    }
  }, [bikes])

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <Row justify='center' className='d-flex align-items-center' style={{minHeight: '90vh'}}>

        <Col lg={10} sm={24} xs={24}>
          <img src={bike.image} className="bikeimg2 bs1" />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type='horizontal'>Car Info</Divider>
          <div className='text-right'>
            <p>{bike.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel Type : {bike.fuelType}</p>
            <p>Mileage : {bike.mileage}</p>
          </div>
        </Col>

      </Row>
    </DefaultLayout>
  )
}

export default BookingBike