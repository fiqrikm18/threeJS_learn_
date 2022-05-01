import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { LinearSRGBColorSpace } from 'three'

let scene, camera, renderer, controls
init()
animate()

function init() {
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 60)
  camera.position.z = 3
  camera.position.y = 3
  camera.position.x = 3
  camera.lookAt(0, 0, 0)

  const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3)
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
  })
  const cube = new THREE.Mesh(boxGeometry, boxMaterial)
  cube.position.y += 0.3
  cube.castShadow = true
  scene.add(cube)

  const planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6fffb
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -Math.PI / 2
  plane.castShadow = true
  plane.receiveShadow = true
  scene.add(plane)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.target.position.set(0, 0, 0)
  light.position.set(5, 100, 0)
  light.castShadow = true
  scene.add(light)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
  document.body.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)

  document.addEventListener("resize", onWindowChange, false)
}

function onWindowChange() {
  camera.aspect(window.innerWidth / window.innerHeight)
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerWidth)
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function render() {
  renderer.render(scene, camera)
}