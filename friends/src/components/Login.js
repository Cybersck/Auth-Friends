
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Login = (props) => {

    let signIn = () => {
    axios.post('http://localhost:5000/api/login', {username: 'Lambda School', password: 'i<3Lambd4'})
    .then(res => {
       window.localStorage.setItem('user-auth', res.data.payload);
       props.setLoggedIn(true);
       props.history.push('/dashboard');
       props.history.go();
    })
    .catch(err => {
        window.alert(err);
    });
}

    return(
        <button className='btn btn-primary' onClick={()=> signIn()}>
            Sign In
        </button>

    )

}