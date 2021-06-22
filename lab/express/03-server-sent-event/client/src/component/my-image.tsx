import React from 'react';

import redlight from './res/redlight-v3.png'
import greenlight from './res/greenlight-v3.png'

class MyImage extends React.Component {
    RED_LIGHT = {id:0, strName:'red light', strLoc: redlight};
    GREEN_LIGHT = {id:1, strName:'green light', strLoc: greenlight};

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
        default:
          alert('Invalid _id, changeLight, MyImage. _id = . Act: use Red Light as default' + _id);
          this.setState({data : this.RED_LIGHT});
      }
    };

    render() {
      return (
        <div>
          <img src={this.state.data.strLoc} ></img>
        </div>
      );
    }
}

export default MyImage;



