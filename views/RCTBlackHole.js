import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import merge from 'react-vr-web/js/Utils/merge';


class RCTBlackHole extends ReactVR.RCTBaseView {
  constructor(guiSys) {
    super();
    this.mesh = null;

    // All objects of custom View need to be
    // added to view object
    this.view = new OVRUI.UIView(guiSys);

    this.setMesh();

  }


  // Set particles mesh and add it to view object
  setMesh() {
    
  }

  static describe() {
    return merge(super.describe(), {
      // Declare the native props sent from react to runtime
      NativeProps: {},
    });
  }
}


export default RCTBlackHole;