var canvas = document.getElementById('canvas');

var scene = new THREE.Scene();//se crea la escena
var axisHelper = new THREE.AxesHelper( 1500 );//se crean los ejes para facilitar todo
scene.add( axisHelper );//se añaden los ejes a la escena

var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(canvas.offsetWidth, canvas.clientHeight);

scene.background = new THREE.Color(0x111111);
var aspect = canvas.offsetWidth / canvas.clientHeight;

var camera = new THREE.PerspectiveCamera(75*10, aspect, 0.1*10, 1000*10);
canvas.appendChild(renderer.domElement);
camera.position.set(1000,1000,1000);

//se crea un cuadrado que representa el piso
var geometry = new THREE.BoxGeometry( 3000, 10, 3000 );//geometría
var material = new THREE.MeshBasicMaterial( {color: 0xf4efee} );//color
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,-10,0);//posición en la escena
scene.add( cube );//se añade

//se crea un cuadro que representa la pared
var geometry2 = new THREE.BoxGeometry( 3000, 2000,10 );//geometría
var material2= new THREE.MeshBasicMaterial( {color: 0xf4ffe3} );//color
var cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.set(0,990, -1500);//posición en la escena
scene.add( cube2 );//se añade

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

// Light
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


// draw scene
var render = () => {
  renderer.render(scene, camera);
};

// run game Loop ( update, render, repeat )
var GameLoop = () => {
  requestAnimationFrame(GameLoop);
  
  render();
};

GameLoop();
