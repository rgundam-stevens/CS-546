const sortString = function sortString(str) {
    if(str === undefined){
        throw 'Please provide input';
    }
    
    if(typeof(str) != 'string'){
        throw 'Please provide an input which is an string';
    }
    if(str.length === undefined || str.length===0){
        throw 'string cannot be empty';
     }
     if(str.trim().length === 0){
        throw 'string cannot be just empty spaces';
     }



   let upper='',nums='',lower='',finale='',special='',space='';
  
let srtd_str= str.split('').sort();

for(let c of srtd_str){
    if(c === ' '){
        space=space.concat(c);
    }
    else if(!isNaN(parseInt(c))){
        nums = nums.concat(c);
    }
    else if (c.charCodeAt()>=65 && c.charCodeAt()<=90){
       upper=upper.concat(c);
    }
    else if (c.charCodeAt()>=97 && c.charCodeAt()<=122){
        lower=lower.concat(c);
    }
    else special = special.concat(c); 
}
finale = finale.concat(upper).concat(lower).concat(special).concat(nums).concat(space);

return finale ;
}





const replaceChar = function replaceChar(str, idx){
    
    if(str === undefined){
        throw 'Please provide first argument of the function which is a string';
    }
    if(idx === undefined){
        throw 'Please provide second argument of the function which is a number';
    }


    if(typeof(str) != 'string'){
        throw 'Please provide an input which is an string';
    }
    if(typeof(idx) !== 'number'){
        throw 'second input-idx should be a number';
     }
    if(str.length === undefined || str.length===0){
        throw 'string cannot be empty';
     }
     if(str.trim().length === 0){
        throw 'string cannot contain JUST empty spaces';
     }
     if(idx <=  0) {
        throw 'idx should be greater than 0 and less than length of the string -2';
     }
     if( idx > (str.length)-2){
        throw 'idx should be greater than 0 and less than length of the string -2';
     }





    let char_at_idx = str[idx];
    let char_positions = [];
    let result='';
    for(let i=0; i<str.length; i++){
        if(i!=idx && str[i] === char_at_idx){
            char_positions.push(i);
        }
    }
    let chars_of_idx = [str[idx-1], str[idx+1]];
    let k=0;
    for(let i=0; i<str.length; i++){
        if(char_positions.includes(i)){
            result += chars_of_idx[k];
            k = (k+1)%2;
        }
        else {
            result += str[i];
        }
    }
    return result;
}





const mashUp = function mashUp(str1, str2, char){
    if(str1 === undefined){
        throw 'Please provide first argument of the function which is a string';
    }
    if(str2 === undefined){
        throw 'Please provide second argument of the function which is a string';
    }
    if(char === undefined){
        throw 'Please provide third argument of the function which is a char';
    }
     if(typeof(str1) != 'string'){
        throw 'Please provide an input which is an string';
    }
    if(typeof(str2) != 'string'){
        throw 'Please provide an input which is an string';
    }
    if(typeof(char) !== 'string'){
        throw 'please provide an input which is a character';
    }
    if(char.length === undefined || char.length ===0){
        throw 'char cannot be empty';
        }
   
    if(str1.length === undefined || str1.length===0){
        throw 'string cannot be empty';
     }
     if(str2.length === undefined || str2.length===0){
        throw 'string cannot be empty';
     }
     if(char.length!==1){
        throw 'character length should be only one';
    } 
     
    
    if(str1.trim().length === 0){
        throw 'string cannot contain JUST empty spaces';
     }
     if(str2.trim().length === 0){
        throw 'string cannot contain JUST empty spaces';
     }
     if(char.trim().length === 0){
        throw 'char cannot contain JUST empty spaces';
     }
     


    let result = '';
    let i=0;
    while(i<str1.length || i<str2.length){
        result += ((str1[i] || char) + (str2[i] || char));
        i++;
    }
    return result;
}


module.exports = {sortString,replaceChar,mashUp};









