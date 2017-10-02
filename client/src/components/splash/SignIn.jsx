import React, { Component } from 'react';
import axios from 'axios';


class SignIn extends Component {

  constructor(props) {
    super(props);
    this.showLock = () => props.lock.show()
  }
  
  render() {
    return (
      <div>
        {/* <div className="background"> */}
          <div>

          <video id="bgvid" autoPlay muted loop>
            <source src="./final-reduced-size.webm" type="video/webm" />
            Your browser does not support HTML5 video.
          </video>
          <div className="container"> 
            <div className="row">
              <div className="col align-self-center">
                <div className="card w-50" id="signup-background">
                  <div className="crop">
                    <div id="signup-logo">
                      localhost
                  </div>
                  <h4 id="sub-menu">
                    connecting tourists with locals
                    </h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item" id="sign-up-btn"><button onClick={this.showLock} className="saveProfile btn btn-primary btn-lg btn-block">Sign Up / Log In</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default SignIn;