import React from 'react';

import redlight from './res/redlight-v3.png'
import greenlight from './res/greenlight-v3.png'
import yellowlight from './res/yellowlight-v3.png'
class MyClassComp extends React.Component {
    RED_LIGHT = {id:0, strName:'red light', imgSrc: redlight};
    GREEN_LIGHT = {id:1, strName:'green light', imgSrc: greenlight};
    Yellow_LIGHT = {id:1, strName:'yellow light', imgSrc: yellowlight};

    state = {
      data : this.RED_LIGHT,
    }

    public changeLight = (_id:number) => {
      switch(_id){
        case 0:
          this.setState({data : this.RED_LIGHT});
          break;
        case 1: 
          this.setState({data : this.GREEN_LIGHT});
          break;
        case 2: 
          this.setState({data : this.Yellow_LIGHT});
          break;
        default:
          alert('Invalid _id, changeLight, MyClassComp. _id = . Act: use Red Light as default' + _id);
          this.setState({data : this.RED_LIGHT});
      }
    };

    render() {
      return (
        <div>
          <img src={this.state.data.imgSrc} ></img>
        </div>
      );
    }
}

export default MyClassComp;



