import React from 'react'
import {Row, Col, Form, Input} from 'antd'

function Login() {
  return (
    <div className='login'>
      
      <Row gutter={16} className='d-flex align-items-center'>

        <Col lg={16} style={{position: 'realative'}}>
          <img src="https://images.hdqwalls.com/wallpapers/ducati-custom-cafe-fighter-3i.jpg" className='login-image'/>
          <h1 className='login-logo'>BikeRide</h1>
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5'>

            <h1>Login</h1>
            <hr />

            <Form.Item name='username' label='Username' rules={[{required: true}]}>
              <Input/>
            </Form.Item>

            
            <Form.Item name='password' label='Password' rules={[{required: true}]}>
              <Input/>
            </Form.Item>

            <button className='btn1'>Login</button>

          </Form>
        </Col>


      </Row>

    </div>
  )
}

export default Login