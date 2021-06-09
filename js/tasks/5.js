import * as THREE from "../../lib/three-lib.js";

const game = new function() {
    const canvas = document.querySelector('#canvas');
    const game = this
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({canvas});
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const keys = {}
    const events = {
        'keydown': null,
        'keypress': null,
        'keyup': null,
    }
    
    game.on = (eventName, processor) => {
        events[eventName] = processor
    }
    
    const callEvent = (evt, args) => {
        if (events[evt]) events[evt](args)
    }
    
    const addCube = this.addCube = (x, y, z) => {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 'gray' });
        const cube     = new THREE.Mesh(geometry, material);
        
        cube.position.set(x, y, z)
        
        scene.add(cube);
        return cube
    }
    
    game.getCamera = () => {
        return camera
    }
    
    const animate = () => {
        if (events.keydown) events.keydown(keys)
        
        renderer.render( scene, camera );
        requestAnimationFrame( animate );
    }
    
    this.init = () => {
        // document.body.appendChild( renderer.domElement );
        renderer.render(scene, camera);
        
        // размер рендера
        // renderer.setSize( window.innerWidth, window.innerHeight );
        animate();
        
        window.addEventListener('keydown', (e) => {
            keys[e.code] = true
            callEvent('keypress', keys)
        })
        
        window.addEventListener('keyup', (e) => {
            // что бы знать что клавиша была ранее нажата
            keys[e.code] = false
            callEvent('keyup', keys)
        })
    }
}

const SPPED_CAMERA = 0.05

game.init()

game.addCube(0.1, 1, 2)
game.addCube(2.1, 1, 2)

game.getCamera().position.z = 5

game.on('keydown', (keys) => {
    console.log(keys)
    if (keys.KeyA) game.getCamera().position.x += SPPED_CAMERA
    if (keys.KeyD) game.getCamera().position.x -= SPPED_CAMERA
    if (keys.KeyW) game.getCamera().position.y -= SPPED_CAMERA
    if (keys.KeyS) game.getCamera().position.y += SPPED_CAMERA
    if (keys.KeyQ) game.getCamera().position.z += SPPED_CAMERA
    if (keys.KeyE) game.getCamera().position.z -= SPPED_CAMERA
})
