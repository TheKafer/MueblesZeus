import { Group, ObjectLoader  } from 'three';
import MODEL from './flower.json';

import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';

export default class Flower extends Group {
  constructor() {
    const loader = new ObjectLoader();
    
    super();

    this.name = 'flower';

    const x = OBJLoader(THREE);
    const y = new THREE.OBJLoader();

    console.log(y.load)

    loader.load(MODEL, (mesh)=>{
      this.add(mesh);
    });
  }
}