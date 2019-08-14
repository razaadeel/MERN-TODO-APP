import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavaBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <AppNavaBar />

          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>

    )
  }
}
export default App;
