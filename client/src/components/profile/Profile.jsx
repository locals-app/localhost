import React, { Component } from 'react';
import {Form, Field} from 'simple-react-forms';
import ToggleButton from 'react-toggle-button'

class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      user: {},
      localToggle: false,
    }
  }

  handleProfileSubmission () {
    const data = this.refs['updateProfile'].getFormValues();
    console.log(data); 
  }

  toggleSwitch () {
    this.setState({
      localToggle: !localToggle,
    })
  };

  //this will ultimately need to take facebook prof pics and names
  render() {
    return (
      
      <div>
        <div className='profilePic'>
          <img src='https://ih1.redbubble.net/image.79519809.4870/flat,800x800,075,f.u1.jpg' alt=''/> 
        </div>
        <div className='username'>
          <span>User name would eventually go here</span>
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

 