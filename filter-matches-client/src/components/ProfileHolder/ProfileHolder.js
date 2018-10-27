import React, { Component } from 'react';
import { Card } from 'antd';

import 'antd/dist/antd.css';
import './ProfileHolder.css'


class ProfileHolder extends Component {

  constructor(props){
    console.log(props)
    super(props)
  }

render(){
 let firstText = `${this.props.profile.age} | ${this.props.profile.height}  | ${this.props.profile.city}`
 let secondText = `${this.props.profile.religion} | ${this.props.profile.profession}`
 let thirdText = `Contact Shared : ${this.props.profile.contactShared}`
  console.log(this.props.profile)
    return (
        <div className="flex-container">
          <div>
          <img src={this.props.profile.image || require('../../default.png')} alt="Italian Trulli"
          style={{
            width:"350px",
            height:"350px",
            margin:"5%",
            "marginRight":"20%",
            "textAlign":"center",
          }}/>
          </div>
          <div>
          <Card title={this.props.profile.name} bordered={false}
                style={{ 
                  "marginLeft":"20%",
                  "marginTop":"30%",
                  "width":"100%",
                  float:"left"
                }}>
            <p>{firstText}</p>
            <p>{secondText}</p>
            <p>{thirdText}</p>
          </Card>
      </div>
      </div>
      );
    }
}

export default ProfileHolder;