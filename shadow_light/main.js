import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let camera, scene, renderer, controls

function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.position.set(0, 0, -50)

  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.innerWidth / window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
}

function setControl() {
  controls = new OrbitControls(camera, renderer.domElement)
}

function setObject() {
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  )
  plane.rotation.x = -Math.PI / 2
  plane.castShadow = true
  plane.receiveShadow = true
  plane.position.set(0, -10, 0)
  scene.add(plane)

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({ color: 0xffbbff })
  )
  box.castShadow = true
  box.position.set(0, -5, 0)
  scene.add(box)

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.target.position.set(0, 0, 0)
  light.position.set(0, 50, 0)
  light.castShadow = true
  light.receiveShadow = true
  scene.add(light)
}

function onWindowSizeChange() {
  render.setSize(window.innerWidth, window.innerHeight)
}

function render() {
  document.body.appendChild(renderer.domElement)
  document.addEventListener('resize', onWindowSizeChange, false)

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function start() {
  init()
  setObject()
  setControl()
  animate()
}

start()
