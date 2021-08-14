import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode'
import axios from 'axios'

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Material UI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import appTheme from './util/theme'
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

// Component & Pages
import Navbar from './components/layout/Navbar';
import ScrollTop from './components/layout/ScrollTop'
import home from './pages/home'
import about from './pages/about'
import contact from './pages/contact'
import documents from './pages/documents'
import disclaimer from './pages/disclaimer'
import privacy from './pages/privacy'
import topics from './pages/topics'
import story from './pages/story'
import admin from './pages/admin'

const theme = createMuiTheme(appTheme);

axios.defaults.baseURL = 'https://us-central1-poli-news-77c19.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logoutUser());
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }
}

class App extends Component {
  render() {

    const { width } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
          <ScrollTop />
          <Navbar />
          <div className="container">
            <Switch> 
              <Route exact path='/' component={home} />
              <Route path='/topics' component={topics} />
              <Route path='/story' component={story} />
              <Route path='/about' component={about} />
              <Route path='/contact' component={contact} />
              <Route path='/documents' component={documents} />
              <Route path='/disclaimer' component={disclaimer} />
              <Route path='/privacy' component={privacy} />
              <Route path='/admin' component={admin} />
            </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired
}

export default withWidth()(App);