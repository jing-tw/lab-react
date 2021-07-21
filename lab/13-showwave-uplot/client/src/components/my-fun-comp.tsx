import React from 'react';

import redlight from './res/redlight-v3.png'
import greenlight from './res/greenlight-v3.png'
import yellowlight from './res/yellowlight-v3.png'

function MyFunComp(props:{id:number}): JSX.Element {
  console.log('MyFunComp:' + JSON.stringify(props));

  let imgSrc:string;
  switch(props.id){
    case 0:
      imgSrc = redlight; break;
    case 1:
      imgSrc = greenlight; break;
    case 2:
      imgSrc = yellowlight; break;
    default:
      imgSrc = redlight; break;
  }

  return(<div><img src={imgSrc} height="100" width="50"></img></div>);
}
export default MyFunComp;



