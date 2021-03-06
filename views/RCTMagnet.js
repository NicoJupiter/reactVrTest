import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import merge from 'react-vr-web/js/Utils/merge';



class RCTMagnet extends ReactVR.RCTBaseView {
    constructor(guiSys) {
        super();
        this.magnets = [];
        
        this.test = ""
        // All objects of custom View need to be
        // added to view object
        this.view = new OVRUI.UIView(guiSys);
        this.addSphere = this.addSphere.bind(this);

        this.setMesh();

    }

    // Set particles mesh and add it to view object
    setMesh() {

        this.addSphere();
        
    }


    addSphere() {
        var radius = 0.50, segments = 30 * 3, rings = 30 * 3;
        var geometry = new THREE.SphereGeometry(radius, segments, rings);

        var material = new THREE.MeshPhongMaterial({ color: 0xff69b4, opacity: 1 });
    
        this.mesh = new THREE.Mesh(geometry, material);
        this.view.add(this.mesh);

    }

 

    static describe() {
        return merge(super.describe(), {
            // Declare the native props sent from react to runtime
            NativeProps: {blabla: this.test},
        });
    }
}


export default RCTMagnet;