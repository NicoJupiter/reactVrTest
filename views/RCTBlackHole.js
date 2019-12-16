import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import merge from 'react-vr-web/js/Utils/merge';



class RCTBlackHole extends ReactVR.RCTBaseView {
    constructor(guiSys) {
        super();
        this.mesh = null;
        this.sphere = null;
        this.magnets = [];
        this.mainGroup = null;

        // All objects of custom View need to be
        // added to view object
        this.view = new OVRUI.UIView(guiSys);

        this.setMesh();

    }


    // Set particles mesh and add it to view object
    setMesh() {

        this.addSphere();
    }


    addSphere() {
        this.mainGroup = new THREE.Object3D();

        var radius = 2, segments = 30 * 3, rings = 30 * 3;
        var geometry = new THREE.SphereGeometry(radius, segments, rings);
        geometry.dynamic = true;

        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, opacity: 1 });
        this.sphere = new THREE.Mesh(geometry, material);
        this.sphere.dynamic = true;
        
        this.sphere.doubleSided = true;
        this.mainGroup.add(this.sphere);

        this.view.add(this.mainGroup);
    }

 

    static describe() {
        return merge(super.describe(), {
            // Declare the native props sent from react to runtime
            NativeProps: {},
        });
    }
}


export default RCTBlackHole;