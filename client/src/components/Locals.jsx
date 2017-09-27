// list of all locals
import React, { Component } from 'react';
import axios from 'axios';
import Local from './Local'
import { getAccessToken } from '../utils/AuthService';

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
    axios.get(`/api/${location}`, 
      {headers: {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EUkdPRE5CT0VJNVFqQkZSalV6TkVRNU16QXlPVGN4TmtORFJUTXdSVUV5TUVWRFFrTkZOdyJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdC1hcHAuYXV0aDAuY29tLyIsInN1YiI6ImthUVRCamc2bTFWV1h1anVXcmpZTkRhaEhwRHlKQkVrQGNsaWVudHMiLCJhdWQiOiJpZGVudGlmaWVyLWxvY2FsaG9zdC1hcHAtYXBpIiwiZXhwIjoxNTA2NTcyNjI3LCJpYXQiOjE1MDY0ODYyMjcsInNjb3BlIjoiIn0.ADXEhgr_bnZDK8xwP5MtuZXCn3s67x-rYYikLIoif_lCmnj_MT0usn2YuW7jDsCnSN4ZGqCwfplhWuB3jMBGwLpldN112KaGItJ_H8jPw5DTJCyGdg1vgNYqIPOrUktiAHhZni5pJvV-gvKZl04WAaVAS6y66ttQXlyRWZL0vuJEPzDsGYAfcFuF5D5rWRZRWzNMyNXVnpBKhXnUxJP1OoKKTk7QohWUpkmYnXjOtGscmcvgPlvWNoaVp6T_BKiyDsjCcNUd_LX-oXyRNtXgtBBbgUfWOCYBdHM9LEfA4_4GiAF6lkvEkGbw_wSBHC3fMEV9qQCrmcOB3VyTrxCe0A",
        "token_type": "Bearer"
      }}
    ).then( (response) => {
      console.log('====================================')
      console.log(response)
      console.log('====================================')
      return response.data;
    }).then((results) => {
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
