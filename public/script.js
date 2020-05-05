var scene = new THREE.Scene()
scene.background = new THREE.Color(0x111111)
var aspect = window.innerWidth / window.innerHeight
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 5

// Resize
window.addEventListener('resize', () => {
  var width = window.innerWidth
  var height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
})

// Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement)

// create objects
var geometry1 = new THREE.BoxGeometry(1, 1, 1)
var material1 = new THREE.MeshNormalMaterial()
var cube = new THREE.Mesh(geometry1, material1)
cube.position.x = 2
scene.add(cube)

var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
})
var cube = new THREE.Mesh(geometry, material)
cube.position.y = 2
scene.add(cube)

// Light
var ambientLight = new THREE.AmbientLight(0xffffff, 5.0)
scene.add(ambientLight)

// game logic
var update = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}

// draw scene
var render = () => {
  renderer.render(scene, camera)
}

// run game Loop ( update, render, repeat )
var GameLoop = () => {
  requestAnimationFrame(GameLoop)
  update()
  render()
}

GameLoop()
