import { DragControls } from './DragControls.js';
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

  var geometry = new THREE.BoxGeometry(100, 100, 100);
  var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  });
  var cube = new THREE.Mesh(geometry, material);
  cube.position.y = 50;
  scene.add(cube);

  objects.push(cube);

  var controlsDrag = new DragControls(
    [...objects],
    camera,
    renderer.domElement
  );

  controlsDrag.addEventListener('dragstart', () => {
    controls.enabled = false;
  });
  // controlsDrag.addEventListener('drag', (event) => {
    
    
  // });
 
 
  controlsDrag.addEventListener('dragend', () => {
    objects[0].position.y = 50;
    controls.enabled = true;
  });
}
