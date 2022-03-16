import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllBikes } from '../redux/actions/bikesActions'
import {Button, Row, Col, Divider, DatePicker, CheckBox} from 'antd'
import {Link} from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment'

const {RangePicker} = DatePicker

function Home() {
  const {bikes} = useSelector(state=>state.bikesReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const [totalBikes, setTotalbikes] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBikes())
  }, [])

  useEffect(() => {

    setTotalbikes(bikes)

  }, [bikes])

  function setFilter(values){

    var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
    var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

    var temp=[]

    for(var bike of bikes){


      if(bike.bookedTimeSlots.length == 0){
        temp.push(bike)
      }
      else{
        
        for(var booking of bike.bookedTimeSlots){

          if(selectedFrom.isBetween(booking.from, booking.to) ||
          selectedTo.isBetween(booking.from, booking.to) ||
          moment(booking.from).isBetween(selectedFrom, selectedTo) ||
          moment(booking.to).isBetween(selectedFrom, selectedTo) 
          )
          {

          }
          else{
            temp.push(bike)
          }

        }

      }


    }


    setTotalbikes(temp)


  }

  return (
    <DefaultLayout>


      <Row className='mt-3' justify='center'>

        <Col lg={20} sm={24} className='d-flex justify-content-left'>

          <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={setFilter} />


        </Col>



      </Row>

       {loading == true && (<Spinner />)}

        <Row justify='center' gutter={0}>

          {totalBikes.map(bike=>{
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