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

//se crea un cuadro que representa la pared
var geometry2 = new THREE.BoxGeometry( 3000, 2000,10 );
var material2= new THREE.MeshBasicMaterial( {color: 0xf4ffe3} );
var cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.set(0,990, -1500);
scene.add( cube2 );

//se crea cámara con perspectiva
var camera = new THREE.PerspectiveCamera( 75*10, window.innerWidth/window.innerHeight, 0.1*10, 1000*10 );
camera.position.set(1000,1000,1000);


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//se crean los controles
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableKeys = true;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector3();

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
         
    });

});

var mtlIphone = new THREE.MTLLoader();
mtlIphone.setTexturePath('./Objetos/iphoneX/');
mtlIphone.setPath('./Objetos/iphoneX/');
mtlIphone.load('iphone_seceond_version_finished.mtl', function (materials) {

    materials.preload();

    var iphoneobjLoader = new THREE.OBJLoader();
    iphoneobjLoader.setMaterials(materials);
    iphoneobjLoader.setPath('./Objetos/iphoneX/');
    iphoneobjLoader.load('Iphone seceond version finished.obj', function (object1) {
        scene.add(object1);
        object1.position.y = 50;
        object1.position.x = 0;
        object1.position.z = -110;
        object1.scale.set(0.5, 0.5, 0.5);

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();