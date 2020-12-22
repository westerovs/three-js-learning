import * as THREE from '../../lib/three-lib.js';

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 0);
    // lookAt Функция будет ориентировать камеру из своего положения в "смотриНа точку переданную lookAt
    camera.up.set(0, 0, 1); // x, y, z -- 0, 0, 1 - смотри вверх
    camera.lookAt(0, 0, 0); // x, y, z

    const scene = new THREE.Scene();

    // массив объектов, направление которых обновляется
    const objects = [];

    // использовать только одну сферу для всего
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereBufferGeometry(
        radius, widthSegments, heightSegments
    );

    // свойство материала "Затенение по Фонгу"
    // Phong - это цвет, который будет рисоваться без попадания света на поверхность.
    // Свет добавляется к этому цвету.
    const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);

    sunMesh.scale.set(5, 5, 5); // // сделать солнце большим
    scene.add(sunMesh);
    objects.push(sunMesh);

    // источник света
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);
    }


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // мы вращаем все объекты в нашем массиве objects с помощью этого кода.
        objects.forEach((obj) => {
            obj.rotation.y = time;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
