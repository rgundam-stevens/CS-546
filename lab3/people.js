const axios = require('axios');
const util = require('util');


async function getPeople(){
    const url = 'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json';
    const {data} = await axios.get(url);
    return data; // this will be the array of people objects
  }

  async function getStock(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data; // this will be the array of people objects
  }


  async function getPersonById(id)
{   
let final;
    if(id === undefined){
        throw 'Please provide an input';
    }

    if(typeof(id)!= 'string' ){
        throw 'Input must be of type string';
    }
    if(id.length === undefined || id.length===0){
        throw 'string cannot be empty';
     }
     if(id.trim().length === 0){
        throw 'string cannot be just empty spaces';
     }
     





    let data =  await getPeople();
    for(let key=0; key<data.length; key++){
        if(id===data[key].id){
            final=data[key];
            return data[key];
    }
    
    }
    if(final=== undefined){
        throw 'Person not found';
    }
    return final;
    

}


async function sameStreet(streetName, streetSuffix){

    if(streetName === undefined){
        throw 'Please provide First input Parameter';
    }
    if(streetSuffix === undefined){
        throw 'Please provide Second input Parameter';
    }

    if(typeof(streetName)!= 'string' ){
        throw 'Input for first parameter must be of type string';
    }
    if(typeof(streetSuffix)!= 'string' ){
        throw 'Input for second parameter must be of type string';
    }
    if(streetName.length === undefined || streetName.length===0){
        throw 'string cannot be empty';
     }
     if(streetSuffix.length === undefined || streetSuffix.length===0){
        throw 'string cannot be empty';
     }
     if(streetName.trim().length === 0){
        throw 'string cannot be just empty spaces';
     }
     if(streetSuffix.trim().length === 0){
        throw 'string cannot be just empty spaces';
     }
     




    let data =  await getPeople();
        let result=[];
        for(let key=0; key<data.length; key++){
        if(streetName.toLowerCase()=== data[key].address.home.street_name.toLowerCase() && streetSuffix.toLowerCase() === data[key].address.home.street_suffix.toLowerCase()) {
            result.push(data[key]);
            
        }
        if(streetName.toLowerCase() === data[key].address.work.street_name.toLowerCase() && streetSuffix.toLowerCase() === data[key].address.work.street_suffix.toLowerCase()){
            result.push(data[key]);
           
        }
       
    }
    if(result.length<2){
        throw 'There are less than 2 people that live on same street';
     }
    return result;
    
    }



   
    async function manipulateSsn(){
      if(Object.keys(arguments).length !==0){
        throw "no arguments allowed";
    }
        let data =  await getPeople();
            let nums='',special='',array=[],array1=[],obj={},obj1={},sum=0;
            let temp=0,temp1=999999999;
            
            for(let key=0; key<data.length; key++){
                let srtd_ssn= data[key].ssn.split('').sort();
                for (let c of srtd_ssn){
                    if(!isNaN(parseInt(c))){
                        nums = nums.concat(c);
                        
                    }
                    else
                    special = special.concat(c);
                }
                obj[parseInt(nums)]=data[key].first_name;
                obj1[parseInt(nums)]=data[key].last_name;
                array[key]= nums;
                nums='';
            }
            for(let i=0;i<array.length;i++){
            array1.push(parseInt(array[i]));
        }
        for(let i=0;i<array1.length;i++){
            if(array1[i]>temp){
                temp=array1[i];
            }
        }
       
        for(let i=0;i<array1.length;i++){
            if(array1[i]<temp1){
                    temp1=array1[i];
            }
        }
        for(let i=0;i<array1.length;i++){
            sum=sum+array1[i];
        }
        sum=Math.floor(sum/array1.length);
        let res = {
            highest: { firstName: obj[temp], lastName: obj1[temp] },
    
            lowest: { firstName: obj[temp1], lastName: obj1[temp1] },
            
            average: sum  // just an example, this will be computed average from all converted SSNS  make sure this value is a number, NOT a string
            
        };
        
        return res;
    }




    async function sameBirthday(month, day){

        if(month === undefined){
          throw 'Please provide an input';
      }
      if(day === undefined){
        throw 'Please provide an input';
      }
        if(typeof(month)!= 'string' && typeof(month)!= 'number'){
          throw 'Input must be of type string or number only';
         
        }
        if(typeof(month)=== 'string'){
        if(month.length===0){
          throw 'input cannot be empty';
       }
      }
        if(typeof(day)!= 'string' && typeof(day)!= 'number'){
          throw 'Input must be of type string or number only';
          
      }
      if(typeof(day)=== 'string'){
      if(day.length === undefined || day.length===0){
        throw 'input cannot be empty';
      }
      }
        
       
      

      
      
      
      if(parseInt(month)<1 || parseInt(month)>12){
        throw 'Please enter a valid month';
      }
      if(parseInt(day)<1 || parseInt(day)>31){
        throw 'Please enter a valid date';
      }
      if(parseInt(month)===1||parseInt(month)===4||parseInt(month)===6||parseInt(month)===9||parseInt(month)===11){
        if(parseInt(day)>30){
          throw 'There are only 30 days in this month';
        }
      }
      if(parseInt(month)===2){
        if(parseInt(day)>28){
          throw 'There are only 28 days in this month';
        }
      }
      
      
      
      
      
      
      
      
      
      
        let data =  await getPeople();
          month = parseInt(month);
          day = parseInt(day);
          let result = []
          for(let key=0; key<data.length; key++){
              let data_dob = data[key].date_of_birth.split('/');
              let data_month = parseInt(data_dob[0]);
              let data_day = parseInt(data_dob[1]);
              if(month === data_month && day === data_day){
                result.push(`${data[key].first_name} ${data[key].last_name}`);
              }
          }
          
      return result;
        
      }


      module.exports = {getPersonById,sameStreet,manipulateSsn,sameBirthday};



