import React from 'react';
import redlight from './res/redlight.svg'

class MyImage extends React.Component {
    render() {
      return (
        <div>
          <img src={redlight}></img>
        </div>
      );
    }
}

export default MyImage;



