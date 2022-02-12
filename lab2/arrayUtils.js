const average = function average(arr) {
    if(arr === undefined){
        throw 'Please provide input';
    }
    if(!Array.isArray(arr)){
        throw 'Please provide an input which is an array';
    }
    
    if(arr.length === undefined || arr.length===0){
       throw 'Array cannot be empty';
    }
    for(let i=0;i < arr.length;i++){
    if(!Array.isArray(arr[i])){
       throw 'Array should contain an array inside it';
    }
   }
    for(let i=0;i < arr.length;i++){
    if(arr[i].length === 0 ){
       throw 'Array inside an array cannot be empty';
    }
   }
   for(let i=0; i<arr.length;i++){
       for(let m=0; m<arr[i].length; m++){
           if(typeof(arr[i][m]) != 'number'){
               throw 'Array inside an array should only have numbers';
           }
       }
   }
   
   let sum1=0;
   for (let a=0;a<arr.length;a++){
       let sum=0,avg=0;
       for(let b=0;b<arr[a].length;b++){
           sum=sum+arr[a][b];
       }
       avg= sum/arr[a].length;
       arr[a]=Math.round(avg);
   }
   for (let a=0;a<arr.length;a++){
       sum1=sum1+arr[a];
   }
   let avg1=sum1/arr.length;
   return avg1;
   }





   const modeSquared = function modeSquared(arr) {
    
    if(arr === undefined){
        throw 'Please provide input';
    }
    
    if(!Array.isArray(arr)){
        throw 'Please provide an input which is an array';
    }
    if(arr.length === undefined || arr.length===0){
        throw 'Array cannot be empty';
     }
     for(let i=0; i<arr.length;i++){
            if(typeof(arr[i]) != 'number'){
                throw 'Array should only contain numbers';
            }
        }
    let num_count = {};
    let nums = [];
    let result = 0;
    for(let n of arr){
        if(n in num_count){
            num_count[n]++;
        }
        else {
            num_count[n] = 0;
            nums.push(n);
        }
    }
    nums.sort(function(k1, k2){
        return num_count[k1]<num_count[k2] ? 1 : -1;
    });
    // console.log(num_count);
    // console.log(nums);
    for(let n of nums){
        if(num_count[n]>0 && num_count[nums[0]]===num_count[n]){
            result += n*n;
        }
        else break;
    }
    return result;
}






const medianElement = function medianElement(arr) {
    
    if(arr === undefined){
        throw 'Please provide input';
    }
    
    
    if(!Array.isArray(arr)){
        throw 'Please provide an input which is an array';
    }
    if(arr.length === undefined || arr.length===0){
        throw 'Array cannot be empty';
     }
     for(let i=0; i<arr.length;i++){
        if(typeof(arr[i]) != 'number'){
            throw 'Array should only contain numbers';
        }
    }

    let arr1=[];
    for(let i=0;i<arr.length;i++){
    arr1.push(arr[i]);
    }
    let temp;
    let obj={}
    let key=0;

for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++)
    if(arr[i]>arr[j]){
        temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
}
if(arr.length%2 !=0){
    key= arr[Math.floor(arr.length/2)];
    obj[key]=arr1.indexOf(key);
    return obj;
}
if(arr.length%2 ===0){
    let f1=arr[Math.floor((arr.length-1)/2)];
    let f2=arr[(arr.length/2)];
    key = (f1+f2)/2 
    obj[key]=arr1.indexOf(f1);
    return obj;
}

}





const merge = function merge(arr1, arr2) {

    if(arr1 === undefined){
        throw 'Please provide first input';
    }

    if(arr2 === undefined){
        throw 'Please provide second input';
    }



    if(!Array.isArray(arr1)){
        throw 'Please provide an input which is an array';
    }
    if(!Array.isArray(arr2)){
        throw 'Please provide an input which is an array';
    }
    if(arr1.length === undefined || arr1.length===0){
        throw 'Array cannot be empty';
     }
     if(arr2.length === undefined || arr2.length===0){
        throw 'Array cannot be empty';
     }
     for(let i=0; i<arr1.length;i++){
        if(typeof(arr1[i]) !== 'number' && (typeof(arr1[i])!=='string' || arr1[i].length!==1)){
            throw 'Array should only contain numbers or characters';
        }
    }
    for(let i=0; i<arr2.length;i++){
        if(typeof(arr2[i]) !== 'number' && (typeof(arr2[i])!=='string' || arr2[i].length!==1)){
            throw 'Array should only contain numbers or characters';
        }
    }



    let upper = [];
    let lower = [];
    let nums = [];
    let result = [];
    array_split(arr1, lower, upper, nums);
    array_split(arr2, lower, upper, nums);
    nums.sort();
    upper.sort();
    lower.sort();
    array_combine(result, lower);
    array_combine(result, upper);
    array_combine(result, nums);
    return result;

}



const array_split = function array_split(arr, lower, upper, nums){
    for(let n of arr){
        if(typeof(n)==='string'){
            if(n === n.toUpperCase()){
                upper.push(n);
            }
            else {
                lower.push(n);
            }
        }
        else if (typeof(n)==='number'){
            nums.push(n);
        }
    }
}

const array_combine = function array_combine(arr, arr1){
    for(let n of arr1){
        arr.push(n);
    }
}

module.exports = {average,medianElement,modeSquared,merge};