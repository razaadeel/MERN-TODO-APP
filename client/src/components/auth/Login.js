import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    NavLink,
    Label,
    Alert,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../store/action/authAction';
import { clearErrors } from '../../store/action/errorAction';


class RegisterModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            email: '',
            password: '',
            msg: null,
            alert: true,
        }
    }

    componentDidUpdate() {
        if (this.state.modal) {
            if (this.props.isAuthenticated) {
                this.toggle();
                this.setState({ isLoading: false });
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    submit = (e) => {
        e.prevent.default();

    }

    login = () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        //Register New User
        this.props.login(user);
        this.setState({email: '', password: ''})
    }

    render() {
        return (
            <div style={{ display: 'inline' }}>
                {
                    !this.props.isAuthenticated ?
                        <NavLink onClick={this.toggle} href="#">
                            Login
                        </NavLink>
                        :
                        null
                }

                <Modal isOpen={this.state.modal} toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle}> Register </ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.Submit}>
                            <FormGroup>
                                <Label>Email: </Label>
                                <Input type='text'
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange.bind(this)}
                                    className="mb-3" />

                                <Label>Password: </Label>
                                <Input type='password'
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange.bind(this)}
                                    className="mb-3" />

                                {
                                    this.props.error.id === "LOGIN_FAIL" ?
                                        <Alert color="danger"> {this.props.error.msg} </Alert>
                                        :
                                        null
                                }

                                <Button color="info" style={{ marginTop: '2rem' }} block onClick={this.login}>
                                    {
                                        this.props.isLoading ?
                                            <Spinner color="light" size="sm" />
                                            :
                                            'Sign In'
                                    }
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading,
        error: state.error
    }
)


export default connect(mapStateToProps, { login, clearErrors })(RegisterModal);


