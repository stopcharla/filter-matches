import React, { Component } from 'react';
import { Drawer, Button, Divider } from 'antd';
import RadioButtonComponent from '../RadioButtonComponent/RadioButtonComponent'
import SliderComponent from '../SliderComponent/SliderComponent';
class Filter extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
  onAppliyBtnClick = () => {
    this.props.onApplyClick();
    this.setState({
      visible: false,
    });
  }
  render() {

    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Filter
        </Button>
        <Drawer
          title="Filter Section"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          width={720}
        >
          <RadioButtonComponent text="Has Photos " onChange={this.props.hasPhotos}/>
          <RadioButtonComponent text="In Contact " onChange={this.props.inContact}/>
          <RadioButtonComponent text="Favorite   " onChange={this.props.isFavorite}/>

          <Divider />

          <SliderComponent name="compatibility" text="Compatibility Score " sliderChange={this.props.compatibilityChange}/>
          <SliderComponent name="age" text="Age " sliderChange={this.props.ageChange}/>
          <SliderComponent name="height" text="Height " sliderChange={this.props.heightChange}/>
          <SliderComponent name="distance" text="Distance in km " sliderChange={this.props.distanceChange}/>

          <Divider />
          <Button onClick={this.onAppliyBtnClick}> Apply Filter </Button>

        </Drawer>
      </div>        
    );
  }
}

export default Filter
// ReactDOM.render(<App />, mountNode);