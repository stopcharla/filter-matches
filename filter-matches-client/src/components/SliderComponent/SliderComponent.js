import React, { Component } from 'react';
import { Slider } from 'antd';

import 'antd/dist/antd.css';
import './SliderComponent.css'

const ranges = {
  age:[18,95],
  height:[135,210],
  compatiblity:[1,99],
  distance:[30,300]
}

class SliderComponent extends Component {

  constructor(props){
    console.log("&&&&&&&&&&&:",props)
    console.log("%%%%%%%%%%%:",props.name)
    console.log(ranges)
    // props.range = ranges[props.name];
    super(props)
    this.state = {
      value : ranges[props.name],
      max : 300,
      min : 30
    }
    
  }

render(){
    let text = this.props.text
    // let rangeStart = this.props.text
    // let text = this.props.text
    let map = {
      "1":true,
      "0":false
    } 
    return (
      
      <div>
        <p>
        {text}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Slider range defaultValue={[20,50]} onChange={this.props.sliderChange}/>
        </p>
      <br/>

      </div>
        
    )
  }
}

export default SliderComponent;