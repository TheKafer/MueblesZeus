import { DragControls } from './Controls/DragControls.js';
var objects = [];
var angulo=0;
var objetoSeleccionado;

var cube;
var material = new THREE.MeshBasicMaterial( {color: 0xECFF00 } );//color
var geometry = new THREE.BoxGeometry( 100, 2, 100 );//geometría
cube = new THREE.Mesh(geometry, material );
var k = document.querySelectorAll('ul li ul li a');



for (let i = 0; i < 3; i++) {
  k[i].addEventListener('mousedown', function () {
    event.preventDefault();
    addNewMesh(this.id);
  });
}

function addNewMesh(name) {
  // Buscar archivos con respecto al nombre
  console.log(name);

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
              if(estado==0){
                camera.position.set(event.object.position.x,3000,event.object.position.z);
                camera.lookAt(new THREE.Vector3(event.object.position.x,0,event.object.position.z));
                controls.target=new THREE.Vector3(event.object.position.x,0,event.object.position.z);
                controls.enabled = false;
                event.object.rotation.x = THREE.Math.degToRad( angulo );
              }

              if(estado==1){
                event.object.scale.set(0,0,0);
              }
              
            } );

            controlsDrag.addEventListener( 'drag', function ( event ) {   
              if(estado==0){   
                event.object.position.y=0;
                // let geometry = new THREE.BoxGeometry( event.object.scale.x, 2, event.object.scale.z );//geometría
                cube.scale.x=event.object.scale.x;
                cube.scale.z=event.object.scale.z;
                cube.position.set( event.object.position.x,0, event.object.position.z);//posición en la escena
                scene.add( cube );//se añade  
              }    
            } );

            controlsDrag.addEventListener( 'dragend', function ( event ) { 
              if(estado==0){
                controls.enabled = true;
                event.object.position.y=0;
                camera.position.set(2000,2000,2000);
                camera.lookAt(new THREE.Vector3(0,0,0));
                controls.target=new THREE.Vector3(0,0,0);
                scene.remove(cube);
                scene.remove(event.object);
              }
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

var onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = (xhr.loaded / xhr.total) * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};

var onError = function () {};

var manager = new THREE.LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader());

// comment in the following line and import TGALoader if your asset uses TGA textures
// manager.addHandler( /\.tga$/i, new TGALoader() );
