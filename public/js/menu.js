import { DragControls } from './DragControls.js';
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/OBJLoader2.js';
import {MTLLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

<<<<<<< Updated upstream
var objects = [];
=======
// new MTLLoader(manager)
// .setPath('Objects/room/')
// .load('EmptyRoom(OBJ).mtl', function (materials) {
//   materials.preload();

//   new OBJLoader(manager)
//     .setMaterials(materials)
//     .setPath('Objects/room/')
//     .load(
//       'EmptyRoom(OBJ).obj',
//       function (object) {
//         object.scale.set(100,100,100);
//         scene.add(object);
//       },
//       onProgress,
//       onError
//     );
// });

var k = document.querySelectorAll('ul li ul li a');
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
  new MTLLoader(manager)
    .setPath('Objects/R2/')
    .load('r2-d2.mtl', function (materials) {
      materials.preload();

      new OBJLoader(manager)
        .setMaterials(materials)
        .setPath('Objects/R2/')
        .load(
          'r2-d2.obj',
          function (object) {
            scene.add(object);
            objects.push(object);

            var controlsDrag = new DragControls(
              [...objects],
              camera,
              renderer.domElement
            );

            controlsDrag.addEventListener( 'dragstart', function ( event ) {
              camera.position.set(event.object.position.x,3000,event.object.position.z);
              camera.lookAt(new THREE.Vector3(event.object.position.x,0,event.object.position.z));
              controls.target=new THREE.Vector3(event.object.position.x,0,event.object.position.z);
              controls.enabled = false; 
            } );

            controlsDrag.addEventListener( 'drag', function ( event ) {
              event.object.position.y=0;
            } );

            controlsDrag.addEventListener( 'dragend', function ( event ) {
              controls.enabled = true;
              event.object.position.y=0;
              camera.position.set(2000,2000,2000);
              camera.lookAt(new THREE.Vector3(0,0,0));
              controls.target=new THREE.Vector3(0,0,0);
            } );

          },
          onProgress,
          onError
        );
    });
}


import { DDSLoader } from './Loaders/DDSLoader.js';
import { MTLLoader } from './Loaders/MTLLoader.js';
import { OBJLoader } from './Loaders/OBJLoader.js';
>>>>>>> Stashed changes

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
