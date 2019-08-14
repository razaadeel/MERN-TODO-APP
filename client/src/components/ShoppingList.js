import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../store/action/itemAction';

class ShoppingList extends Component {
    UNSAFE_componentWillMount() {
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
                        {
                            this.props.item.items.map(({_id, name }) => (
                                <CSSTransition key={_id} timeout={1000} classNames="fade">
                                    <ListGroupItem>
                                        <Button color="danger" size="sm" style={{ marginRight: "0.5em" }} onClick={this.removeItem.bind(this, _id)}>
                                            <b>X</b>
                                        </Button>
                                        {name}
                                    </ListGroupItem>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

const mapStateToProps = (state) => (
    {
        item: state.item
    }
)

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);