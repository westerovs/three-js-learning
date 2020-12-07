// // -----------------------------------------------------------------
// // ---------------------- изменение цвета точки --------------------
// вершинный шейдер
// определяет координаты точки и её размер. где gl_PointSize = размер
let VSHADER_SOURCE =
    `attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position; // координаты
        gl_PointSize = 10.0;      // установить размер точки
    }`;

// фрагментный шейдер
// определяет цвет фрагментов
// uniform vec4 u_FragColor; // uniform- переменная
let FSHADER_SOURCE =
    `precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = u_FragColor;    // установить цвет 
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

    // получить ссылку на переменную-атрибут u_FragColor
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
                         
    // зарегестрировать функцию обработчик для выз. по щелчку мыши
    canvas.onclick = function(ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };

    gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = []; // массив с коорд.точек, где выполнялись щелчки
const g_colors = []; // массив со значениями цветов точек

function click(ev, gl, canvas, a_Position, u_FragColor) {
    let x = ev.clientX; // коорд x ук. мыши
    let y = ev.clientY; // коорд y ук. мыши
    
    // преобразование системы координат webGl в cист.коорд canvas
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    // сохранить координаты в массив g_points
    g_points.push([x, y]);

    // cохранить цвет в массиве g_colors
    if(x >= 0.0 && y >= 0.0) {                // Первый квадрант
        g_colors.push([1.0, 0.0, 0.1, 1.0]);  // Красный
    } else if (x < 0.0 && y < 0.0) {          // Третий квадрант
        g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Зелёный
    } else {                                  // Остальные
        g_colors.push([1.0, 1.0, 1.0, 1.0]);  // Белый
    }

    // oчистить canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    let len = g_points.length;

    for (let i = 0; i < len; i++) {
        let xy = g_points[i];
        let rgba = g_colors[i];

        // передать координаты щелчка в перем. a_Position
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

        // передать цвет точки в переменую u_FragColor;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

window.addEventListener('load', () => main());
