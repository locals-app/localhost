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
    };
    this.getLocals = this.getLocals.bind(this);
  }

  getLocals (location) {
    location = location.split(' ').join('_');
    axios.get(`/api/${location}`).then((results) => {
        this.setState({
          locals: results.data,
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
            this.state.locals.map((local) => {
              return <Local local={local} />
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
