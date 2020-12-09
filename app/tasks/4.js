console.log('Запущено: Лаврик - работа со сценой')
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
import * as THREE from '../three-lib.js';

const canvas   = document.querySelector('#canvas')
const width    = canvas.offsetWidth
const height   = canvas.offsetHeight

const renderer = new THREE.WebGLRenderer({canvas}) // указываем куда выводить
const scene    = new THREE.Scene()
const camera   = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000)
const light    = new THREE.AmbientLight(0xffffff)       // создать рассеянный свет
const geometry = new THREE.SphereGeometry(200, 12, 12)

const material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors}) // цвет граней
const mesh     = new THREE.Mesh(geometry, material)

//установки
renderer.setClearColor(0x5F4256)       // цвет пространства
camera.position.set(0, 0, 1000)
scene.add(light, mesh)

// задать цвет для граней (vertexColors)
for (let i = 0; i < geometry.faces.length; i++) {
    geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random())
}

let speed = 0
function loop() {
    speed += 1

    mesh.rotation.y += Math.PI / 1000
    
    renderer.render(scene, camera)         // запуск рендера
    requestAnimationFrame(loop)
}

loop()
