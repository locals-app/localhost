import React, { Component } from 'react';
import {Form, Field} from 'simple-react-forms';
import Geosuggest from 'react-geosuggest';
import axios from 'axios';

class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      user: this.props.user,
      bioInput: '',
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleProfileSubmission = this.handleProfileSubmission.bind(this);
    this.toggleLocal = this.toggleLocal.bind(this);
    this.handleBioInput = this.handleBioInput.bind(this);
  };

  componentWillMount() {
    if (this.state.user.username) {
      this.state.user.username = this.state.user.username.replace('_', ' ');
    }
    if (!this.state.user.username) {
      this.props.history.push('/')
    }
  }

  handleLocationChange(value) {
    this.state.user.location = value.label;
    this.forceUpdate();
  };

  toggleLocal () {
    this.state.user.isLocal = !this.state.user.isLocal;
    this.forceUpdate();
  };

  handleBioInput(e) {
    this.setState({
      bioInput: e.target.value 
    });
  }

  handleProfileSubmission (event) {
    const data = this.state.bioInput;
    this.state.user.biography = data;
    axios({
      method: 'put',
      url: `/api/profiles/${this.state.user.username}`,
      data: this.state.user,
    }).then(res => console.log(res)).catch(err => console.log(err));
  };

  render() {

    return (
      <div className="background">
        <div className="container">
          <div className="row">
        <div className="col align-self-center">
        <div className="card w-50" id="profile-background">
          <div className="crop">
          <img className="card-img-top" src={this.state.user.imageUrl} alt="Card image cap" />
          </div>
          <div className="card-body">
            <h4 className="card-title">{this.state.user.username}</h4>
            <p className="card-text">{this.state.user.biography}</p>
          </div>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><span className="form-span">Your City:</span><Geosuggest onSuggestSelect={this.handleLocationChange}/></li>
            <li className="list-group-item"> <span className="form-span">Bio:</span>
            
              <div className="geosuggest">
                <div className="geosuggest__input-wrapper">
                <form ref='updateProfile' className='updateProfile'>
              <input
                className='geosuggest__input'
                id='bio-input'
                name='biography'
                type='text'
                placeholder="Say something about yourself!"
                value={this.state.bioInput}
                onChange={this.handleBioInput}
              />
              </form>
              </div>
              </div>
            
            </li>
            <li className="list-group-item">
              Are you a local? {this.state.user.isLocal ? (<i onClick={this.toggleLocal} className="fa fa-3x fa-toggle-on toggle-switch" aria-hidden="true"></i>) : (<i onClick={this.toggleLocal} className="fa fa-3x fa-toggle-off toggle-switch" aria-hidden="true"></i>)}
            </li>
            <li>
              <button className="saveProfile btn btn-primary btn-lg btn-block" type="button" data-toggle="modal" data-target="#exampleModal">
                Save Changes
              </button>
              <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Your Profile</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <p>Changes Saved!</p>
                    </div>
                    <div className="modal-footer">
                      <button onClick={this.handleProfileSubmission.bind(this)} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </div>
      </div>
      </div>
    )
  };
  
};

export default Profile;

 