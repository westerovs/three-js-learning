document.querySelector('body').onload = () => {

    function main() {
        const canvas = document.querySelector('#canvas');
        const renderer = new THREE.WebGLRenderer({canvas});

        const fov = 75;    // поле зрения в градусах
        const aspect = 1;  // соотношение сторон холста
        const near = 0.1;  // пространство перед камерой
        const far = 5;     // пространство перед камерой

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        // Все, что вы хотите нарисовать необходимо добавить на сцену
        const scene = new THREE.Scene();

        // BoxGeometry который содержит данные для прямоугольного параллелепипеда.
        // Почти все, что мы хотим отобразить в Three.js, нуждается в геометрии,
        // которая определяет вершины нашего трехмерного объекта.
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

        // создаем основной материал и устанавливаем его цвет
        const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

        /*
          Затем мы создаем полигональную сетку Mesh.
          Mesh в three.js представляет комбинацию формы объекта Geometry и Material
          (как нарисовать объект, блестящий или плоский, какой цвет, какую текстуру(ры)
          применить и т.д.) а также положение, ориентацию, и масштаб этого объекта в сцене.
        */
        const cube = new THREE.Mesh(geometry, material);

        // добавляем Mesh на сцену
        scene.add(cube);

        // отрендерить сцену, вызвав функцию render рендерера передав ей сцену и камеру.
        renderer.render(scene, camera);
    }

    main();


}
