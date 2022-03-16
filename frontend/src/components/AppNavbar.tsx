import React, { Fragment, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import LogianModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { IAppNavbar, IAuthReduxProps } from '../types/interfaces';

const AppNavbar = ( { auth } : IAppNavbar) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    const authLinks = (
        <Fragment>
            <NavItem>
                <span className='navbar-text mr-3'>
                    <strong>
                        {auth && auth.user ? `Welcome ${auth.user.name}` : ''}
                    </strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LogianModal />
            </NavItem>
        </Fragment>
    );

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className='mb-5'>
                <Container>
                    <NavbarBrand href='/'>FaqList</NavbarBrand>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        {auth && auth.isAuthenticated ? authLinks : guestLinks}
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);