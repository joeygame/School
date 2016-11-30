/* File contains vector and matrix operations */

//function returns vec2 object
function vec2(x, y)
{
    var vector = new Object();  //create Object
    vector.array = [x, y];      //array has 2 values
    vector.size = 2;            //size is 2
    vector.format = "vector";   //type is vector
    return vector;              //return vec2 object
}

//function returns vec3 object
function vec3(x, y, z)
{
    var vector = new Object();  //create Object
    vector.array = [x, y, z];   //array has 3 values
    vector.size = 3;            //size is 3
    vector.format = "vector";   //type is vector
    return vector;              //return vec3 object
}

//function returns vec4 object
function vec4(x, y, z, w)
{
    var vector = new Object();  //create Object
    vector.array = [x, y, z, w];//array has 4 values
    vector.size = 4;            //size is 4
    vector.format = "vector";   //type is vector
    return vector;              //return vec4 object
}

//function returns mat2 object
function mat2(m1, m2, m3, m4)
{
    var matrix = new Object();      //create Object

    matrix.array = new Array(2);    //create two dimensional array
    for (var i = 0; i < 2; i++)
        matrix.array[i] = new Array(2);

    var k = 0;                      //fill two dimensional array
    for (var i = 0; i < 2; i++)     //with arguments
        for (var j = 0; j < 2; j++)
            matrix.array[i][j] = arguments[k++];

    matrix.size = 2;                //size is 2
    matrix.format = "matrix";       //type is matrix
    return matrix;                  //return mat2 object
}

//function returns mat3 object
function mat3(m1, m2, m3, m4, m5, m6, m7, m8, m9)
{
    var matrix = new Object();      //create Object

    matrix.array = new Array(3);    //create two dimensional array
    for (var i = 0; i < 3; i++)
        matrix.array[i] = new Array(3);

    var k = 0;                      //fill two dimensional array
    for (var i = 0; i < 3; i++)     //with arguments
        for (var j = 0; j < 3; j++)
            matrix.array[i][j] = arguments[k++];

    matrix.size = 3;                //size is 3
    matrix.format = "matrix";       //type is matrix
    return matrix;                  //return mat3 object
}

//function returns mat4 object
function mat4(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16)
{
    var matrix = new Object();      //create Object

    matrix.array = new Array(4);    //create two dimensional array
    for (var i = 0; i < 4; i++)
        matrix.array[i] = new Array(4);

    var k = 0;                      //fill two dimensional array
    for (var i = 0; i < 4; i++)     //with arguments
        for (var j = 0; j < 4; j++)
            matrix.array[i][j] = arguments[k++];

    matrix.size = 4;                //size is 4
    matrix.format = "matrix";       //type is matrix
    return matrix;                  //return mat4 object
}

//function adds two vectors/matrices
function add(u, v)
{
    if (u.format == "vector")               //if u and v are vectors
    {                                       
         var result;

         if (u.size == 2)                   //initialize result to vec2,
             result = vec2(0.0, 0.0);       //vec3 or vec4
         else if (u.size == 3) 
             result = vec3(0.0, 0.0, 0.0);
         else 
             result = vec4(0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < u.size; i++)   //put sum of u and v into result
             result.array[i] = u.array[i] + v.array[i]; 

         return result;                     //return result
    }
    else                                         //if u and v are matrices
    {
         var result;

         if (u.size == 2)                        //initialize result to mat2,
             result = mat2(0.0, 0.0, 0.0, 0.0);  //mat3 or mat4
         else if (u.size == 3) 
             result = mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
         else 
             result = mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
                           0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < u.size; i++)        //put sum of u and v into result
             for (var j = 0; j < u.size; j++)
                 result.array[i][j] = u.array[i][j] + v.array[i][j]; 

         return result;                          //return result
    }
}

//function subtracts two vectors/matrices
function subtract(u, v)
{
    if (u.format == "vector")               //if u and v are vectors
    {                                      
         var result;

         if (u.size == 2)                   //initialize result to vec2, vec3,
             result = vec2(0.0, 0.0);       //or vec4
         else if (u.size == 3) 
             result = vec3(0.0, 0.0, 0.0);
         else 
             result = vec4(0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < u.size; i++)   //put difference of u and v
             result.array[i] = u.array[i] - v.array[i];   //into result

         return result;                     //return result
    }
    else                                         //if u and v are matrices
    {
         var result;

         if (u.size == 2)                        //initialize result to mat2,
             result = mat2(0.0, 0.0, 0.0, 0.0);  //mat3 or mat4
         else if (u.size == 3) 
             result = mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
         else 
             result = mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
                           0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < u.size; i++)        //put difference of u and v
             for (var j = 0; j < u.size; j++)    //into result
                 result.array[i][j] = u.array[i][j] - v.array[i][j]; 

         return result;                          //return result
    }
}

