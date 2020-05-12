// let m = document.getElementById('mueble2');
// m.addEventListener('mousedown');
// console.log(m);

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
}
