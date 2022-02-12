


const questionOne = function questionOne(arr=[]) {
    // Implement question 1 here
    let result = {};
    for (let key of arr){
        let ans = ((key ** 2)-7);
        let ans1 = Math.abs(ans);
        let isPrime = true;
            for (let i = 2; i <  ans1; i++) {
                if (ans1 % i === 0) {
                    isPrime = false;
                    break;
                }
            }
        result [ans1]=isPrime;
    }
    return result;
}


const questionTwo = function questionTwo(arr=[]) { 
    // Implement question 2 here
    let newArr =[];
    for(let i=0; i<arr.length;i++) {
        if (newArr.indexOf(arr[i])=== -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}


const questionThree = function questionThree(arr) {
    // Implement question 3 here
    let result={};
    arr = questionTwo(arr);
    for(let key of arr) {
        let srtd_key = key.split('').sort().join('');
        if(srtd_key in result) {
            result[srtd_key].push(key);
        }
        else {
            result[srtd_key] = [key];
        } 
    }
    // console.log(result);
    for(let key in result){
        if(result[key].length==1){
            delete result[key];
        }
    }
    return result;
}


const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let result = [];
    let l=0;
    let arr=[num1, num2 , num3 ];
    for (let key of arr){
        let key1=1;
        for(let i=1; i<=key; i++) {
             key1= key1*i;    
        }
        result[l]=key1;
            l++;
    }
    let output1= (num1+num2+num3)/3
    let output= ((result[0]+result[1]+result[2])/output1);
    let final=Math.floor(output);
    return final;
}


module.exports = {
    firstName: "Varun", 
    lastName: "G", 
    studentId: "10477305",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};





