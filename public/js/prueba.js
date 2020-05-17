//// Con Cubo
var geometry = new THREE.BoxGeometry(3000, 1500, 3000);
var cubeMaterials = [
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0xffffff,
    shininess: 5,
    side: THREE.BackSide,
  }), // Right
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0xffffff,
    shininess: 5,
    side: THREE.BackSide,
  }), // Left
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0xffffff,
    shininess: 5,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  }), // Top
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0xffffff,
    shininess: 5,
    side: THREE.BackSide,
  }), // Bottom
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0xffffff,
    shininess: 5,
    side: THREE.BackSide,
  }), // Front
  new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0xffffff,
    shininess: 5,
    side: THREE.BackSide,
  }), // Back
];
var experimental = new THREE.Mesh(geometry, cubeMaterials);
experimental.position.set(0, 1500 / 2, 0);
// scene.add(experimental);

//// Crear el propio mesh
// var geometry = new THREE.Geometry();
// geometry.vertices.push(
//   new THREE.Vector3(-1500, 0, -1500),
//   new THREE.Vector3(-1500, 0, 1500),
//   new THREE.Vector3(1500, 0, -1500),
//   new THREE.Vector3(1500, 0, 1500)
// );
// geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(3, 2, 1));
// geometry.computeBoundingSphere();
// var material = new THREE.MeshPhongMaterial({
//   color: 0x00ff00,
//   specular: 0xffffff,
//   shininess: 5,
//   // side: THREE.DoubleSide,
// });
// var plane = new THREE.Mesh(geometry, material);
// scene.add(plane);

///// Con Varios planos
var largo = 3000;

var geometryPiso = new THREE.PlaneGeometry(largo, largo, 1, 1);
var geometryPared = new THREE.PlaneGeometry(largo, largo / 2, 1, 1);
var materialPlane = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  specular: 0xffffff,
  shininess: 5,
  // side: THREE.DoubleSide,
});
var plane1 = new THREE.Mesh(geometryPiso, materialPlane);
plane1.rotation.set(THREE.Math.degToRad(-90), 0, 0);
scene.add(plane1);

var plane2 = new THREE.Mesh(geometryPared, materialPlane);
plane2.position.set(0, largo / 4, -largo / 2);
scene.add(plane2);

var plane3 = new THREE.Mesh(geometryPared, materialPlane);
plane3.rotation.set(0, THREE.Math.degToRad(-90), 0);
plane3.position.set(largo / 2, largo / 4, 0);
scene.add(plane3);

var plane4 = new THREE.Mesh(geometryPared, materialPlane);
plane4.rotation.set(0, THREE.Math.degToRad(90), 0);
plane4.position.set(-largo / 2, largo / 4, 0);
scene.add(plane4);

var plane5 = new THREE.Mesh(geometryPared, materialPlane);
plane5.rotation.set(0, THREE.Math.degToRad(180), 0);
plane5.position.set(0, largo / 4, largo / 2);
scene.add(plane5);
