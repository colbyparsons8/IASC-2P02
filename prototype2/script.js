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
Scene.background = new THREE.Color('grey')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
Scene.add(camera)
camera.position.set(-2,3,-5)

//Renderer
const Renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
Renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/***********
** MESHES **
***********/

//box
const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshNormalMaterial()
const box =new THREE.Mesh(boxGeometry, boxMaterial)

Scene.add(box)

//Plane
const planeGeometry= new THREE.PlaneGeometry(10,10,50,50)
const planeMaterial= new THREE.MeshBasicMaterial({
    color: new THREE.Color('blue'),
    side: THREE.DoubleSide,
    wireframe: true

})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

Scene.add(plane)


/*******
** UI **
*******/

//UI
const ui = new dat.GUI()

//UI Object
const uiObject = {
    speed: 1,
    distance: 1,
}

//Plane UI
const planeFolder = ui.addFolder ('Plane')

planeFolder
    .add(planeMaterial, 'wireframe')
    .name("Toggle Wireframe")

//testSphere UI
const boxFolder = ui.addFolder( 'BOX' )

boxFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')

boxFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')





/*******************
** Animation Loop **
*******************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()

    //Anitmate ring
    box.position.y =Math.sin(elapsedTime * uiObject.speed) * uiObject.distance
    box.position.x = Math.sin(elapsedTime)
    
    // Update OrbitControls
    controls.update()

    //Renderer
    Renderer.render(Scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()