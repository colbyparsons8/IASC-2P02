import * as THREE from "three"
import { OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"


/**********
** SETUP **
**********/

//sizes
 const sizes = {
    width : window.innerWidth,
    height : window.innerHeight,
    aspectRatio : window.innerWidth / window.innerHeight
 }



/**********
** SCENE **
**********/

//Canvas
const canvas= document.querySelector('.webgl')

//Scene
const Scene = new THREE.Scene()
Scene.background = new THREE.Color('black')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
Scene.add(camera)
camera.position.set(10,2,7.5)

//Renderer
const Renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
Renderer.setSize(sizes.width, sizes.height)
Renderer.shadowMap.enabled = true
Renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/***********
** MESHES **
***********/

//Cave
const caveGeometry = new THREE.PlaneGeometry(15.5,7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true

Scene.add(cave);

//Objects
/*const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(6,1,0)
torusKnot.castShadow = true
Scene.add(torusKnot)*/

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
sphere.position.set(6,3,3)
sphere.castShadow = true
Scene.add(sphere)

const eyeGeometry = new THREE.SphereGeometry(1)
const eyeMaterial = new THREE.MeshNormalMaterial()
const eye = new THREE.Mesh(eyeGeometry,eyeMaterial)
eye.position.set(6,3,-1)
eye.castShadow = true
Scene.add(eye)

const smileGeometry = new THREE.BoxGeometry(1,1,7)
const smileMaterial = new THREE.MeshNormalMaterial()
const smile = new THREE.Mesh(smileGeometry,smileMaterial)
smile.position.set(6,0,1)
smile.castShadow = true
Scene.add(smile)


/***********
** Lights **
***********/
//Ambiant Light
//const ambientLight = new THREE.AmbientLight(0x404040)

//const ambientLight = new THREE.AmbientLight(
 //   new THREE.Color('white')
//)

//Scene.add(ambientLight)

//Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
Scene.add(directionalLight)
directionalLight.position.set(20,4.1,0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
Scene.add(directionalLightHelper)


/*******
** UI **
*******/

//UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')
lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')



/*******************
** Animation Loop **
*******************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()

    //Animate Objects
    //torusKnot.rotation.y = elapsedTime

    // Update DirectionalLightHelper
    directionalLightHelper.update
    
    // Update OrbitControls
    controls.update()

    //Renderer
    Renderer.render(Scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()