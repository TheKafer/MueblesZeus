import { DragControls } from './DragControls.js';
var objects = [];

let k = document.querySelectorAll('ul li ul li a');

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

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
  });
  var cube = new THREE.Mesh(geometry, material);
  //   cube.position.y = 2;
  scene.add(cube);

  objects.push(cube);

  var controlsDrag = new DragControls(
    [...objects],
    camera,
    renderer.domElement
  );
  controlsDrag.addEventListener('drag', () => {
    render();
    controls.enabled = false;
  });

  // controlsDrag.addEventListener('dragstart', () => {
  //   console.log('dragstart');
  // });

  controlsDrag.addEventListener('dragend', () => {
    controls.enabled = true;
  });
}
