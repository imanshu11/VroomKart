import React from 'react'
import {Row, Col, Form, Input} from 'antd'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../redux/actions/userActions';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function Login() {

  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)

  function onFinish(values){
    dispatch(userLogin(values))
    console.log(values)
  }

  return (
    <div className='login'>

      {loading && (<Spinner />)}
      
      <Row gutter={0} className='d-flex align-items-center'>

        <Col lg={15} style={{position: 'relative'}}>
          <img
           data-aos='slide-right'
           data-aos-duration='1500'
           src="https://images.hdqwalls.com/wallpapers/ducati-custom-cafe-fighter-3i.jpg" className='login-image'/>
          <h1 className='login-logo'>BikeRide</h1>
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>

            <h1>Login</h1>
            <hr />

            <Form.Item name='username' label='Username' rules={[{required: true}]}>
              <Input/>
            </Form.Item>

            
            <Form.Item name='password' label='Password' rules={[{required: true}]}>
              <Input/>
            </Form.Item>

            <button className='btn1 mt-1'>Login</button>

            <hr />

            <Link to="/register">Click Here to Register</Link>

          </Form>
        </Col>


      </Row>

    </div>
  )
}

export default Login