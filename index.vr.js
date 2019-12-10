import React from 'react';
import TorusKnot from './class/TorusKnot'
import SquareTest from './class/SquareTest'
import Particles from './class/Particles'

import {
  AppRegistry,
  asset,
  Pano,
  DirectionalLight,
  View,
  AmbientLight,
  Animated
} from 'react-vr';


export default class appvr3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rotation: 130,
      mousePosX : 0,
      mousePosY : 0
    }
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }


  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 150
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  componentDidMount() {
    this.rotate();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  handleInput(event){
    if(event.nativeEvent.inputEvent.eventType == "mousemove") {
      console.log("x: " + event.nativeEvent.inputEvent.viewportX);
      console.log("y: " + event.nativeEvent.inputEvent.viewportY);

      this.setState({
        mousePosX: event.nativeEvent.inputEvent.viewportX,
        mousePosY: event.nativeEvent.inputEvent.viewportY
      });
    }
  
  }

  // Start animation after cursor enters element
  /* handleOnEnter = () => {
     console.log("trigger");
     Animated.timing(this.state.translationElementZ, {
       toValue:  -8,
       duration: 400,
     }).start();
   };
 
   // Reverse animation after cursor leaves element
   handleOnExit = () => {
     console.log("exit");
     Animated.timing(this.state.translationElementZ, {
       toValue:  -4,
       duration: 400,
     }).start();
   };*/

  render() {
    return (
      <View onInput={this.handleInput}>
        <Pano source={asset('oui.jpg')} />

        <DirectionalLight />

        <TorusKnot
          style={{
            transform: [
              { translate: [-4, 0.5, -8] },
              { rotateY: this.state.rotation },
              { rotateX: 20 },
              { rotateZ: -10 }],
            // color: '#ff0000'
          }
          }
        />
        <SquareTest
          style={{
            transform: [
              { translate: [4, 1, -8] },
              { rotateY: this.state.rotation },
              { rotateX: 20 },
              { rotateZ: -10 }
            ],
          }
          }
        // Add listeners as properties
        /* onEnter={this.handleOnEnter}
         onExit={this.handleOnExit}*/
        />

        <Particles
          style={{
            transform: [
              { translate: [this.state.mousePosX, this.state.mousePosY, -6] },
            ],
          }
          }
        />

      </View>
    );
  }
};

AppRegistry.registerComponent('appvr3', () => appvr3);
