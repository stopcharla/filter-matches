import React, { Component } from 'react';
import { Radio } from 'antd';

import 'antd/dist/antd.css';
import './RadioButtonComponent.css'

const  RadioGroup = Radio.Group;

class RadioButtonComponent extends Component {

  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      value : 1
    }
    // this.onChange = this.onChange.bind(this)
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.props.onChange(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }


render(){
    let text = this.props.text
    let map = {
      "1":true,
      "2":false
    } 
    return (
      <div>
        <p>{text}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>Yes</Radio>
          <Radio value={2}>No</Radio>
        </RadioGroup>
        <br/>
        </p>
      </div>
        
    )
  }
}

export default RadioButtonComponent;