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
      spherePos: { x: -50, y: -60, z: 50 },
      blackHolePos: { x: 0, y: 0, z: -4 },
      magnetPos: { x: 0, y: 1, z: -8 },
      isMovingSphere: true,
      scaleSquare: 1,
    }
    this.magnets = [];

    this.lastUpdate = Date.now();
    //for get this in methods
    this.rotate = this.rotate.bind(this);
    this.magneticForce = this.magneticForce.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.generateMagnet = this.generateMagnet.bind(this);
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

  magneticForce() {

    this.magnets.map((vector, index) => {

    
      var numberx = vector.x + (this.state.blackHolePos.x - vector.x) * 0.05;
      var numbery = vector.y + (this.state.blackHolePos.y - vector.y) * 0.05;
      var numberz = vector.z + (this.state.blackHolePos.z - vector.z) * 0.05;

      var roundx = Math.round(numberx * 1000) / 1000;
      var roundy = Math.round(numbery * 1000) / 1000;
      var roundz = Math.round(numberz * 1000) / 1000

      if (vector.x !== roundx && vector.y !== roundy && vector.z !== roundz) {
      
        this.magnets[index] = {x:roundx, y:roundy,z:roundz}
        requestAnimationFrame(this.magneticForce);
 
      } else {
        console.log("stop");
        cancelAnimationFrame(this.magneticForce);
      }

    })
  }

  componentDidMount() {
    this.rotate();
    this.generateMagnet();
 
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  //method for moving sphere
  handleInput(event) {

    var eventInput = event.nativeEvent.inputEvent

   
    if (eventInput.eventType == "keydown" && eventInput.key == "t") {
      this.setState({
        isMovingSphere: !this.state.isMovingSphere
      });
    }

    if (eventInput.eventType == "keydown" && eventInput.key == "Enter") {

      this.magneticForce();
      //this.magnets.map((item, i) => this.magneticForce(item, i));
    }
    

    if (this.state.isMovingSphere && eventInput.eventType !== "mousemove") {

      if (eventInput.eventType == "keydown" && eventInput.key == "ArrowUp") {

        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z - 1
          }
        });

      }

      if (eventInput.eventType == "keydown" && eventInput.key == "ArrowDown") {

        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z + 1
          }
        });

      }

      if (eventInput.eventType == "keydown" && eventInput.key == "ArrowLeft") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x - 1,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z
          }
        });
      }

      if (eventInput.eventType == "keydown" && eventInput.key == "ArrowRight") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x + 1,
            y: this.state.spherePos.y,
            z: this.state.spherePos.z
          }
        });
      }

      if (eventInput.eventType == "keydown" && eventInput.key == "1") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y - 1,
            z: this.state.spherePos.z
          }
        });
      }

      if (eventInput.eventType == "keydown" && eventInput.key == "2") {
        console.log("keydown")
        this.setState({
          spherePos: {
            x: this.state.spherePos.x,
            y: this.state.spherePos.y + 1,
            z: this.state.spherePos.z
          }
        });
      }

      //  var dist = this.getDistance3d(this.state.spherePos, this.state.blackHolePos);

    }



  }

  getDistance3d(vertex1, vertex2) {
    var xfactor = vertex2.x - vertex1.x;
    var yfactor = vertex2.y - vertex1.y;
    var zfactor = vertex2.z - vertex1.z;
    return Math.sqrt((xfactor * xfactor) + (yfactor * yfactor) + (zfactor * zfactor));
  }


  // Start animation after cursor enters element
  handleOnEnter = () => {
    this.setState({
      scaleSquare: 2
    });
  };

  // Reverse animation after cursor leaves element
  handleOnExit = () => {
    this.setState({
      scaleSquare: 1
    });
  };

  generateMagnet() {

    var magnetsArray = [];
    var x, y, z;
    //settings point in random place
    for (i = 0; i < 5; i++) {
      x = (Math.random() * 200) - 100;
      y = (Math.random() * 200) - 100;
      z = (Math.random() * 200) - 100;

      magnetsArray.push({x:x,y:y,z:z})

    }

    this.magnets = magnetsArray;

  }

  render() {

   // var isOk;

    //this.state.magnets.length == 200 ?  isOk = true :  isOk = false;
  
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
              { scaleX: this.state.scaleSquare },
              { scaleY: this.state.scaleSquare }],
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
              { rotateX: this.state.rotation },
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
              { rotateX: this.state.rotation },
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

    { this.magnets.length > 0  ? 
       this.magnets.map((item,i) => 
       <Magnet key={i} 
       style={{
         transform: [
           { translate:[item.x, item.y,item.z]}
          ]
        }} />)
    : null }

      </View>
    );
  }
};

AppRegistry.registerComponent('appvr3', () => appvr3);
