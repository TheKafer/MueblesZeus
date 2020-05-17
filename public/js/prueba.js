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
scene.add(experimental);

// geometry = new THREE.SphereGeometry(50, 30, 30);
// var material = new THREE.MeshPhongMaterial({
//   color: 0x00ff00,
//   specular: 0xffffff,
//   shininess: 5,
// });
// var sphere = new THREE.Mesh(geometry, material);
// sphere.position.set(0, 50, 0);
// scene.add(sphere);

var geometry = new THREE.PlaneGeometry(1000, 1500, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.BackSide,
  //   wireframe: true,
});
var plane = new THREE.Mesh(geometry, material);
plane.position.set(0, 1500 / 2, 0);
scene.add(plane);
