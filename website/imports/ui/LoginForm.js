import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [action, setActon] = useState('login');

    const user = useTracker(() => Meteor.user());

    const submit = e => {
        e.preventDefault();
        if(action == 'login')  Meteor.loginWithPassword(username, password);
        else if(action == 'logout') Meteor.logout();
        else alert("shouldn't get here");
    }

    return (
        <div>
            <Alert variant={user ? "success" : "danger"}>
                <Alert.Heading>{user ? "Current User: " + user.username : "No Current User, Please Login"}</Alert.Heading>
                <hr />
                <p className="mb-0">
                    This page is intended for admin purposes only. If you are a guest on my site, you don't need to login!
                </p>
            </Alert>

            <Form onSubmit={submit} style={{margin: "10px"}} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <Form.Text className="text-muted">
                       Passwords are encrypted and kept secure.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick = {e => setActon('login')} style={{margin: "10px"}}>
                    Login
                </Button>
                <Button variant="primary" type="submit" onClick = {e => setActon('logout')} style={{margin: "10px"}}>
                    Logout
                </Button>
            </Form>
        </div>
    );
};