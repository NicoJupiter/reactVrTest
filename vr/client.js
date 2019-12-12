// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import RCTParticles from '../views/RCTParticles'
import RCTSquareTest from '../views/RCTSquareTest'
import RCTSpherePointer from '../views/RCTSpherePointer'
import RCTBlackHole from '../views/RCTBlackHole'
import RCTMagnet from '../views/RCTMagnet'

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'appvr3', parent, {
    
    // Add custom options here
    customViews: [{
      name: 'Particles',
      view: RCTParticles,
    },
    {
      name: 'SquareTest',
      view: RCTSquareTest,
    },
    {
      name: 'SpherePointer',
      view: RCTSpherePointer,
    },
    {
      name: 'BlackHole',
      view: RCTBlackHole,
    },
    {
      name: 'Magnet',
      view: RCTMagnet,
    }],
    ...options,
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
