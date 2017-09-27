import React, { Component } from 'react';
// for get and post requests, use axios.get, axios.post
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
    }
    //method bindings
    // this.sampleMethod = this.sampleMethod.bind(this);
  }

  render() {
   if(this.state !== null) { //not null, but basically a condition
   //that says if we already have data, don't fetch the database for more data
   //otherwise, we'll end up in an infinite loop of fetching data
     this.fetchData(); //whatever method you used to fetch data
    }
    return (
      <div className="main">
        Login Page
      </div>
    )
  }
}

export default App;