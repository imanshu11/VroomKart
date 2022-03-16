import React from 'react'
import { Col, Row, Divider, DatePicker, Checkbox } from 'antd'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { getAllBikes } from '../redux/actions/bikesActions'
import moment from 'moment'
import { bookBike } from '../redux/actions/bookingActions'

const { RangePicker } = DatePicker
function BookingBike({ match }) {

  const { bikes } = useSelector(state => state.bikesReducer)
  const { loading } = useSelector(state => state.alertsReducer)
  const [bike, setbike] = useState({})
  const dispatch = useDispatch()
  const [from, setfrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setdriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (bikes.length == 0) {
      dispatch(getAllBikes())
    }
    else {
      setbike(bikes.find(o => o._id == match.params.bikeid))
    }
  }, [bikes]);



  useEffect(() => {

    setTotalAmount((totalHours * bike.rentPerHour))
    if (driver) {
      setTotalAmount(totalAmount + (30 * totalHours))
    }

  }, [driver, totalHours])



  function selectTimeSlots(values) {

    setfrom(moment(values[0]).format('MMM DD yyyy HH:mm'))
    setTo(moment(values[1]).format('MMM DD yyyy HH:mm'))

    setTotalHours(values[1].diff(values[0], 'hours'))
  }


  function bookNow() {

    const reqObj = {

      user: JSON.parse(localStorage.getItem('user'))._id,
      bike: bike._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }


    }

    dispatch(bookBike(reqObj))
  }

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>

        <Col lg={10} sm={24} xs={24}>
          <img src={bike.image} className="bikeimg2 bs1" />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type='horizontal'>Bike Info</Divider>
          <div className='text-right'>
            <p>{bike.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel Type : {bike.fuelType}</p>
            <p>Mileage : {bike.mileage}</p>
            <Divider type='horizontal'>Select Time Slots</Divider>
            <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={selectTimeSlots} />
          </div>

          
          

          {from && to && (
            <div className='text-right'>
              
              <p>Total Hours : <b>{totalHours}</b></p>
              <p>Rent PerHour : <b>{bike.rentPerHour}</b></p>

              <Checkbox onChange={(e) => {
                if (e.target.checked) {
                  setdriver(true);
                }
                else {
                  setdriver(false);
                }
              }}>Driver Required</Checkbox>

              <h3>TotalAmount : {totalAmount}</h3>

              <button className='btn1' onClick={bookNow}>Book Now</button>
            </div>
          )}

        </Col>

      </Row>
    </DefaultLayout>
  )
}

export default BookingBike