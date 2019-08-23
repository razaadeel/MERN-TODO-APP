import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import Login from './auth/Login';
import { connect } from 'react-redux';

class AppNavBar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    };
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar >
                            {
                                !this.props.isAuthenticated ?
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <RegisterModal />
                                        </NavItem>
                                        <NavItem>
                                            <Login />
                                        </NavItem>
                                    </Nav>
                                    :
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <span className="navbar-text mr-3">
                                                <strong>{`Welcome ${this.props.user.name}`}</strong>
                                            </span>
                                        </NavItem>
                                        <NavItem>
                                            <Logout />
                                        </NavItem>
                                    </Nav>
                            }
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
)

export default connect(mapStateToProps, null)(AppNavBar);