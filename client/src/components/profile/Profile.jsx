import React, { Component } from 'react';
import {Form, Field} from 'simple-react-forms';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user,
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleProfileSubmission = this.handleProfileSubmission.bind(this);
    this.toggleLocal = this.toggleLocal.bind(this);
  };

  handleLocationChange(value) {
    this.state.user.location = value.label;
    this.forceUpdate();
  };

  toggleLocal () {
    this.state.user.isLocal = !this.state.user.isLocal;
    this.forceUpdate();
  };

  handleProfileSubmission (event) {
    const data = this.refs['updateProfile'].getFormValues();
    this.state.user.biography = data.biography;
    axios({
      method: 'put',
      url: `/api/profiles/${this.state.user.username}`,
      data: this.state.user,
    }).then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {

    return (
      
      <div>
        <div className='profilePic'>
          <img style={{width: 300}} src={this.state.user.imageUrl} alt=''/> 
        </div>

        <div className='username'>
          <span>{this.state.user.username}</span>
        </div>

        <div>
          <span>Location</span>
          <Geosuggest onSuggestSelect={this.handleLocationChange}/>
        </div>

        <div>
          <Form ref='updateProfile' className='updateProfile'>
            <Field
              className='bio'
              name='biography'
              label='Say something about yourself'
              type='text'
            />
          </Form>
          
          {this.state.user.isLocal ? (<i onClick={this.toggleLocal} className="fa fa-3x fa-toggle-on" aria-hidden="true"></i>) : (<i onClick={this.toggleLocal} className="fa fa-3x fa-toggle-off" aria-hidden="true"></i>)}

          <button className='saveProfile' onClick={this.handleProfileSubmission.bind(this)}>Save Profile</button>
        </div>
      </div>
    )
  };
  
};

export default Profile;

 