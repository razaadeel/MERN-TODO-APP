import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../store/action/itemAction';
import EditModal from './EditModal'

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    removeItem = (id) => {
        this.props.deleteItem(id)
    }

    render() {
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup>
                        {this.props.item ?
                            this.props.item.items.map(({ _id, name }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>

                                        {
                                            this.props.isAuthenticated ?
                                                <Button
                                                    color="danger"
                                                    size="sm"
                                                    style={{ marginRight: "0.5em" }}
                                                    onClick={this.removeItem.bind(this, _id)}>
                                                    <b>X</b>
                                                </Button>
                                                : null
                                        }
                                        {name}
                                        {
                                            this.props.isAuthenticated ?
                                                <EditModal value={name} id={_id} />
                                                :
                                                null
                                        }

                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                            :
                            null
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => (
    {
        item: state.item,
        isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);