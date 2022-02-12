
const axios = require('axios');


async function getPeople(){
    const url = 'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json';
    const {data} = await axios.get(url);
    return data; // this will be the array of people objects
  }



let exportedMethods = {
  async getAllPeople() {
    let data =  await getPeople();
    const peopleCollection = await data;
    return peopleCollection;
    
  },
  async getPeopleById(id) {
    let final;

    let pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if(!id.match(pattern)){
      throw 'enter a valid uuid';
    }




    let data =  await getPeople();
    const peopleCollection = await data;
    for(let key=0; key<peopleCollection.length; key++){
      if(id===peopleCollection[key].id){
          final=peopleCollection[key];
          return data[key];
  }
  
  }
  if(final=== undefined){
    throw 'Person not found';
}
return final;


}
  

};

module.exports = exportedMethods;