// @ts-check
/**
 * 创建着色器
 * @param {WebGLRenderingContext} gl  渲染上下文
 * @param {number} type  着色器类型
 * @param {string} source  数据源
 * @return {WebGLShader | null}
 */
export function createShader(gl, type, source) {
    // 创建着色器对象
    const shader = gl.createShader(type)
    if(!shader){
        return null
    }
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
    if(!program){
        return null
    }
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

/**
 * 绘制圆
 * @param {{x:number,y:number}} point 圆心坐标
 * @param {number} radius 半径长度
 * @param {number} nums 由多少个三角形组成
 * @return {Array<number>} 顶点坐标
 */
export function drawCircle(point, radius, nums) {
    // 顶点数组
    const points = [point.x, point.y]
    for (let i = 0; i <= nums; i++) {
        // 每个坐标点与x轴的夹角
        let angle = i * Math.PI * 2 / nums
        // 计算点的横纵坐标
        let pointx = point.x + Math.cos(angle) * radius
        let pointy = point.y + Math.sin(angle) * radius
        points.push(pointx, pointy)
    }
    return points
}

/**
 * 绘制环
 * @param {{x:number,y:number}} point 圆心坐标
 * @param {number} inner 小圆半径
 * @param {number} outer 大圆半径
 * @param {number} nums 由多少个三角形组成
 * @return {{points:Array<number>,indexs:Array<number>}} 顶点坐标,顶点索引
 */
export function drawRing(point, inner, outer, nums) {
    // 顶点坐标
    const points = []
    // 索引数组
    const indexs = []
    for(let i = 0; i <= nums; i++){
        // 每个坐标点与x轴的夹角
        let angle = i * Math.PI * 2 / nums
        // 计算点的横纵坐标
        let innerx = point.x + Math.cos(angle) * inner
        let innery = point.y + Math.sin(angle) * inner
        let outerx = point.x + Math.cos(angle) * outer
        let outery = point.y + Math.sin(angle) * outer
        points.push(innerx, innery, outerx, outery)
        let v0 = i * 2
        let v1 = v0 + 1
        let v2 = v1 + 1
        let v3 = v2 + 1
        if (i == nums){
            v2 = 0
            v3 = 1
        }
        indexs.push(v0, v1, v2, v3)
    }
    return {points, indexs}
}