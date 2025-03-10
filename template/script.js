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

//Resizing
window.addEventListener('resize', () => 
{
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // update camera
    camera.aspect = sizes. aspectRatio
    camera.updateProjectionMatrix()

    //update renderer
    Renderer.setSize(sizes.width, sizes.height)
    Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0,0,5)

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

//testsphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere =new THREE.Mesh(sphereGeometry, sphereMaterial)

Scene.add(testSphere)


/*******
** UI **
*******/

//UI
const ui = new dat.GUI()



/*******************
** Animation Loop **
*******************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()
    
    // Update OrbitControls
    controls.update()

    //Renderer
    Renderer.render(Scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()