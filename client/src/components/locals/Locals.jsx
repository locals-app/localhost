// list of all locals
import React, { Component } from 'react';
import axios from 'axios';
import Local from './Local'

class Locals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locals: [],
      ready: false,
      token: ''
    };
    this.getLocals = this.getLocals.bind(this);
  }

  getToken() {
    axios.get('/', {
      headers: {'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDY1ODAyNDB9.Pee31kQpxLymOUjvi4ZAfuGw-OTn1V7Xv7ebZOtf874'}
    })
      .then((results) => {
        this.setState({
          token: results.data.token
        });
      })
  }

  getLocals (location) {
    location = location.split(' ').join('_');
    console.log(localStorage.getItem('id_token'));
    axios.get(`/api/${location}`, {
      // headers: {'Authorization': 'Bearer ' + localStorage.getItem('id_token')}
      headers: {'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MDY1ODAyNDB9.Pee31kQpxLymOUjvi4ZAfuGw-OTn1V7Xv7ebZOtf874'}
    }).then((results) => {
        this.setState({
          locals: results.data.userList,
          ready: true,
        });
      })
      .catch( (err) => {
        console.log('it errored', err);
      });
  }

  render() {
    if (this.state.ready) {
      return (
        <div>
          {
            this.state.locals.map((local, i) => {
              return <Local local={local} key={i}/>
            })
          }
        </div>
      )
    } else {
      this.getLocals('Los Angeles'); // this needs to be changed to handle a click at the App level and route to this component.
      return (
        <div>
          Loading       
        </div>
      )
    }
  }
}

export default Locals;
