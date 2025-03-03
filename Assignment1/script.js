import * as THREE from "three"
import { OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"


/**********
** SETUP **
**********/

//sizes
 const sizes = {
    width : window.innerWidth *0.4,
    height : window.innerHeight,
    aspectRatio : window.innerWidth *0.4 / window.innerHeight
 }



/**********
** SCENE **
**********/

//Canvas
const canvas= document.querySelector('.webgl')

//Scene
const Scene = new THREE.Scene()
//Scene.background = new THREE.Color('white')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
Scene.add(camera)
camera.position.set(14,3,7.5)

//Renderer
const Renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
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
const torusGeometry = new THREE.TorusGeometry(1.5, 0.2)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(torusGeometry,torusMaterial)
torus.position.set(15,3,4)
torus.castShadow = true
Scene.add(torus)

const coneGeometry = new THREE.ConeGeometry(0.3,4,2)
const coneMaterial = new THREE.MeshNormalMaterial()
const cone = new THREE.Mesh(coneGeometry,coneMaterial)
cone.position.set(15,3,0)
cone.castShadow = true

const boxGeometry = new THREE.BoxGeometry(0.2,2,0.2)
const boxMaterial = new THREE.MeshNormalMaterial()
const box = new THREE.Mesh(boxGeometry,boxMaterial)
box.position.set(15,6,0)
box.castShadow = true






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
//Scene.add(directionalLightHelper)

/*********************
** DOM INTERACTIONS **
*********************/
const domObject = {
    part: 1,
    firstchange: false,
    secondchange: false,
    thirdchange: false,
    fourthchange: false
}
//part 1
document.querySelector('#part-one').onclick = function () {
    domObject.part = 1

}

//part 2
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2

}


//first-change
document.querySelector('#first-change').onclick =function() {
    domObject.firstchange= true
   
}
//second-change
document.querySelector('#second-change').onclick =function() {
    domObject.secondchange= true
}
//third-change
document.querySelector('#third-change').onclick =function() {
    domObject.thirdchange= true
}
//fourth-change
document.querySelector('#fourth-change').onclick =function() {
    domObject.fourthchange= true
}


/*******
** UI **
*******/

//UI
/*
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
*/


/*******************
** Animation Loop **
*******************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()


    //part-one
    if(domObject.part === 1)
    {
        camera.position.set(6,0,0)
        camera.lookAt(0,0,0)
    }

    //part-two
    if(domObject.part === 2)
    {
        camera.position.set(25,1,0)
        camera.lookAt(0,0,0)
    }

    // first-change
    if(domObject.firstchange)
    {
        torus.position.z= (Math.sin(elapsedTime))*4
    }

    // second-change
    if(domObject.secondchange)
    {
        torus.scale.x= Math.sin(elapsedTime)
        torus.scale.y= Math.sin(elapsedTime)
        torus.scale.z= Math.sin(elapsedTime)

        torus.rotation.y = Math.PI/2
    }

    // third-change
    if(domObject.thirdchange)
    {
        Scene.add(cone) 
        cone.position.z= Math.sin(elapsedTime)
    }
    //fourth-change
    if(domObject.fourthchange)
    {
        
        new THREE.Color('red')
        directionalLight.color.set('red')
        cone.rotation.x = Math.PI

        torus.scale.x= 0
        torus.scale.y= 0
        torus.scale.z= 0

        Scene.add(box)
        box.position.z= Math.sin(elapsedTime)

    }
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