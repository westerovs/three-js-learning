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
        this.gameEvents = {
            'keydown': null,
            'keyup': null,
        }
    }
    
    gameEventListener = (eventName, processor) => {
        this.gameEvents[eventName] = processor
    }
    
    getCamera = (x= 0, y= 1, z = 3) => {
        return this.camera.position.set(x, y, z)
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
        if (this.gameEvents.keydown) this.gameEvents.keydown(this.objKeys)
        
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

    init = () => {
        this.renderer.render(this.scene, this.camera);
    
        this.animate()
        this.getCamera()

        this.gameEventListener('keydown', (event) => {
            if (event.KeyA) game.getCamera().position.x += this.speedCamera
            if (event.KeyD) game.getCamera().position.x -= this.speedCamera
            if (event.KeyW) game.getCamera().position.y -= this.speedCamera
            if (event.KeyS) game.getCamera().position.y += this.speedCamera
            if (event.KeyQ) game.getCamera().position.z += this.speedCamera
            if (event.KeyE) game.getCamera().position.z -= this.speedCamera
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

const game = new Game()
game.init()
game.createCube(-1.2, 0, 0)
game.createCube(1.2, 0, 0)
game.createCube(0, 0, 0, '#202124')
game.createCube(0, 1, 0, '#202124')
