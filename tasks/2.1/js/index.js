// // -------------------------------------------------------------
// // ---------------------- рисование точки v1 ----------------------
// вершинный шейдер
// определяет координаты точки и её размер. где gl_PointSize = размер
let VSHADER_SOURCE =
    `void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);  // координаты
        gl_PointSize = 100.0;                    // установить размер точки
    }`;

// фрагментный шейдер
// определяет цвет фрагментов
let FSHADER_SOURCE =
    `void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); // установить цвет 
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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
};

main()



