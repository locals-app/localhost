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

  componentWillMount() {
    console.log('locals', this.props.locationQuery)
    this.getLocals(this.props.locationQuery)
  }

  // axios request to get locals by location
  getLocals (location) {
    location = location.split(' ').join('_');
    axios.get(`/api/${location}`)
      .then((results) => {
        this.setState({
          locals: results.data,
        });
      })
      .catch( (err) => {
        console.log('it errored', err);
      });
  }

  render() {
    return (
      <div>
        {
          this.state.locals.map((local, i) => {
            return <Local local={local} key={i} launchChat={this.props.launchChat} currentUser={this.props.currentUser}/>
          })
        }
      </div>
    )
  }
}

export default Locals;
