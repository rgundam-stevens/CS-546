const computeObjects = function(arr, func){
    if(arr === undefined){
        throw 'Please provide first input';
    }
    if(func === undefined){
        throw 'Please provide second input';
    }

    if(!Array.isArray(arr)){
        throw 'Please provide an input which is an array';
    }
    if(typeof(func) !== 'function'){
        throw 'The second parameter should always be a function';
    }
    for(let i=0;i < arr.length;i++){
        if(typeof(arr[i]) != 'object'){
           throw 'Array should only contain objects ';
        }
    }
    for(let i=0;i < arr.length;i++){
        if(Array.isArray(arr[i])){
           throw 'Array should only contain objects ';
        }
    }

    for(let i=0;i < arr.length;i++){
        if(Object.entries(arr[i]).length=== 0 ){
           throw 'object inside an array cannot be empty';
        }
    }
    if(arr.length === 0){
        throw 'Array should contain at least one object';
    }
    for(let i=0;i < arr.length;i++){
    for(let key of Object.values(arr[i])){
        if(typeof(key)!= 'number'){
            throw 'Object values should only be numbers';  
        }
    }
}
    
        

    result = {};
    for(let obj of arr){
        for(let key in obj){
            let func_res = func(obj[key]);
            if(key in result){
                result[key] += func_res;
            }
            else result[key] = func_res;
        }
    }
    return result;
}




const commonKeys = function (obj1, obj2){
    if(obj1 === undefined){
        throw 'Please provide first input';
    }
    if(obj2 === undefined){
        throw 'Please provide second input';
    }
    if(typeof(obj1) != 'object'){
        throw 'The first parameter should always be a object';
    }
    if(typeof(obj2) != 'object'){
        throw 'The second parameter should always be a object';
    }
    if(Array.isArray(obj1)){
        throw 'The first parameter should always be a object';
     }
     if(Array.isArray(obj2)){
        throw 'The second parameter should always be a object';
     }
     


    let result = {};
    for(let key in obj1){
        if(key in obj2 ){
            if(typeof(obj1[key])!=='object'){
                if(obj1[key]===obj2[key]){
                    result[key] = obj1[key];
                }
            }
            else if(typeof(obj1[key])===typeof(obj2[key])){
                if(Object.keys(obj1[key]).length===0 && Object.keys(obj2[key]).length===0){
                    result[key] = {};
                }
                else {
                    let common_obj = commonKeys(obj1[key], obj2[key]);
                    if(Object.keys(common_obj).length){
                        result[key] = common_obj;
                    }
                }
            }
        }
    }
    return result;
}






const flipObject = function(obj){
    if(obj === undefined){
        throw 'Please provide input';
    }
    if(typeof(obj) != 'object'){
    throw 'input should always be a object';
    }

    if(Array.isArray(obj)){
       throw 'input should always be a object';
    }
    if(Object.keys(obj).length === 0 ){
        throw 'object should have at least one key/value';
    }
    
    
    
let result = {};
for(let key in obj){
    if(Array.isArray(obj[key])){
        for(let val of obj[key]){
            result[val] = key;
        }
    }
    else if(typeof(obj[key])==='object'){
        result[key] = flipObject(obj[key]);
    }
    else {
        result[obj[key]] = key;
    }
}
return result;
}

module.exports = {computeObjects,commonKeys,flipObject};