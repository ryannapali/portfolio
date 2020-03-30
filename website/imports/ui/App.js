import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { motion } from "framer-motion"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//https://www.framer.com/blog/posts/react-portfolio/

import Home from './Home.js';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap";

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
        <Router>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Welcome to napali.raymundo.org</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link href="#link">
                  <Link to="/about">About</Link>
                </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form inline className="search_thing">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <div>

            <Switch>
              <Route path="/about">
              </Route>
              <Route path="/users">
                <Home />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}
