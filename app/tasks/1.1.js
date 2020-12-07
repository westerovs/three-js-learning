const canvas = document.querySelector('#canvas')
const renderer = new THREE.WebGLRenderer({canvas})

const fov         = 90  // поле зрения в градусах (field of view, поле зрения)
const aspect      = 1   // соотношение сторон холста
const near        = 0.1 // пространство перед камерой
const far         = 5   // пространство перед камерой
const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 2

// Все, что вы хотите нарисовать необходимо добавить на сцену
const scene = new THREE.Scene()

// BoxGeometry который содержит данные для прямоугольного параллелепипеда.
// Почти все, что мы хотим отобразить в Three.js, нуждается в геометрии,
// которая определяет вершины нашего трехмерного объекта.
const boxWidth  = 1
const boxHeight = 1
const boxDepth  = 1
const geometry  = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

// Направленные источники имеет положение и цель. Оба по умолчанию равны 0, 0, 0
const color = 0xFFFFFF
const intensity = 2
const light = new THREE.DirectionalLight(color, intensity)
light.position.set(-1, 2, 4)
scene.add(light)

function createCube(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color: 0xFF7B1C})

    // создаем полигональную сетку Mesh.
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube) // добавляем Mesh на сцену
    cube.position.x = x

    return cube
}

const cubes = [
    createCube(geometry, 0x44aa88, 0),
    createCube(geometry, 0x8844aa, -1.5),
    createCube(geometry, 0xaa8844, 1.5),
]

// отрендерить сцену, вызвав функцию render рендерера передав ей сцену и камеру.
renderer.render(scene, camera)

function render(time) {
    time *= 0.001  // конвертировать время в секунды

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1
        const rot = time * speed
        cube.rotation.x = Math.sin(rot)
        cube.rotation.y = Math.sin(rot)
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
}

render()


