import React from 'react';
import Header from '../Header/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../components.css';


const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col sm='2' className='sidebar'>
                                <ul className='sidebar-ul'>
                                    <li className='sidebar-li'>
                                        <NavLink
                                            to='/'>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className='sidebar-li'>
                                        <NavLink 
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "red",
                                                textDecoration: 'underline'
                                            }} 
                                            to='/page'>
                                            Page
                                        </NavLink>
                                    </li>
                                    <li className='sidebar-li'>
                                        <NavLink 
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "red",
                                                textDecoration: 'underline'
                                            }} 
                                            to='/categories'>
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li className='sidebar-li'>
                                        <NavLink 
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "red",
                                                textDecoration: 'underline'
                                            }} 
                                            to='/products'>
                                            Products
                                        </NavLink>
                                    </li>
                                    <li className='sidebar-li'>
                                        <NavLink 
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "red",
                                                textDecoration: 'underline'
                                            }} 
                                            to='/orders'>
                                            Orders
                                        </NavLink>
                                    </li>
                                    <li className='sidebar-li'>
                                        <NavLink 
                                            activeStyle={{
                                                fontWeight: "bold",
                                                color: "red",
                                                textDecoration: 'underline'
                                            }} 
                                            to='/home-page/banner'>
                                            Home Page Banner
                                        </NavLink>
                                    </li>
                                </ul>
                            </Col>
                            <Col sm='10' style={{ marginLeft: 'auto', marginTop: '60px' }}>{props.children || "Containers"}</Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }
        </>
    );
};

export default Layout;