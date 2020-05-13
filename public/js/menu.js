import { DragControls } from './Controls/DragControls.js';
var objects = [];

var k = document.querySelectorAll('ul li ul li a');

// for (let i of k) {
//   console.log(i.id);
// }

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
            //   object.position.y = -95;
            scene.add(object);
            objects.push(object);

            controlsDrag = new DragControls(
              [...objects],
              camera,
              renderer.domElement
            );
            controlsDrag.addEventListener('drag', () => {
              render();
              controls.enabled = false;
            });
            controlsDrag.addEventListener('dragend', () => {
              controls.enabled = true;
            });
          },
          onProgress,
          onError
        );
    });
}

var controlsDrag = new DragControls([...objects], camera, renderer.domElement);
controlsDrag.addEventListener('drag', () => {
  render();
  controls.enabled = false;
});
controlsDrag.addEventListener('dragend', () => {
  controls.enabled = true;
});

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
