import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { editItem } from '../store/action/itemAction';

class EditModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            name: '',
            id: '',
            alert: true,
            loginAlert: false
        }
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            name: this.props.value,
            id: this.props.id
        })
    }

    onChange = (e) => {
        this.setState({ name: e.target.value })
        if (this.state.alert === false) {
            this.setState({ alert: true })
        }
    }

    submit = (e) => {
        e.prevent.default();

    }

    edit = () => {

        if (this.props.isAuthenticated) {
            if (this.state.name) {
                this.props.editItem(this.state.name, this.state.id)
                this.toggle();
                this.setState({ name: '' })
            }
            else {
                this.setState({ alert: false })
            }

        }
        else{
            this.toggle();
        }
    }

    render() {
        return (
            <div style={{ display: 'inline' }}>
                <Button color="info" style={{ marginLeft: '2rem' }} onClick={this.toggle}>
                    Edit
                 </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Edit Item in Shopping List
                    </ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.Submit}>
                            <FormGroup>
                                <Input type='text' name="name"
                                    value={this.state.name}
                                    onChange={this.onChange.bind(this)} />
                                {
                                    this.state.alert === false ?
                                        <p style={{ color: 'red' }}> Please enter a value </p>
                                        :
                                        null
                                }
                                <Button color="info" style={{ marginTop: '2rem' }} block onClick={this.edit}>Done</Button>
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
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, { editItem })(EditModal);


