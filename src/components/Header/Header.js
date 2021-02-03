import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { authSignout } from '../../redux/actions/auth.action';
import '../components.css'

const Header = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    return (
        <Navbar collapseOnSelect expand="sm" fixed='top' variant="dark" style={{ zIndex: '1', backgroundColor: '#2874F0' }}>
            <Container fluid>
                <Link to='/'>
                    <Navbar.Brand href="#home">Flipcart Admin</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ml-auto'>
                        {
                            auth.authenticate ?
                                <span
                                    onClick={() => dispatch(authSignout())}
                                    className='custom-btn'
                                >Sign out</span>
                                :
                                <>
                                    <NavLink to='/signin' className='nav-link' >Signin</NavLink>
                                    <NavLink to='/signup' className='nav-link' >Signup</NavLink>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;