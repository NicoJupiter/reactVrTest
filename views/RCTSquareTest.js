import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

import merge from 'react-vr-web/js/Utils/merge';

class RCTTorusKnot extends ReactVR.RCTBaseView {
  constructor(guiSys) {
    super();
    this.mesh = null;

    // All objects of custom View need to be
    // added to view object
    this.view = new OVRUI.UIView(guiSys);

    this.setMesh();
      
  }



  // Set torus knot mesh and add it to view object
  setMesh() {

    const geometry = new THREE.BoxGeometry(2,2,2);

    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.Mesh(geometry, material);

    this.view.add(this.mesh);
  }

  static describe() {
    return merge(super.describe(), {
      // Declare the native props sent from react to runtime
      NativeProps: {},
    });
  }
}


export default RCTTorusKnot;