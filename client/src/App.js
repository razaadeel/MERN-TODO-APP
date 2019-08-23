import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavaBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './store/action/authAction';
import { connect } from 'react-redux';
class App extends React.Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <div>
        <AppNavaBar />

        <Container>
          {
            this.props.isAuthenticated ?
              <ItemModal />
              :
              null
          }
          <ShoppingList />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    isAuthenticated: state.auth.isAuthenticated
  }
)

export default connect(mapStateToProps, null)(App);
