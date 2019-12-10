import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import merge from 'react-vr-web/js/Utils/merge';

class RCTParticles extends ReactVR.RCTBaseView {

    constructor(guiSys) {
        super();
        this.mesh = null;
        this.view = new OVRUI.UIView(guiSys);
        this.setMesh();

    }

    setMesh() {
     
        const geometry = new THREE.SphereGeometry(1,64,64);

        const material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);

        this.view.add(this.mesh);
    }

}

export default RCTParticles