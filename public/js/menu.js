import { DragControls } from './DragControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

var objects = [];

let k = document.querySelectorAll('ul li ul li a');

for (let i = 0; i < 3; i++) {
  k[i].addEventListener('mousedown', function () {
    event.preventDefault();
    addNewMesh(this.id);
  });
}

function addNewMesh(name) {
  // Buscar archivos con respecto al nombre
  console.log(name);

  if(name=="mueble2"){
    console.log("okay");
    var geometry = new THREE.BoxGeometry(100, 100, 100);
  var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  });
  var cube = new THREE.Mesh(geometry, material);
  //   cube.position.y = 2;
  scene.add(cube);
  objects.push(cube);
  }else{
    var mtlLoader = new MTLLoader();
    mtlLoader.load('Objetos/R2/r2-d2.mtl', (mtlParseResult) => {
    var objLoader = new OBJLoader2();
    var materials =  MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
  //   materials.Material.side = THREE.DoubleSide;
    objLoader.addMaterials(materials);
    objLoader.load('Objetos/R2/r2-d2.obj', (root) => {
      scene.add(root);
      root.position.y=100;
      objects.push(root);
    });
  });

  }

  var controlsDrag = new DragControls(
    [...objects],
    camera,
    renderer.domElement
  );

  controlsDrag.addEventListener('dragstart', () => {
    controls.enabled = false;
  });
  controlsDrag.addEventListener('drag', () => {
    render();
    objects[0].position.y = 50;
  });

  controlsDrag.addEventListener('dragend', () => {
    
    controls.enabled = true;
  });
}
