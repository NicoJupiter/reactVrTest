import React from 'react';
import Particles from './class/Particles'
import SquareTest from './class/SquareTest'
import SpherePointer from './class/SpherePointer'
import BlackHole from './class/BlackHole'
import Magnet from './class/Magnet'

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
      spherePos: {x: -50, y:-60, z:50},
      blackHolePos : {x: 4 , y: 0, z: -4},
      magnetPos : {x: 0, y: 1, z:-8},
      isMovingSphere: true,
      scaleSquare : 1,
    }
    this.lastUpdate = Date.now();
    //for get this in methods
    this.rotate = this.rotate.bind(this);
    this.moveSphere = this.moveSphere.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  //rotation method
  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 50
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  moveSphere()
  {
    console.log(this.state.spherePos);
  
   
   var numberx = this.state.spherePos.x + (this.state.blackHolePos.x - this.state.spherePos.x) * 0.05;
   var numbery = this.state.spherePos.y + (this.state.blackHolePos.y - this.state.spherePos.y) * 0.05;
   var numberz = this.state.spherePos.z + (this.state.blackHolePos.z - this.state.spherePos.z) * 0.05;
 
   var roundx = Math.round(numberx * 1000) / 1000;
   var roundy = Math.round(numbery * 1000) / 1000;
   var roundz = Math.round(numberz * 1000) / 1000
   /* if(Math.round(numberx * 1000) / 1000 > this.state.blackHolePos.x + 0.01) {
      
    }*/

    if(this.state.spherePos.x !== roundx && this.state.spherePos.y !== roundy && this.state.spherePos.z !== roundz) {
      this.setState({
        spherePos: {
          x: roundx,
          y: roundy,
          z: roundz
        }
      });
      requestAnimationFrame(this.moveSphere);
    } else {
      console.log("stop");
      cancelAnimationFrame(this.moveSphere);
    }
  }


  
  componentDidMount() {
    this.rotate();
    this.moveSphere();

  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  //method for moving sphere
  handleInput(event){

    var eventInput = event.nativeEvent.inputEvent

    if(eventInput.eventType == "keydown" && eventInput.key == "t") {
      this.setState({
        isMovingSphere : !this.state.isMovingSphere
      });
    }

    if(this.state.isMovingSphere && eventInput.eventType !== "mousemove") {
  
      if(eventInput.eventType == "keydown" && eventInput.key == "ArrowUp") {
   
        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z -1
          }
        });

      }

      if(eventInput.eventType == "keydown" && eventInput.key == "ArrowDown") {
   
        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z +1
          }
        });

      }
  
      if(eventInput.eventType == "keydown" && eventInput.key == "ArrowLeft") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x -1,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z
          }
        });
      }

      if(eventInput.eventType == "keydown" && eventInput.key == "ArrowRight") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x +1,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z
          }
        });
      }

      if(eventInput.eventType == "keydown" && eventInput.key == "1") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y -1,
            z: this.state.spherePos.z
          }
        });
      }

      if(eventInput.eventType == "keydown" && eventInput.key == "2") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y +1,
            z: this.state.spherePos.z
          }
        });
      }

      var dist = this.getDistance3d(this.state.spherePos, this.state.blackHolePos);

    }

  
  
  }

 getDistance3d(vertex1, vertex2) {
    var xfactor = vertex2.x - vertex1.x;
    var yfactor = vertex2.y - vertex1.y;
    var zfactor = vertex2.z - vertex1.z;
    return Math.sqrt( (xfactor*xfactor) + (yfactor*yfactor) + (zfactor*zfactor) );
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

        <Particles
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
            { translate: [2, 1, -8] },
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
            { translate: [5, 1, -8] },
            { rotateY: this.state.rotation },
            { rotateX:  this.state.rotation },
            { rotateZ: -10 }
          ],
        }
        }
      />
       <SquareTest
        style={{
          transform: [
            { translate: [7, 1, -6] },
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
            { translate: [10, 1, -4] },
            { rotateY: this.state.rotation },
            { rotateX:  this.state.rotation },
            { rotateZ: -10 }
          ],
        }
        }
      />
        <SpherePointer
            style={{
              transform: [
                { translate: [-24, 1, -30] }
              ],
            }
            }
        />

        <BlackHole 
        style={{
          transform: [
            { translate: [this.state.blackHolePos.x, this.state.blackHolePos.y, this.state.blackHolePos.z] },
   
          ]
        }}
        />

        <Magnet
         style={{
          transform: [
            { translate: [this.state.spherePos.x, this.state.spherePos.y, this.state.spherePos.z] }
          ],
        }
        }
        />


      </View>
    );
  }
};

AppRegistry.registerComponent('appvr3', () => appvr3);
