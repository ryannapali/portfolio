import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";

import Login from './Login';
import Home from './Home.js';
import Blog from './Blog.js';
import Photography from './Photography.js';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
        <Router>
          <Navbar sticky="top" bg="light" expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/blog">Blog</Nav.Link>
                <Nav.Link href="/photography">Photography</Nav.Link>
                <Nav.Link href="/pottery">Pottery</Nav.Link>
                <NavDropdown title="Projects" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

            <Switch>
              <Route path="/(|about)" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/blog" component={Blog}/>
              <Route path="/users" component={Blog}/>
              <Route path="/photography" component={Photography}/>
            </Switch>
        </Router>
    );
  }
}