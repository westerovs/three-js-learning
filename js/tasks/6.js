import * as THREE from "../../lib/three-lib.js";

console.log('Task VI')

class Game {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.scene    = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.camera   = new THREE.PerspectiveCamera(
            75,
            this.canvas.offsetWidth / this.canvas.offsetHeight,
            0.1,
            1000
        );
        this.speedCamera = 0.05
        
        this.objKeys = {}
        this.gameBtns = {
            keydown: null,
            keyup: null,
        }
        
        this.MOUSE_BUTTONS = ['left', 'middle', 'right']
        this.gameMouse = {
            position: { x: 0, y: 0 },
            speed: { x: 0, y: 0 },
            locked: false,
            mouseKeys: {
                left: false,
                right: false,
                middle: false,
                wheel: 0
            }
        }
    }
    
    gameEventListener = (eventName, processor) => {
        this.gameBtns[eventName] = processor
    }
    
    getCamera = () => {
        // return this.camera.position.set(x, y, z)
        return this.camera
    }
    
    createCube = (x, y, z, color = 'gray') => {
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({ color })
        const cube     = new THREE.Mesh(geometry, material)
      
        cube.position.set(x, y, z)
        this.scene.add(cube)
        return cube
    }
    
    animate = () => {
        if (this.gameBtns.keydown) this.gameBtns.keydown(this.objKeys)
        
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }
    
    initCaptureKeys = (settings) => {
        if (settings.captureKeys) {
            this.gameEventListener('keydown', (event) => {
                if (event.KeyA) game.getCamera().translateX(this.speedCamera)
                if (event.KeyS) game.getCamera().translateY(this.speedCamera)
                if (event.KeyQ) game.getCamera().translateZ(this.speedCamera)
            
                if (event.KeyW) game.getCamera().translateY(-this.speedCamera)
                if (event.KeyD) game.getCamera().translateX(-this.speedCamera)
                if (event.KeyE) game.getCamera().translateZ(-this.speedCamera)
            })
        
            window.addEventListener('keydown', (event) => {
                this.objKeys[event.code] = true
            })
        
            window.addEventListener('keyup', (event) => {
                // что бы знать что клавиша была ранее нажата
                this.objKeys[event.code] = false
            })
        }
    }
    
    initCaptureMouse = (settings) => {
        window.addEventListener('contextmenu', (event) => event.preventDefault())
    
        if (settings.captureMouse) {
            window.addEventListener('mouseup', (event) => {
                event.preventDefault()
                this.gameMouse.mouseKeys[this.MOUSE_BUTTONS[event.button]] = false
            })
            window.addEventListener('mousedown', (event) => {
                event.preventDefault()
                this.gameMouse.mouseKeys[this.MOUSE_BUTTONS[event.button]] = true
            })
            
            window.addEventListener('mousemove', (event) => {
                this.getCamera().rotateX(this.gameMouse.speed.x -= 0.00001)
                this.getCamera().rotateY(this.gameMouse.speed.y -= 0.00001)
            })
        }
    }
    
    init = (settings) => {
        this.renderer.render(this.scene, this.camera);
    
        this.animate()
        this.getCamera()
        this.getCamera().position.z = 3

        this.initCaptureKeys(settings)
        this.initCaptureMouse(settings)
    
    }
}

const game = new Game()
game.init({
    captureKeys: true,
    captureMouse: true,
})

game.createCube(-1.2, 0, 0)
game.createCube(1.2, 0, 0)
game.createCube(0, 0, 0, '#202124')
game.createCube(0, 1, 0, '#202124')
