import React from 'react'
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { getAllBikes } from '../redux/actions/bikesActions'
import moment from 'moment'
import { bookBike } from '../redux/actions/bookingActions'
import StripeCheckout from 'react-stripe-checkout';

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
  const [showModal, setShowModal] = useState(false)

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




  function onToken(token){
    const reqObj = {

      token,
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
            <br />
            <br />
            <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>See Booked Slots</button>
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

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51KhdgXSJaGUzL2E3YkM1xE9JDWMbvddiRI4hsJRcr8RRFXP8bfaJqkODAlzKRnAIMSa8mhuUBtuJ7wHCHGecFQAM0077TkvylI">
                
                <button className='btn1'>
                  Book Now
                </button>
                
                </StripeCheckout>

              </div>
           
          )}

        </Col>


        {bike.name && (

          <Modal visible={showModal} closable={false} footer={false} title='Booked time slots'>

            {bikes.length && (<div className='p-2'>

              {bike.bookedTimeSlots.map(slot => {

                return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>


              })}

              <div className='text-right'>

                <button className='btn1' onClick={() => { setShowModal(false) }}>CLOSE</button>

              </div>

            </div>)}

          </Modal>


        )}

      </Row>



    </DefaultLayout>
  )
}

export default BookingBike