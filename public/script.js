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
camera.position.set(1000, 1000, 1000);

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
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
// renderer.shadowMapSoft = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;

// Light
var alight = new THREE.AmbientLight(0xffffff, 0.8); // soft white light
scene.add(alight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight.name = 'Dir. Light';
dirLight.position.set(-500, 500, 500);
dirLight.castShadow = true;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 1500;
dirLight.shadow.camera.right = 1000;
dirLight.shadow.camera.left = -1000;
dirLight.shadow.camera.top = 1000;
dirLight.shadow.camera.bottom = -1000;
dirLight.shadow.mapSize.width = 3072;
dirLight.shadow.mapSize.height = 3072;
// scene.add(dirLight);
// scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight2.name = 'Dir. Light';
dirLight2.position.set(500, 500, -500);
dirLight2.castShadow = true;
dirLight2.shadow.camera.near = 1;
dirLight2.shadow.camera.far = 1500;
dirLight2.shadow.camera.right = 1000;
dirLight2.shadow.camera.left = -1000;
dirLight2.shadow.camera.top = 1000;
dirLight2.shadow.camera.bottom = -1000;
dirLight2.shadow.mapSize.width = 3072;
dirLight2.shadow.mapSize.height = 3072;
scene.add(dirLight2);
// scene.add(new THREE.CameraHelper(dirLight2.shadow.camera));

// var spotLight = new THREE.SpotLight(0xffffff);
// spotLight.name = 'Spot Light';
// spotLight.angle = Math.PI / 5;
// spotLight.penumbra = 0.3;
// spotLight.position.set(-500, 500, 0);
// spotLight.castShadow = true;
// spotLight.shadow.camera.near = 8;
// spotLight.shadow.camera.far = 3000;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// scene.add(spotLight);

// scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

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
