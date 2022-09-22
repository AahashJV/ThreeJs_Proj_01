import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometry2 = new THREE.PlaneGeometry(1,1,1)
const material = new THREE.MeshStandardMaterial({ color: 0xfffff })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y = 1
const planeMesh = new THREE.Mesh(geometry2, material)
planeMesh.scale.set(10,10,10)
planeMesh.rotation.x = -Math.PI*.5
scene.add(planeMesh,)

//shadow
// mesh.castShadow = true
planeMesh.receiveShadow = true

//lights
const light = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(light)
const pointLight = new THREE.PointLight(0xffffff,1)
pointLight.position.x = 2
pointLight.position.y = 6
pointLight.position.z = 2
pointLight.castShadow = true
scene.add(pointLight)
//Model
const gltfLoader = new GLTFLoader()
gltfLoader.load(
    '/spidy.glb',
    (gltf) =>
    {
        const model = gltf.scene
        // console.log(gltf)
        scene.add(model)
        model.traverse(function(node){
            if(node.isMesh)
                node.castShadow=true
        })
    }
    
)


// Sizes
const sizes = {
    width: 500,
    height: 400
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
camera.position.y =2
scene.add(camera)

//controls
const controls = new OrbitControls(camera, document.querySelector('canvas.webgl'))
controls.enableDamping = true
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled=true

//Render Seq
function tick()
{
    // ...

    // Update controls
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

    // ...
}
tick()