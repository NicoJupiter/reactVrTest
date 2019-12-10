import React from 'react';
import TorusKnot from './class/TorusKnot'

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

  constructor(props){
    super(props);
    this.state = {
      rotation : 130
    }
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
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
      <View>
        <Pano source={asset('oui.jpg')}/>

        <AmbientLight intensity={2.6} />

        <TorusKnot
          style={{
            transform: [
              {translate:[-4.5,1,-8]},
              { rotateY: this.state.rotation },
              { rotateX: 20 },
              { rotateZ: -10 }],
            
            //color: '#FFB6C1'
          }
        }
           // Add listeners as properties
          /* onEnter={this.handleOnEnter}
           onExit={this.handleOnExit}*/
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('appvr3', () => appvr3);
