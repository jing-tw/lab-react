import React from 'react';

// Method 1
// Component MyComponent has no properties, but the current state with initvalue as {mode: 0}
class MyComponent extends React.Component {
    // Declare the class property for keep the component state
    state = {
      mode: 0,
    }

    // Declare a method for update the compoent state 
    public changeMyComponent = (intMode:number) => {
      this.setState({
          mode: intMode
      });
    };

    // View
    render() {
      return (
        <div>
          <h2>MyComponent component mode = {this.state.mode}.</h2>
        </div>
      );
    }
}

export default MyComponent;






// // Method 2
// // MyComponent has no properties, but the current state is of type MyComponentState
// // The generic parameters in the Component typing allow to pass props
// // and state. Since we don't have props, we pass an empty object.

// type MyComponentState = {
//   mode: number,
// }
// class MyComponent extends React.Component<{}, MyComponentState> {
//     // The init function sets the current state. TypeScript will let us know
//     // which ones we are allowed to set.
//     init() {
//       this.setState({
//         mode: 0
//       });
//     }

//     public changeMyComponent(intMode:number){
//       this.setState({
//         mode: intMode
//       });
//     }

//     // Before the component mounts, we initialise our state
//     componentWillMount() {
//       this.init();
//     }
  
//     render() {
//       return (
//         <div>
//           <h2>MyComponent component mode = {this.state.mode}.</h2>
//         </div>
//       );
//     }
// }

// export default MyComponent;