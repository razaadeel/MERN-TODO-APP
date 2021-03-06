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
import { addItem } from '../store/action/itemAction';

class ItemModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            name: '',
            alert: true
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
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

    add = () => {
        if (this.state.name) {
            this.props.addItem({ name: this.state.name })
            this.toggle();
            this.setState({ name: '' })
        }
        else {
            this.setState({ alert: false })
        }
    }

    render() {
        return (
            <div>
                <Button color="dark" style={{ marginBottom: '2rem' }} onClick={this.toggle}>
                    Add Item
                 </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add to Shopping List
                    </ModalHeader>

                    <ModalBody>
                        <Form onSubmit={this.Submit}>
                            <FormGroup>
                                <Input type='text' name="name" placeholder="Add Item" onChange={this.onChange.bind(this)} />
                                {
                                    this.state.alert === false ?
                                        <p style={{ color: 'red' }}> Please enter a value </p>
                                        :
                                        null
                                }
                                <Button color="dark" style={{ marginTop: '2rem' }} block onClick={this.add}>Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { addItem })(ItemModal);


