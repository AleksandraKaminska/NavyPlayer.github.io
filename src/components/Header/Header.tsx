import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Row, Col, Space } from 'antd'
import Login from '../Login/Login'
import Search from '../Search/SearchInput'
import './Header.less'

const Header = () => {
  const { pathname } = useLocation()
  return (
    <Layout.Header className="Header">
      <Row justify="space-between">
        <Col xs={{ span: 12 }} xl={{ span: 8 }}>
          <Space>
            <Link to="/">
              <img src="/assets/images/logo.png" alt="navy player logo" className="logo" width={156.3} height={35} />
            </Link>
            <Menu className="menu" mode="horizontal" selectedKeys={[pathname]}>
              <Menu.Item key="/">
                <Link to="/">Explore</Link>
              </Menu.Item>
              <Menu.Item key="/artists">
                <Link to="/artists">Artist</Link>
              </Menu.Item>
            </Menu>
          </Space>
        </Col>
        <Col className="align-center" xs={{ span: 11, offset: 1 }} xl={{ span: 8, offset: 2 }}>
          <Search />
        </Col>
        <Col xl={{ span: 2, offset: 4 }}>
          <Login />
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header