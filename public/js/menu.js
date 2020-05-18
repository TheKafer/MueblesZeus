import { DragControls } from './Controls/DragControls.js';
var objects = [];
var angulo = 0;
var objetoSeleccionado = undefined;
var posicionx=0;
var posicionz=0;
var cube;
var material = new THREE.MeshBasicMaterial({ color: 0xecff00 }); //color
var geometry = new THREE.BoxGeometry(100, 2, 100); //geometría
cube = new THREE.Mesh(geometry, material);

var k = document.querySelectorAll('ul li ul li a');

for (let i = 0; i < k.length; i++) {
  k[i].addEventListener('click', function () {
    event.preventDefault();
    addNewMesh(this.id);
  });
}

function addNewMesh(name) {
  // Buscar archivos con respecto al nombre
  console.log(name);
  new MTLLoader(manager)
    .setPath('Objects/' + name + '/')
    .load(name + '.mtl', function (materials) {
      materials.preload();

      new OBJLoader(manager)
        .setMaterials(materials)
        .setPath('Objects/' + name + '/')
        .load(
          name + '.obj',
          function (object) {
            // var escalas=[];
            // for(let i=0;i<transformaciones.length;i++){
            //   if(transformaciones[i].name==name){
            //     escalas=transformaciones[i];
            //   }
            // }
            // console.log(escalas);
            // object.scale.set(escalas.escalaX,escalas.escalaY,escalas.escalaZ);
            // object.rotateX(THREE.Math.degToRad(escalas.rotacionx));
            // object.rotateY(THREE.Math.degToRad(escalas.rotaciony));
            // object.rotateZ(THREE.Math.degToRad(escalas.rotacionz));
            // object.position.set(escalas.posicionx,escalas.posiciony,escalas.posicionz);

            // object.rotate.set(THREE.Math.degToRad(escalas.rotacionx),THREE.Math.degToRad(escalas.rotaciony),THREE.Math.degToRad(escalas.rotacionz));

            scene.add(object);
            objects.push(object);
          },
          onProgress,
          onError
        );
    });
}

var controlsDrag = new DragControls(objects, camera, renderer.domElement);

controlsDrag.addEventListener('dragstart', function (event) {
  objetoSeleccionado = event.object;
  posicionx=event.object.posicionx;
  posicionz=event.object.posicionz;
  if (estado == 0) {
    camera.position.set(event.object.position.x, 3000, event.object.position.z);
    camera.lookAt(
      new THREE.Vector3(event.object.position.x, 0, event.object.position.z)
    );
    controls.target = new THREE.Vector3(
      event.object.position.x,
      0,
      event.object.position.z
    );
    controls.enabled = false;
  }

  if (estado == 1) {
    // event.object.scale.set(0,0,0);
    // var index=objects.indexOf(event.object);
    // objects.splice(index,1);
    event.object.scale.set(0, 0, 0);
    // scene.remove(event.object);
    // event.object.geometry.dispose();
    // event.object.material.dispose();
    // console.log('delete');
    // GameLoop();
  }

  if (estado == 2) {
    controlsDrag.enabled = false;
  }
});

controlsDrag.addEventListener('drag', function (event) {
  if (estado == 0) {
    event.object.position.y = 0;
    // let geometry = new THREE.BoxGeometry( event.object.scale.x, 2, event.object.scale.z );//geometría
    if(event.object.position.x+event.object.scale.x<500 && event.object.position.x-event.object.scale.x/2>-500){
      cube.material.color.setHex(0xecff00 );
      cube.scale.x = event.object.scale.x;
      cube.scale.z = event.object.scale.z;
      cube.position.set(event.object.position.x, 0, event.object.position.z); //posición en la escena
      scene.add(cube); //se añade
    }else{
      cube.scale.x = event.object.scale.x;
      cube.scale.z = event.object.scale.z;
      cube.material.color.setHex( 0xffffff );
      cube.position.set(event.object.position.x, 0, event.object.position.z); //posición en la escena
      scene.add(cube); //se añade
    }
  }
});

controlsDrag.addEventListener('dragend', function (event) {
  if (estado == 0) {
    if(event.object.position.x+event.object.scale.x<500 && event.object.position.x-event.object.scale.x/2>-500){
    controls.enabled = true;
    event.object.position.y = 0;
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    controls.target = new THREE.Vector3(0, 0, 0);
    scene.remove(cube);
    scene.remove(event.object);
    }
  }
  if (estado == 2) {
    controlsDrag.enabled = true;
  }
});

import { DDSLoader } from './Loaders/DDSLoader.js';
import { MTLLoader } from './Loaders/MTLLoader.js';
import { OBJLoader } from './Loaders/OBJLoader.js';

var onProgress = function (xhr) {
  // if (xhr.lengthComputable) {
  //   var percentComplete = (xhr.loaded / xhr.total) * 100;
  //   console.log(Math.round(percentComplete, 2) + '% downloaded');
  // }
};

var onError = function () {};

var manager = new THREE.LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader());

document.addEventListener('keypress', logKey);

function logKey(e) {
  if (e.key == 'a') {
    if (estado == 2) {
      if (objetoSeleccionado != undefined) {
        objetoSeleccionado.rotateY(THREE.Math.degToRad(1));
      }
    }
  }
  if (e.key == 'd') {
    if (estado == 2) {
      if (objetoSeleccionado != undefined) {
        objetoSeleccionado.rotateY(THREE.Math.degToRad(-1));
      }
    }
  }
}

// comment in the following line and import TGALoader if your asset uses TGA textures
// manager.addHandler( /\.tga$/i, new TGALoader() );
