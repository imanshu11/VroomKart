import React from 'react'
import { Menu, Dropdown, Button, Row, Col } from 'antd';

function DefaultLayout(props) {

  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="https://www.antgroup.com">
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://www.antgroup.com">
          Bookings
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://www.aliyun.com">
          Profile
        </a>
      </Menu.Item>
      <Menu.Item onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }}>
        <li>Logout</li>

      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">

        <div className="d-flex justify-content-between">

          <h1>RideBikes</h1>


          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button>{user.username}</Button>
          </Dropdown>

        </div>

      </div>
      <div className="content" >
        {props.children}
      </div>

    </div>
  )
}

export default DefaultLayout