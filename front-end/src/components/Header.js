import React from 'react';
import {
    Navbar,
    Nav,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import logo from '../assets/images/logo.png'

const Header = () => {
    return (
        <div className='header'>
            <Navbar bg="light" variant="light" className='header-navbar' expand='lg'>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={logo}
                        className="logo"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <InputGroup size='lg'>
                        <FormControl
                            className='search-bar'
                            placeholder="Search icons..."

                        />
                        <InputGroup.Append>
                        <i className="fal fa-search"></i>
                        </InputGroup.Append>
                    </InputGroup>
                    <Nav>
                        <Nav.Link href="#start">Start</Nav.Link>
                        <Nav.Link href="#icons">Icons</Nav.Link>
                        <Nav.Link href="#docs">Docs</Nav.Link>
                        <Nav.Link href="#support">Support</Nav.Link>
                        <Nav.Link href="#plans">Plans</Nav.Link>
                        <Nav.Link href="#blog">Blog</Nav.Link>
                    </Nav>

                    <a className='signin' href="#signin">Sign in <i className="fal fa-sign-in-alt"></i></a>

                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;