var canvas = document.getElementById('canvas'); //se obtiene el canvas
var estado = 0;

var scene = new THREE.Scene();
var axisHelper = new THREE.AxesHelper(1500); //se crean los ejes para facilitar todo
scene.add(axisHelper); //se añaden los ejes a la escena

var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(canvas.offsetWidth, canvas.clientHeight);

scene.background = new THREE.Color(0x111111);
var aspect = canvas.offsetWidth / canvas.clientHeight;

//cámara y posición de ella

var camera = new THREE.PerspectiveCamera(750, aspect, 1, 50000);
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

// Light

var light = new THREE.AmbientLight(0xffffff, 0.6); // soft white light
scene.add(light);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(3000, 3000, -3000);
scene.add(directionalLight);

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);
// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);
// var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
// backLight.position.set(100, 0, -100).normalize();
// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);

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
