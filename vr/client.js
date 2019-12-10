// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import RCTTorusKnot from '../views/RCTTorusKnot'

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'appvr3', parent, {
    
    // Add custom options here
    customViews: [{
      name: 'TorusKnot',
      view: RCTTorusKnot,
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
