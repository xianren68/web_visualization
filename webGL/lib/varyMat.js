// @ts-check

/**
 * 平移矩阵
 * @param {number} tx x轴平移距离
 * @param {number} ty y轴平移距离
 * @param {number} tz z轴平移距离
 */
export function Translate(tx, ty, tz) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx, ty, tz, 1
    ]
}

/**
 * 绕z轴旋转矩阵
 * @param {number} angle 旋转角度
 */
export function RotateZ(angle) {
    const cosb = Math.cos(angle * Math.PI / 180)
    const sinb = Math.sin(angle * Math.PI / 180)
    return [
        cosb, sinb, 0, 0,
        -sinb, cosb, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

/**
 * 缩放矩阵
 * @param {number} sx x轴缩放比例
 * @param {number} sy y轴缩放比例
 * @param {number} sz z轴缩放比例
 */
export function Scale(sx,sy,sz) {
    return [
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, sz, 0,
        0, 0, 0, 1
    ]
}

/**
 * 矩阵相乘
 * @param {Array<Array<number>>} mats 矩阵列表
 */
export function multiplyMats(...mats){
    if(mats.length === 0) return []
    if(mats.length === 1) return mats[0]
    let result = mats[0]
    for(let i = 1; i < mats.length; i++){
        result = multiplyMatrices(result,mats[i])
    }
    return result
}

/**
 * 矩阵相乘
 * @param {Array<number>} a 矩阵
 * @param {Array<number>} b 矩阵
 */
function multiplyMatrices(a, b) {
  
    // TODO - Simplify for explanation
    // currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337
    
    var result = [];
    
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  
    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    result[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    result[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    result[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    result[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
  
    return result;
  }
  

