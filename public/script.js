var canvas = document.getElementById('canvas'); //se obtiene el canvas
var estado = 0;

var scene = new THREE.Scene();
var axisHelper = new THREE.AxesHelper(1500); //se crean los ejes para facilitar todo
scene.add(axisHelper); //se añaden los ejes a la escena

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvas.offsetWidth, canvas.clientHeight);

scene.background = new THREE.Color(0x111111);
var aspect = canvas.offsetWidth / canvas.clientHeight;

//cámara y posición de ella

var camera = new THREE.PerspectiveCamera(750, aspect, 0.1, 50000);
canvas.appendChild(renderer.domElement);
camera.position.set(2000, 2000, 2000);

// Resize
window.addEventListener('resize', () => {
  var width = canvas.offsetWidth;
  var height = canvas.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
// camera.lookAt(new THREE.Vector3(1000,0,0));
// controls.target=new THREE.Vector3(1000,0,0);

// Shadows
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
// renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// Light
var light = new THREE.AmbientLight(0xffffff, 0.3); // soft white light
scene.add(light);

// var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8, 100);
// directionalLight.position.set(-3000, 3000, 3000);
// directionalLight.castShadow = true; // default false
// scene.add(directionalLight);

var pointLight = new THREE.PointLight(0xffffff, 1, 10000);
pointLight.position.set(-1500, 1500, 1500);
pointLight.castShadow = true;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5000;
scene.add(pointLight);

// draw scene
var render = () => {
  controls.update();
  renderer.render(scene, camera);
};

// run game Loop ( update, render, repeat )
var GameLoop = () => {
  requestAnimationFrame(GameLoop);
  render();
};

GameLoop();
