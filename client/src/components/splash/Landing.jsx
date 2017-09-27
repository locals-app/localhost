import React, { Component} from 'react';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.showLock = () => props.lock.show()
  }
  
  render() {
    return (
      <div>      
        <div> this is the Landing component </div>
        <div className="login-box">
          <a onClick={this.showLock}>Sign In</a>
        </div>
      </div>
    );
  }
}

export default Landing;