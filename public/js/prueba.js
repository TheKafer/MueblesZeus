//// Con Cubo

const loader = new THREE.TextureLoader();
const texture = loader.load('Objects/textures/2.jpg');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
texture.repeat.set(5, 5);

//se crea un cuadro que representa la pared
const texture2 = loader.load('Objects/textures/3.jpg');

texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;
texture2.magFilter = THREE.NearestFilter;
texture2.repeat.set(10, 5);

var materialPared = new THREE.MeshPhongMaterial({
  map: texture2,
  // bumpMap: texture2,
  // normalMap: texture2,
  specular: 0xffffff,
  shininess: 5,
});

var largo = 1000;

var geometryPiso = new THREE.PlaneGeometry(largo, largo, 5, 5);
var geometryPared = new THREE.PlaneGeometry(largo, largo / 2, 5, 5);
var materialPiso = new THREE.MeshPhongMaterial({
  specular: 0xffffff,
  shininess: 3,
  map: texture,
  // bumpMap: texture,
  // normalMap: texture,
});
var plane1 = new THREE.Mesh(geometryPiso, materialPiso);
plane1.rotation.set(THREE.Math.degToRad(-90), 0, 0);
// plane1.castShadow = true;
plane1.receiveShadow = true;
scene.add(plane1);

var plane2 = new THREE.Mesh(geometryPared, materialPared);
plane2.position.set(0, largo / 4, -largo / 2);
// plane2.castShadow = true;
plane2.receiveShadow = true;
scene.add(plane2);

var plane3 = new THREE.Mesh(geometryPared, materialPared);
plane3.rotation.set(0, THREE.Math.degToRad(-90), 0);
plane3.position.set(largo / 2, largo / 4, 0);
// plane3.castShadow = true;
plane3.receiveShadow = true;
scene.add(plane3);

var plane4 = new THREE.Mesh(geometryPared, materialPared);
plane4.rotation.set(0, THREE.Math.degToRad(90), 0);
plane4.position.set(-largo / 2, largo / 4, 0);
// plane4.castShadow = true;
plane4.receiveShadow = true;
scene.add(plane4);

var plane5 = new THREE.Mesh(geometryPared, materialPared);
plane5.rotation.set(0, THREE.Math.degToRad(180), 0);
plane5.position.set(0, largo / 4, largo / 2);
// plane5.castShadow = true;
plane5.receiveShadow = true;
scene.add(plane5);

// var geometryS = new THREE.SphereGeometry(50, 32, 32);
// var materialS = new THREE.MeshPhongMaterial({
//   color: 0x00ff00,
//   specular: 0xffffff,
//   shininess: 7,
//   side: THREE.DoubleSide,
// });
// var sphere = new THREE.Mesh(geometryS, materialS);
// sphere.position.set(0, 100, 0);
// sphere.castShadow = true;
// // sphere.receiveShadow = true;
// scene.add(sphere);

// var plane6 = new THREE.Mesh(new THREE.PlaneGeometry(200, 200, 5, 5), materialS);
// plane6.rotation.set(THREE.Math.degToRad(90), 0, 0);
// // plane6.position.set(0, largo / 4, largo / 2);
// // plane6.castShadow = true;
// plane6.receiveShadow = true;
// plane6.position.set(0, 50, 0);

// scene.add(plane6);
