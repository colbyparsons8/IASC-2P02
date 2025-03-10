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
camera.position.set(0, 12, -20)

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
** LIGHTS **
***********/
//direction light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
Scene.add(directionalLight)

/***********
** MESHES **
***********/

//testsphere
// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, color) =>
{
    //Create cub Materail
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    //create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    // Position cube
    cube.position.x = (Math.random()- 0.5)*10
    cube.position.z = (Math.random()- 0.5)*10
    cube.position.y = height - 10

    //randomize cube roation
    cube.rotation.x = Math.random() *2 *Math.PI
    cube.rotation.z = Math.random() *2 *Math.PI
    cube.rotation.y = Math.random() *2 *Math.PI


    //add cube to scene

    Scene.add(cube)
}

//drawCube(1, 'yellow')
//drawCube(2,'blue')
//drawCube(3,'green')
//drawCube(4,'red')



/*******
** UI **
*******/

//UI
const ui = new dat.GUI()


/*******************
** TEXT ANALYSIST **
*******************/
//Source text
const sourceText = "There was once a frog that lived on a nice lilypad, That was all he knew. Everyday he would wake up on his lilypad and catch flys all day and slowly get big. Until one day he got so big from the flys that his lilypad started to sink. A human saw him sinking and jumped in the pond to save him, They lived happy ever after in the humans house together and he continued to get big while eating flys."

//varibles
let parsedText, tokenizedText

// Parce and Tokenize source text
const tokenizeSourceText = () =>
{
    //strip periods and lowercase text
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
    
}

//find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    //use for loop to go through the tokenizedText array
    for (let i=0; i < tokenizedText.length; i++)
    {
        //if tokenizedText [i] matches searchTerm then a cube is drawn
        if(tokenizedText[i]=== term){
            // convert i into height, which is a value between 0 and 20 
            const height = (100/ tokenizedText.length) *i*0.2

            //call drawcube 100x using height value
            for(let a =0; a<100;a++)
            {
                drawCube(height, color)
            }
            
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText("big", "red")
findSearchTermInTokenizedText("lilypad", "green")
findSearchTermInTokenizedText("flys", "black")


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