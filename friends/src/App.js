import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory, Redirect} from 'react-router-dom';
import {axiosWithAuth} from './AxiosAuth';
import {Login} from './components/Login';
import {Dashboard} from './components/Dashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  let history = useHistory();

  
  let [token, setToken] = useState(false);
  let [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let token = window.localStorage.getItem('user-auth') ? window.localStorage.getItem('user-auth') : null;
    if (token !== null) {
      setLoggedIn(true);
      setToken(token)
    }
  },[])

  const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      typeof token === "string"
      ? <Component {...props} history={history} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      : <Redirect to='/'/>
    )}/>
  )

  const PublicRoute = ({ component: Component, ...rest}) => (

    <Route {...rest} render={(props) => (
      typeof token === "string"
      ? <Redirect to='/dashboard'/>
      : <Component {...props} history={history} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
    )}/>
  )

  return (
    <Switch>
        <PublicRoute exact path='/' component={Login}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
    </Switch>
  );
}

export default App;
