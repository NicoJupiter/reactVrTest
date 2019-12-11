import * as ReactVR from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import merge from 'react-vr-web/js/Utils/merge';


class RCTParticles extends ReactVR.RCTBaseView {
  constructor(guiSys) {
    super();
    this.mesh = null;

    // All objects of custom View need to be
    // added to view object
    this.view = new OVRUI.UIView(guiSys);

    this.setMesh();

    // Watch for changes of 'color' property
    // in 'styles' property and updated color
    Object.defineProperty(
      this.style,
      'color',
      {
        set: this.setColor,
      }
    );

  }

  // Update torus material color
  setColor = (color) => {
    if (color === null) {
      this.mesh.material.color.setHex(0xffffff);
    } else {
      this.mesh.material.color.setHex(color);
    }
  };

  // Set particles mesh and add it to view object
  setMesh() {

    //type of element
    //const geometry = new THREE.TorusGeometry(1, 3, 16, 100);
    const geometry = new THREE.Geometry();
    var x, y, z;
    //settings point in random place
    for (i = 0; i < 2000; i++) {
      x = (Math.random() * 800) - 400;
      y = (Math.random() * 800) - 400;
      z = (Math.random() * 800) - 400;

      geometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    //color/texture
    const material = new THREE.PointsMaterial({
      color: 0xffffcc,
      size: 3,
      map: THREE.ImageUtils.loadTexture(
       "../static_assets/particle.png"
      ),
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    // this.mesh = new THREE.Mesh(geometry, material);
    //this.mesh = new THREE.PointCloud(geometry, material);
    this.mesh = new THREE.Points(geometry, material);
    this.view.add(this.mesh);
  }

  static describe() {
    return merge(super.describe(), {
      // Declare the native props sent from react to runtime
      NativeProps: {},
    });
  }
}


export default RCTParticles;