
const lab1 = require("./lab1");

console.log(lab1.questionOne([5, 3, 10]));
// should return and output: { '2': true, '18': false, '93': false }
console.log(lab1.questionOne([4,8])); 
// should return and output: { '9': false, '57': false }
console.log(lab1.questionOne([2]));
// should return and output: { '3': true } 
console.log(lab1.questionOne([]));
// should return and output: {} 
console.log(lab1.questionOne()); 
// should return and output: {}


console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
// should return and output: [ 1, 2, 3 ] 
console.log(lab1.questionTwo([1, '1', 1, '1', 2])); 
// should return and output: [ 1, '1', 2 ]
console.log(lab1.questionTwo([3, 'a', 'b', 3, '1'])); 
// should return and output: [ 3, 'a', 'b', '1' ]
console.log(lab1.questionTwo([7, 'bm', 'mb', 'a', 'a','7'])); 
// should return and output: [ 7, 'bm', 'mb', 'a', '7' ]
console.log(lab1.questionTwo([])); 
// should return and output: []


console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// should return and output: { act: [ 'cat', 'act' ] }
console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// should return and output: { acer: [ 'race', 'care' ] }
console.log(lab1.questionThree(["bar", "car", "taste", "arc","state"]));
// should return and output: { acr: [ 'car', 'arc' ], aestt: [ 'taste', 'state' ] }
console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// should return and output: {}
console.log(lab1.questionThree([]));  
// should return and output: {}


console.log(lab1.questionFour(1, 3, 2)); 
// should return and output: 4
console.log(lab1.questionFour(2, 5, 6));
// should return and output: 194
console.log(lab1.questionFour(9, 3, 4));
// should return and output: 68045
console.log(lab1.questionFour(7, 9, 2));
// should return and output: 61320
console.log(lab1.questionFour(4, 8, 1));
// should return and output: 9310