import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import AppNavbar from './components/AppNavbar';

import { loadUser } from './flux/actions/authActions';
import store from './flux/store';
import FaqModal from './components/faqModal';
import FaqList from './components/faqList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavbar />
        <Container>
          <FaqModal />
          <FaqList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