//function multiplies vector/matrix by scaler
function scale(s, u)
{
    if (u.format == "vector")                //if u is vector
    {    
         var result;

         if (u.size == 2)                    //initialize result to vec2, vec3
             result = vec2(0.0, 0.0);        //or vec4
         else if (u.size == 3) 
             result = vec3(0.0, 0.0, 0.0);
         else 
             result = vec4(0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < u.size; i++)    //put scaled u into result
             result.array[i] = s*u.array[i]; 

         return result;                      //return result
    }
    else                                         //if u is matrix
    {
         var result;

         if (u.size == 2)                        //initialize result to mat2,
             result = mat2(0.0, 0.0, 0.0, 0.0);  //mat3 or mat4
         else if (u.size == 3) 
             result = mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
         else 
             result = mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
                           0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < u.size; i++)        //put scaled u into result
             for (var j = 0; j < u.size; j++)    
                 result.array[i][j] = s*u.array[i][j]; 

         return result;                          //return result
    }
}

//function multiplies matrix/matrix or matrix/vector
function multiply(u, v)
{
    if (v.format == "vector")                //if u is matrix and v is vector
    {    
         var result;

         if (v.size == 2)                    //initialize result to vec2, vec3
             result = vec2(0.0, 0.0);        //or vec4
         else if (v.size == 3) 
             result = vec3(0.0, 0.0, 0.0);
         else 
             result = vec4(0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < v.size; i++)    //multiply matrix and vector
         {
              var sum = 0.0;
              for (var j = 0; j < v.size; j++)
                  sum = sum + u.array[i][j]*v.array[j];
              result.array[i] = sum;
         }

         return result;                      //return result
    }
    else                                         //if u is matrix and v is matrix
    {
         var result;

         if (v.size == 2)                        //initialize result to mat2, mat3,
             result = mat2(0.0, 0.0, 0.0, 0.0);  //or mat4
         else if (v.size == 3) 
             result = mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
         else 
             result = mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 
                           0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

         for (var i = 0; i < v.size; i++)        //multiply matrix and matrix
             for (var j = 0; j < v.size; j++)    
             {
                 var sum = 0;
                 for (var k = 0; k < v.size; k++)
                     sum = sum + u.array[i][k]*v.array[k][j];
                 result.array[i][j] = sum;
             }

         return result;                          //return result
    }
}

//function creats translation matrix
function translate(dx, dy, dz)
{
    return mat4(1.0, 0.0, 0.0, dx,         //translation matrix
                0.0, 1.0, 0.0, dy,
                0.0, 0.0, 1.0, dz,
                0.0, 0.0, 0.0, 1.0);
}

//function creats scaling matrix
function scaling(sx, sy, sz)
{
    return mat4(sx, 0.0, 0.0, 0.0,         //scaling matrix
                0.0, sy, 0.0, 0.0,
                0.0, 0.0, sz, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

//function creats rotation-x matrix
function rotatex(theta)
{
    var sin = Math.sin(theta*Math.PI/180);   
    var cos = Math.cos(theta*Math.PI/180);

    return mat4(1.0, 0.0, 0.0, 0.0,        //rotation-x matrix
                0.0, cos, -sin, 0.0,
                0.0, sin, cos, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

//function creats rotation-y matrix
function rotatey(theta)
{
    var sin = Math.sin(theta*Math.PI/180);
    var cos = Math.cos(theta*Math.PI/180);

    return mat4(cos, 0.0, sin, 0.0,        //rotation-y matrix
                0.0, 1.0, 0.0, 0.0,
                -sin, 0.0, cos, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

//function creats rotation-z matrix
function rotatez(theta)
{
    var sin = Math.sin(theta*Math.PI/180);
    var cos = Math.cos(theta*Math.PI/180);

    return mat4(cos, -sin, 0.0, 0.0,       //rotation-z matrix
                sin, cos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

//function creats identity matrix
function identity()
{
    return mat4(1.0, 0.0, 0.0, 0.0,         //identity matrix
                0.0, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

//function converts vector/matrix/array of vectors to native Float32Array
function flatten(u)
{
    if (Array.isArray(u))                  //if u is array of vectors
    {
        var size = u[0].size;              //determine vector type
        var array = [];                    //start with empty array
        
        for (var i = 0; i < u.length; i++) //for each vector in array
            for (var j = 0; j < size; j++) //for each value in vector
                array.push(u[i].array[j]); //push value into array

        return new Float32Array(array);    //convert array to Float32Array
    }
    else if (u.format == "vector")         //if u is vector
        return new Float32Array(u.array);  //convert vector into Float32Array
    else                                       //if u is matrix
    {
        var array = [];                        //start with empty array

        for (var j = 0; j < u.size; j++)       //for each value in matrix
            for (var i = 0; i < u.size; i++)   //push the value in column order
                array.push(u.array[i][j]);

        return new Float32Array(array);        //convert array to Float32Array
    }
}
