import React, { Component } from 'react';
import {Form, Field} from 'simple-react-forms';
import ToggleButton from 'react-toggle-button'
import Geosuggest from 'react-geosuggest';

class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      localToggle: false,
      user: this.props.user,
    }
    this.handleChange = this.handleLocationChange.bind(this);
    this.handleProfileSubmission = this.handleProfileSubmission.bind(this);
  }

  handleLocationChange(value) {
    this.state.user.location = value.label;
    console.log(this.state);
  }

  handleProfileSubmission (event) {
    const data = this.refs['updateProfile'].getFormValues();
  }

  // not currently being implemented anywhere
  toggleSwitch () {
    this.setState({
      localToggle: !localToggle,
    })
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
              name='bio'
              label='Say something about yourself'
              type='text'
            />
            <Field
              name='isLocal'
              label='Would you like to be a local?'
              type='text'
            />
          </Form>
          <button className='saveProfile' onClick={this.handleProfileSubmission.bind(this)}>Save Profile</button>
        </div>
      </div>
    )
  }
}

export default Profile;

 