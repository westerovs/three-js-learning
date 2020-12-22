console.log('Запущено: Лаврик - постановка сцены')
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
import * as THREE from '../../lib/three-lib.js';

const canvas   = document.querySelector('#canvas')
const width    = canvas.offsetWidth
const height   = canvas.offsetHeight

const renderer = new THREE.WebGLRenderer({canvas}) // указываем куда выводить
const scene    = new THREE.Scene()
const camera   = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000)
const light    = new THREE.AmbientLight(0xffffff)       // создать рассеянный свет
// const geometry = new THREE.PlaneGeometry(600, 600, 12, 12)
const geometry = new THREE.SphereGeometry(200, 12, 12)

const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true})
const mesh     = new THREE.Mesh(geometry, material)

//установки
renderer.setClearColor(0x5F4256)       // цвет пространства
camera.position.set(0, 0, 1000)
scene.add(light, mesh)


renderer.render(scene, camera)         // запуск рендера
