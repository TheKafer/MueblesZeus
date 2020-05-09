var objects=[];// en este array se guardan los objetos (muebles=objetos interactivos)
//escena
var scene = new THREE.Scene();//se crea la escena
var axisHelper = new THREE.AxisHelper( 1500 );//se crean los ejes para facilitar todo
scene.add( axisHelper );//se añaden los ejes a la escena

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

//se crea cámara con perspectiva
var camera = new THREE.PerspectiveCamera( 75*10, window.innerWidth/window.innerHeight, 0.1*10, 1000*10 );
camera.position.set(1000,1000,1000);

//canvas
const canvas = document.querySelector('#c');
var renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//se crean los controles
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableKeys = true;

//se crean las luces de ambiente etc
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);
var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mouse = new THREE.Vector2();//es necesario para seleccionar los objetos

//las siguientes líneas de código se utilizan para cargar el .obj y sus texturas
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('./Objetos/R2/');
mtlLoader.setPath('./Objetos/R2/');
mtlLoader.load('r2-d2.mtl', function (materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./Objetos/R2/');
    objLoader.load('r2-d2.obj', function (object) {
        scene.add(object);
        object.position.x -= 0;
        object.position.y -=0;
        object.position.z -= 0;
        objects.push(object);       
    });
});

const pickPosition = {x: 0, y: 0};
const pickHelper = new PickHelper();
clearPickPosition();

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(time) {
  time *= 0.001;  // convert to seconds;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  controls.update();
  pickHelper.pick(pickPosition, scene, camera, time);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
  requestAnimationFrame(render);

  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width  / rect.width,
      y: (event.clientY - rect.top ) * canvas.height / rect.height,
    };
  }

  function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
    pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y

  }

  function clearPickPosition() {
    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }
  window.addEventListener('click', setPickPosition);
  window.addEventListener('mouseout', clearPickPosition);
  window.addEventListener('mouseleave', clearPickPosition);
  window.addEventListener('touchstart', (event) => {
    event.preventDefault();
    setPickPosition(event.touches[0]);
  }, {passive: false});
  window.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
  });
  window.addEventListener('touchend', clearPickPosition);

