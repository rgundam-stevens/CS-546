
const axios = require('axios');




  async function getStock(){
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data; // this will be the array of people objects
  }





let exportedMethods = {
  async getAllStocks() {
    let data =  await getStock();
    const stockCollection = await data;
    
    return stockCollection;
  },
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getStockById(id) {
    let final;

    let pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if(!id.match(pattern)){
      throw 'enter a valid uuid';
    }


    let data =  await getStock();
    const stockCollection = await data;
    for (let key = 0; key < stockCollection.length; key++) {
      if (id === stockCollection[key].id) {
          final = stockCollection[key];
          return stockCollection[key];
      }

  }
  

  if(final=== undefined){
    throw 'Stock not found';
}
return final;


}

 
};

module.exports = exportedMethods;