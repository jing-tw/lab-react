import React from 'react';

import greenlight from './res/greenlight-v3.png'
import yellowlight from './res/yellowlight-v3.png'
import redlight from './res/redlight-v3.png'

class MyImage extends React.Component {
    GREEN_LIGHT = {id:0, strName:'green light', strLoc: greenlight};
    YELLOW_LIGHT = {id:1, strName:'yellow light', strLoc: yellowlight};
    RED_LIGHT = {id:2, strName:'red light', strLoc: redlight};

    state = {
      data : this.RED_LIGHT,
    }

    public changeLight = (_id:number) => {
      switch(_id){
        case 0: 
          this.setState({data : this.GREEN_LIGHT});
          break;
        case 1:
          this.setState({data : this.YELLOW_LIGHT})
          break;
        case 2:
          this.setState({data : this.RED_LIGHT});
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



