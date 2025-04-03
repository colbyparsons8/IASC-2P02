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
// sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(0.5, 0.5, 0.5)

const drawSphere = (height, params) =>
{
    //Create sphere Materail
    let material
    if(params.emissive)
    {
        material =new THREE.MeshLambertMaterial({
            emissive: new THREE.Color(params.color),
            emissiveIntensity: 200
        })
    
    }
    if(params.toon)
    {
        material = new THREE.MeshToonMaterial({
            color: new THREE.Color(params.color)
        })
    }
    if(params.basic)
    {
        material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(params.color)
        })
    }
    
    else 
    {
          material = new THREE.MeshStandardMaterial({
             color: new THREE.Color(params.color)
        })
    }


    //WireFrame Material
    if(params.wireframe)
    {
        material.wireframe = true
    }

    //create cube
    const sphere = new THREE.Mesh(sphereGeometry, material)

    // Position cube
    sphere.position.x = (Math.random()- 0.5)*params.diameter
    sphere.position.z = (Math.random()- 0.5)*params.diameter
    sphere.position.y = height - 10

    //Scale Cube
    sphere.scale.x = params.scale
    sphere.scale.y = params.scale
    sphere.scale.z = params.scale


    //Dynamic Scale
    const elapsedTime= clock.getElapsedTime();
    if(params.dynamicScale)
    {
        sphere.scale.x = height *0.2
        sphere.scale.y = height *0.2
        sphere.scale.z = height *0.2
    }

    //randomize cube roation
    if(params.randomize){
        sphere.rotation.x = Math.random() *2 *Math.PI
        sphere.rotation.z = Math.random() *2 *Math.PI
        sphere.rotation.y = Math.random() *2 *Math.PI
    }
    


    //add cube to group
    params.group.add(sphere)
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

let preset = {}

// Groups
const group1 =new THREE.Group()
Scene.add(group1)
const group2 =new THREE.Group()
Scene.add(group2)
const group3 =new THREE.Group()
Scene.add(group3)
const group4 =new THREE.Group()
Scene.add(group4)


const uiObj = {
    sourceText: "",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'adhd',
        basic: true,
        color: 'white',
        diameter: 2,
        dynamicScale: false,
        emissive: true,
        group: group1,
        nSpheres: 20,
        toon: false,
        randomize: true,
        scale: 2,
        wireframe: false
        
    },
    term2: {
        term: 'animation',
        basic: false,
        color: 'green',
        diameter: 7,
        dynamicScale: true,
        emissive: false,
        group: group2,
        nSpheres: 100,
        toon: true,
        randomize: true,
        scale: 1,
        spins: true,
        wireframe: false
    },
    term3: {
        term: 'conventional',
        basic: false,
        color: 'red',
        diameter: 5,
        dynamicScale: false,
        emissive: true,
        group: group3,
        nSpheres: 100,
        toon: false,
        randomize: false,
        scale: 1,
        wireframe: false
    },
    term4: {
        term: 'academic',
        basic: false,
        color: 'yellow',
        diameter: 12,
        dynamicScale: false,
        emissive: false,
        group: group4,
        nSpheres: 20,
        toon: false,
        randomize: true,
        scale: 1,
        wireframe: true
    },
    saveTerms() {
        saveTerms()
    },
    rotateCamera:false

}

//other words
// Conventional, cognitve, instruction, animation, performance

//ui function

const saveSourceText = () =>
{
    //ui
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    //text analysis
    tokenizeSourceText(uiObj.sourceText)

}

const saveTerms = () =>
{
    //ui
    preset = ui.save
    visualizeFolder.hide()
    cameraFolder.show()

    //testing
    /*console.log(uiObj.term1)
    console.log(uiObj.color1)
    console.log(uiObj.term2)
    console.log(uiObj.color2)
    console.log(uiObj.term3)
    console.log(uiObj.color3)*/

    //text analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
    findSearchTermInTokenizedText(uiObj.term4)
}


//text folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder  
    .add(uiObj, 'saveSourceText')
    .name("Save")

// terms, visualize, camera folders
const termsFolder = ui.addFolder("Search Terms")
const cameraFolder = ui.addFolder("Camera")
const visualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Color")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

    termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")


termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Color")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

    termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")


termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Color")

termsFolder
    .add(uiObj.term4, 'term')
    .name("Term 4")

termsFolder
    .add(group4, 'visible')
    .name("Term 4 Visibility")


termsFolder
    .addColor(uiObj.term4, 'color')
    .name("Term 4 Color")


visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable")


//terms and visualize folder hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()


/*******************
** TEXT ANALYSIST **
*******************/
//Source text


//varibles
let parsedText, tokenizedText

// Parce and Tokenize source text
const tokenizeSourceText = (sourceText) =>
{
    //strip periods and lowercase text
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // tokenize texts
    tokenizedText = parsedText.split(/[^\w']+/)
    console.log(tokenizedText)
    
}

//find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
{
    //use for loop to go through the tokenizedText array
    for (let i=0; i < tokenizedText.length; i++)
    {
        //if tokenizedText [i] matches searchTerm then a cube is drawn
        if(tokenizedText[i]=== params.term){
            // convert i into height, which is a value between 0 and 20 
            const height = (100/ tokenizedText.length) *i*0.2

            //call drawcube nCubes using height value
            for(let a =0; a< params.nSpheres; a++)
            {
                drawSphere(height, params)
            }
            
        }
    }
}


//findSearchTermInTokenizedText("big", "red")
//findSearchTermInTokenizedText("lilypad", "green")



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

    //rotate group 2
    group2.rotation.y = elapsedTime

    //spin group 3
    group3.position.x = Math.sin(elapsedTime*0.2) *10
    group3.position.z = Math.sin(elapsedTime*0.2) *10


    //Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 5
        camera.lookAt(0,0,0)
    }


    //Renderer
    Renderer.render(Scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()