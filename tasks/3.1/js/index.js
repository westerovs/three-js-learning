// // -----------------------------------------------------------------
// // ---------------------- рисование по щелчку ----------------------
// вершинный шейдер
// определяет координаты точки и её размер. где gl_PointSize = размер
let VSHADER_SOURCE =
    `attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position; // координаты
        gl_PointSize = 10.0;     // установить размер точки
    }`;

// фрагментный шейдер
// определяет цвет фрагментов
let FSHADER_SOURCE =
    `void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);    // установить цвет 
    }`;

function main() {
    const canvas = document.getElementById('webgl');
    const gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('gl не загружен!');
        return;
    }

    // инициализировать шейдеры
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('шейдеры не загружены!');
        return;
    }

    // получить ссылку на переменную-атрибут a_Position
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    // зарегестрировать функцию обработчик для выз. по щелчку мыши
    canvas.onclick = function(ev) {
        click(ev, gl, canvas, a_Position);
    };

    gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = []; // массив с коорд.точек, где выполнялись щелчки

function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX; // коорд x ук. мыши
    let y = ev.clientY; // коорд y ук. мыши
    
    // преобразование системы координат webGl в cист.коорд canvas
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    // сохранить координаты в массив g_points
    g_points.push([x, y]);

    // oчистить canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    let len = g_points.length;

    for (let i = 0; i < len; i++) {
        let xy = g_points[i];
        // передать координаты щелчка в перем. a_Position
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

        // draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

window.addEventListener('load', () => main());
