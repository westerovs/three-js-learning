// // -------------------------------------------------------------
// // ---------------------- рисование точки v2 ----------------------
// вершинный шейдер
// определяет координаты точки и её размер. где gl_PointSize = размер
let VSHADER_SOURCE =
    `attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position; // координаты
        gl_PointSize = 100.0;     // установить размер точки
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

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('шейдеры не загружены!');
        return;
    }

    // получить ссылку на переменную-атрибут a_Position
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    if (a_Position < 0) {
        console.log('Ошибка получения позиции');
        return;
    }

    // сохранить координаты в переменной-атрибуте - переменная/x/y/z
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    // очистка
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}

main();
