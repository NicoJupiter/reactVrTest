import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import merge from 'react-vr-web/js/Utils/merge';

class RCTSpherePointer extends ReactVR.RCTBaseView {

    constructor(guiSys) {
        super();
        this.mesh = null;
        this.view = new OVRUI.UIView(guiSys);
        this.setMesh();

    }

    setMesh() {
     
       const geometry = new THREE.SphereGeometry(10,32,32);
       // let geometry = new THREE.TorusGeometry(10, 3, 16, 100)
     
        //const material = new THREE.MeshNormalMaterial();

        let material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.25 })
        this.mesh = new THREE.Points(geometry, material)
      
        //this.mesh = new THREE.Mesh(geometry, material);

        this.view.add(this.mesh);
    }

}

export default RCTSpherePointer