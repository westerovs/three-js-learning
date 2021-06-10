import * as THREE from '../../lib/three-lib.js';

console.log('Task IV')

/*
    ИЕРАРХИЯ ОТОБРАЖЕНИЯ:

    __________РЕНДЕРЕР__________
    ↓                          ↓
 камера                   ___сцена___
                          ↓         ↓
       [источники света...]     ___[меши...]___
                                ↓             ↓
                        геометрия             ______материал______
                                              ↓         ↓        ↓
                                       текстуры       цвета      правила отображения
*/

const canvas = document.querySelector('#canvas')
const width  = canvas.offsetWidth
const height = canvas.offsetHeight

const renderer = new THREE.WebGLRenderer({ canvas })
const scene    = new THREE.Scene()
const camera   = new THREE.PerspectiveCamera(45, width / height, 1, 5000)

// настройки
renderer.setClearColor(0x434323)
camera.position.set(0, 0, 330)

function createSphere() {
    const sphere   = new THREE.SphereGeometry(100, 20, 20, 40)
    const material = new THREE.MeshBasicMaterial()
    const mesh     = new THREE.Mesh(sphere, material)
    // const light    = new THREE.AmbientLight({ color: 0x000000 })

    scene.add(mesh)
}

createSphere()

renderer.render(scene, camera)












// 2
/*
const renderer = new THREE.WebGLRenderer({canvas})
const scene    = new THREE.Scene()
const camera   = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000)


renderer.setClearColor(0x393485)

function sphere() {
    const geometry = new THREE.SphereGeometry(100, 10, 10)
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors})
    const mesh     = new THREE.Mesh(geometry, material)
    const light    = new THREE.AmbientLight(0x888765)

    scene.add(mesh, light)
}

sphere()

camera.position.set(0, 0, 1000)
renderer.render(scene, camera)
*
* */




//
// const canvas = document.querySelector('#canvas')
// const width  = canvas.offsetWidth
// const height = canvas.offsetHeight

// const renderer = new THREE.WebGLRenderer({canvas}) // указываем куда выводить
// const scene    = new THREE.Scene()
// const camera   = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000)
// const light    = new THREE.AmbientLight(0xffffff)       // создать рассеянный свет
// const geometry = new THREE.SphereGeometry(200, 12, 12)
//
// const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors}) // цвет граней
// const mesh     = new THREE.Mesh(geometry, material)
//
//
// //установки
// renderer.setClearColor(0x5F4256)       // цвет пространства
// camera.position.set(0, 0, 1000)
// scene.add(light, mesh)
//

// задать цвет для граней (vertexColors)
// for (let i = 0; i < geometry.faces.length; i++) {
//     geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
// }


// let speed = 0
//
// function loop() {
//     speed += 1
//
//     mesh.rotation.y += Math.PI / 1000

    // renderer.render(scene, camera)         // запуск рендера
//     requestAnimationFrame(loop)
// }
//
// loop()
