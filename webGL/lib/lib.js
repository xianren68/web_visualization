/**
 * 创建着色器
 * @param {WebGLRenderingContext} gl  渲染上下文
 * @param {gl.VERTEX_SHADER | gl.FRAGMENT_SHADER} type  着色器类型
 * @param {string} source  数据源
 * @return {WebGLShader | null}
 */
export function createShader(gl, type, source) {
    // 创建着色器对象
    const shader = gl.createShader(type)
    // 添加数据源
    gl.shaderSource(shader, source)
    // 编译，生成着色器
    gl.compileShader(shader)
    // 监听生成着色器是否成功
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader
    }
    console.log(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
}

/**
 * 创建着色器程序
 * @param {WebGL2RenderingContext} gl 渲染上下文
 * @param {WebGLShader} vertexShader 顶点着色器
 * @param {WebGLShader} fragmentShader 片元着色器
 * @return {WebGLProgram | null}
 */
export function createProgram(gl, vertexShader, fragmentShader) {
    // 创建着色器程序
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return program
    }
    console.log(gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
}

// 获取随机颜色
export function getColor() {
    return {
        r: Math.random(),
        g: Math.random(),
        b: Math.random(),
        a: Math.random()
    }
}