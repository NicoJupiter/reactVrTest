import React from 'react';
import TorusKnot from './class/TorusKnot'
import SquareTest from './class/SquareTest'
import SpherePointer from './class/SpherePointer'

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
      squarePosX : 4,
      spherePosX : 0,
      spherePosY : 0,
      spherePosZ : -50,
      lastPosX : 0,
      isMovingSphere: true,
      scaleSquare : 1
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
      rotation: this.state.rotation + delta / 50
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
    var eventInput = event.nativeEvent.inputEvent

    if(eventInput.eventType == "keydown" && eventInput.key == "t") {
      this.setState({
        isMovingSphere : !this.state.isMovingSphere
      });
    }

    if(this.state.isMovingSphere) {
      if(eventInput.eventType == "keydown" && eventInput.key == "ArrowUp") {
        console.log("keyup")
        this.setState({
          spherePosZ : this.state.spherePosZ -1
        });
      }
  
      if(eventInput.eventType == "keydown" && eventInput.key == "ArrowDown") {
        console.log("keydown")
        this.setState({
          spherePosZ : this.state.spherePosZ +1
        });
      }
  
      var lastPosition = this.state.lastPosX;
      if(eventInput.eventType == "mousemove" && eventInput.buttons == 0) {
     
        this.setState({
          spherePosX: eventInput.viewportX - lastPosition,
          spherePosY: eventInput.viewportY,
          lastPosX : 0
          
        });
  
      } else {
        this.setState({
          lastPosX : eventInput.viewportX - this.state.spherePosX,
        });
      }
    }
  
  }

  // Start animation after cursor enters element
   handleOnEnter = () => {
    this.setState({
      scaleSquare : 2
    });
   };
 
   // Reverse animation after cursor leaves element
   handleOnExit = () => {
    this.setState({
      scaleSquare : 1
    });
   };

  render() {

    return (
      <View onInput={this.handleInput}>
        <Pano source={asset('test.jpg')} />

        <DirectionalLight />

        <TorusKnot
          style={{
            transform: [
              { translate: [-4, 0.5, -8] },
              { rotateY: this.state.rotation },
              { rotateX: this.state.rotation },
              { rotateZ: -10 }],
             color: '#ffffcc'
          }
          }
        />
       <SquareTest
        style={{
          transform: [
            { translate: [4, 1, -8] },
            { rotateY: this.state.rotation },
            { rotateX: 20 },
            { rotateZ: -10 },
            {scaleX : this.state.scaleSquare },
            {scaleY : this.state.scaleSquare }],
        }}
          // Add listeners as properties
          onEnter={this.handleOnEnter}
          onExit={this.handleOnExit}
      />
       <SquareTest
        style={{
          transform: [
            { translate: [7, 1, -8] },
            { rotateY: this.state.rotation },
            { rotateX: 20 },
            { rotateZ: -10 }
          ],
        }
        }
      />
       <SquareTest
        style={{
          transform: [
            { translate: [10, 1, -8] },
            { rotateY: this.state.rotation },
            { rotateX: 20 },
            { rotateZ: -10 }
          ],
        }
        }
      />
       <SquareTest
        style={{
          transform: [
            { translate: [13, 1, -8] },
            { rotateY: this.state.rotation },
            { rotateX: 20 },
            { rotateZ: -10 }
          ],
        }
        }
      />
        <SpherePointer
          style={{
            transform: [
              { translate: [this.state.spherePosX* 8, this.state.spherePosY * 3, this.state.spherePosZ] }
            ],
          }
          }
        />

      </View>
    );
  }
};

AppRegistry.registerComponent('appvr3', () => appvr3);
