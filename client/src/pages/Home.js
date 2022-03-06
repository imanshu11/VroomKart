import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllBikes } from '../redux/actions/bikesActions'
import { Button, Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import Spinner from '../components/Spinner';

function Home() {
  const {bikes} = useSelector(state=>state.bikesReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBikes())
  }, [])

  return (
    <DefaultLayout>

       {loading == true && (<Spinner />)}

        <Row justify='center' gutter={0} className='mt-5'>

          {bikes.map(bike=>{
            return <Col lg={5} sm={24} xs={24}>
              <div className="bike p-3 bs1">
                 <img src={bike.image} className="bikeimg" />
              </div>

              <div className="bike-content d-flex align-items-center justify-content-between">

                <div>
                  <p>{bike.name}</p>
                  <p>{bike.rentPerHour} Rent Per Hour /-</p>
                </div>

                <div>
                  <button className="btn1 mr-2"><Link to={`/booking/${bike._id}`}>Book Now</Link></button>
                </div>

              </div>
            
            </Col>
          })}
        </Row>
    </DefaultLayout>
  )
}

export default Home