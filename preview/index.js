//import js
import * as THREE from 'https://unpkg.com/three@0.150.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.150.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.150.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const loader = new GLTFLoader();
loader.load('assets/Scene.glb', function (gltf) // load a glTF resource
{ 
    const root = gltf.scene;
    root.scale.set(0.3, 0.3, 0.3);
    root.name = 'ayaka6';
    scene.add(root);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.log('An error occurred');
});

const light = new THREE.DirectionalLight(0xFFFFFF, 2);
light.position.set(0, 2, 0);
scene.add(light);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

//camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 1, 5);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ // create a renderer
    canvas: canvas,
    antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;
renderer.autoClear = false; // disable automatic clearing of the canvas

//ORBITCONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 5;
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;


function resizeRenderer() {
    // set renderer size based on the canvas dimensions
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // set the camera's aspect ratio based on the canvas dimensions
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
}

//resize bende
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    //render();
}

//animate
function animate() {
    requestAnimationFrame(animate);

    //get current time
    const time = performance.now() * 0.001;

    //rotate the 3D model
    const root = scene.getObjectByName('ayaka6');
    if (root) {
        root.rotation.y = time * 0.05;
    }

    //update the controls
    controls.update();

    //manually clear the canvas
    renderer.clear();

    //render the scene
    renderer.render(scene, camera);
}

resizeRenderer();
animate();
