import React, {useEffect, useState} from 'react';
import {axiosWithAuth} from '../AxiosAuth';

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

export const Dashboard = (props) => {


    let [friendsList, setFriendsList] = useState([]);
    let [reqUpdate, setReqUpdate] = useState(false);

    let signOut = () => {
        window.localStorage.removeItem('user-auth');
        props.setLoggedIn(false);
        props.history.push('/');
        props.history.go();
    }

    useEffect(() => {
        axiosWithAuth().get('api/friends')
        .then(res => {
            console.log(res);
            setFriendsList(res.data);
        })
        .catch(err => {
            window.alert(err);
        });

    },[reqUpdate])

    let handleSubmit = (e) => {
        e.preventDefault();
        let newFriend = {
            name: e.target.elements[0].value, 
            email: e.target.elements[1].value, 
            age: Math.floor(Math.random() * (45 - 20) + 20)
        }
        axiosWithAuth().post('api/friends', newFriend)
        .then(res => {
            setReqUpdate(true);
        })
        .catch(err => {
            window.alert(err);
        })


        e.target.reset();
    }
    return(
        <div className='dash'>
            
        <button className='btn btn-danger' onClick={() => signOut()}>Sign Out</button>

        <form onSubmit={handleSubmit}>
            <input type='text' required={true} placeholder='Name' id='name'/>
            <input type='email' required={true} placeholder='Email' id='email'/>
            <button type='submit' className='btn btn-primary'> Add Friend</button>
        </form>
{ friendsList.length > 0 && friendsList.map(friend => (
        <Card key={friend.id}>
        <CardBody>
          <CardTitle>{friend.name}</CardTitle>
          <CardSubtitle>{friend.age}</CardSubtitle>
          <CardText>{friend.email}</CardText>
        </CardBody>
      </Card>
    ))
}    
        </div>
        )
}