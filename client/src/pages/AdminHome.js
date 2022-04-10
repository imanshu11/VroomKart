import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllBikes } from '../redux/actions/bikesActions'
import {Button, Row, Col, Divider, DatePicker, CheckBox, Edit} from 'antd'
import {Link} from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const {RangePicker} = DatePicker



function AdminHome() {
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



  return (
    <DefaultLayout>


    
       {loading == true && (<Spinner />)}

        <Row justify='center' gutter={0}>

          {totalBikes.map(bike=>{
            return <Col lg={5} sm={24} xs={24}>
              <div className="bike p-3 bs1">
                 <img src={bike.image} className="bikeimg" />
              </div>

              <div className="bike-content d-flex align-items-center justify-content-between">

                <div className='text-left pl-2'>
                  <p>{bike.name}</p>
                  <p>{bike.rentPerHour} Rent Per Hour /-</p>
                </div>

                <div className='mr-4'>
                  <Link to={`/editbike/${bike._id}`}><EditOutlined className='mr-3' style={{color: 'green', cursor: 'pointer'}} /></Link>
                  <DeleteOutlined style={{color: 'red', cursor: 'pointer'}} />
                </div>

              </div>
            
            </Col>
          })}
        </Row>
    </DefaultLayout>
  )
}

export default AdminHome