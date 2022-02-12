const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

//average Tests
try{
    // Should Pass
    const averageOne = arrayUtils.average([[1,3], [2,4,5]]);
    console.log('average passed successfully');
}catch(e) {
    console.error('average failed test case');
}
try{
    // Should Fail
    const averageTwo = arrayUtils.average([[1,3], [1],[]]);
    console.log('average did not error');
}catch(e) {
    console.error('average failed successfully');
}


//mode Squared Tests
try{
    // Should Pass
    const modeSquaredOne = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
    console.log('mode passed successfully');
}catch(e) {
    console.error('mode failed test case');
}
try{
    // Should Fail
    const modeSquaredTwo = arrayUtils.modeSquared("banana");
    console.log('mode did not error');
}catch(e) {
    console.error('mode failed successfully');
}

//median Element Tests
try{
    // Should Pass
    const medianElementOne = arrayUtils.medianElement([5, 6, 7]);
    console.log('median passed successfully');
}catch(e) {
    console.error('median failed test case');
}
try{
    // Should Fail
    const medianElementTwo = arrayUtils.medianElement([]);
    console.log('median did not error');
}catch(e) {
    console.error('median failed successfully');
}

//merge Tests
try{
    // Should Pass
    const mergeOne = arrayUtils.merge([1, 2, 3, 'g'], ['d','a', 's']);
    console.log('merge passed successfully');
}catch(e) {
    console.error('merge failed test case');
}
try{
    // Should Fail
    const mergeTwo = arrayUtils.merge([null, null, null], [null, null, null]);
    console.log('merge did not error');
}catch(e) {
    console.error('merge failed successfully');
}


//sortString Tests
try{
    // Should Pass
    const sortStringOne = stringUtils.sortString('123 FOO BAR!');
    console.log('sort string passed successfully');
}catch(e) {
    console.error('sort string failed test case');
}
try{
    // Should Fail
    const sortStringTwo = stringUtils.sortString(123);
    console.log('sort string did not error');
}catch(e) {
    console.error('sort string failed successfully');
}

//replace char Tests
try{
    // Should Pass
    const replaceCharOne = stringUtils.replaceChar("Daddy", 2);
    console.log('replace char passed successfully');
}catch(e) {
    console.error('replace char failed test case');
}
try{
    // Should Fail
    const replaceCharTwo = stringUtils.replaceChar(123);
    console.log('replace char did not error');
}catch(e) {
    console.error('replace char failed successfully');
}


//mash Up Tests
try{
    // Should Pass
    const mashUpOne = stringUtils.mashUp("Patrick", "Hill", "$");
    console.log('mashUp passed successfully');
}catch(e) {
    console.error('mashUp failed test case');
}
try{
    // Should Fail
    const mashUpTwo = stringUtils.mashUp("Patrick", "");
    console.log('mashUp did not error');
}catch(e) {
    console.error('mashUp failed successfully');
}





//compute objects Tests
try{
    // Should Pass
    const computeObjectsOne = objUtils.computeObjects([{ x: 2, y: 3},{ a: 70, x: 4, z: 5 }], x => x * 2);
    console.log('compute objects passed successfully');
}catch(e) {
    console.error('compute objects test case');
}
try{
    // Should Fail
    const computeObjectsTwo = objUtils.computeObjects("Patrick",  x => x * 2);
    console.log('compute objects did not error');
}catch(e) {
    console.error('compute objects failed successfully');
}

//common keys Tests
try{
    // Should Pass
    const commonKeysOne = objUtils.commonKeys({a: 2, b: 4}, {a: 5, b: 4});
    console.log('common keys passed successfully');
}catch(e) {
    console.error('common keys test case');
}
try{
    // Should Fail
    const commonKeysTwo = objUtils.commonKeys({a: 2, b: 4}, []);
    console.log('common keys did not error');
}catch(e) {
    console.error('common keys failed successfully');
}


//flip object Tests
try{
    // Should Pass
    const flipObjectOne = objUtils.flipObject({ a: 3, b: 7, c: { x: 1 } });
    console.log('flip object passed successfully');
}catch(e) {
    console.error('flip object test case');
}
try{
    // Should Fail
    const flipObjectTwo = objUtils.flipObject([]);
    console.log('flip object did not error');
}catch(e) {
    console.error('flip object failed successfully');
}