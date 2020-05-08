var objects=[];

//se crea la escena
var scene = new THREE.Scene();

//se crean los ejes para facilitar todo
var axisHelper = new THREE.AxisHelper( 1500 );
scene.add( axisHelper );


//se crea un cuadrado que representa el piso
var geometry = new THREE.BoxGeometry( 3000, 10, 3000 );
var material = new THREE.MeshBasicMaterial( {color: 0xf4efee} );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,-10,0);
scene.add( cube );
objects.push(cube);

//se crea un cuadro que representa la pared
var geometry2 = new THREE.BoxGeometry( 3000, 2000,10 );
var material2= new THREE.MeshBasicMaterial( {color: 0xf4ffe3} );
var cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.set(0,990, -1500);
scene.add( cube2 );
objects.push(cube2);

//se crea cámara con perspectiva
var camera = new THREE.PerspectiveCamera( 75*10, window.innerWidth/window.innerHeight, 0.1*10, 1000*10 );
camera.position.set(1000,1000,1000);

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


var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

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



var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

var mouse = new THREE.Vector2();

class PickHelper {
    constructor() {
      this.raycaster = new THREE.Raycaster();
      this.pickedObject = null;
 
    }
    pick(normalizedPosition, scene, camera, time) {
      
      // restore the color if there is a picked object
      if (this.pickedObject) {
        this.pickedObject.scale.set(1,1,1)
        this.pickedObject = undefined;
      }
      
      
      // cast a ray through the frustum
      this.raycaster.setFromCamera(normalizedPosition, camera);
      // get the list of objects the ray intersected
      var intersects = this.raycaster.intersectObjects(objects, true); 
      if (intersects.length > 0) {
        this.pickedObject = intersects[0].object;
        this.pickedObject.scale.set(2,2,2);
    
      }
    }
  }

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
    // unlike the mouse which always has a position
    // if the user stops touching the screen we want
    // to stop picking. For now we just pick a value
    // unlikely to pick something
    pickPosition.x = -100000;
    pickPosition.y = -100000;
  }
  window.addEventListener('click', setPickPosition);
  window.addEventListener('mouseout', clearPickPosition);
  window.addEventListener('mouseleave', clearPickPosition);

  window.addEventListener('touchstart', (event) => {
    // prevent the window from scrolling
    event.preventDefault();
    setPickPosition(event.touches[0]);
  }, {passive: false});

  window.addEventListener('touchmove', (event) => {
    setPickPosition(event.touches[0]);
  });

  window.addEventListener('touchend', clearPickPosition);
animate();
