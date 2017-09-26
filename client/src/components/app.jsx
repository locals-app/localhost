import React, { Component } from 'react';
import axios from 'axios';
import ConversationStubs from './ConversationStubs.jsx';
import Auth from './../Auth/Auth.jsx';
import { Grid, Row, Col ,Navbar, Button } from 'react-bootstrap';
import Header from './Header';

// from Hugo
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Routes from './Routes';

class App extends Component {
  constructor (props) {
    super();
    this.state = {
      userLocationSet: false,
    }
  }

  componentWillMount () {
    this.lock = new Auth0Lock('kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk', 'localhost-app.auth0.com');
  }

  render() {
    return (
      <div>
        hellow worls
        <div>
        <Header lock={this.lock}></Header>
        <Grid>
          <Row>
            <Col xs={12} md={3}>
            </Col>
            <Col xs={12} md={9}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
      </div>
    );
  }
}

export default App;