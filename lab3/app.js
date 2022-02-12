const people = require("./people");
const stocks = require("./stocks");
const util = require('util');


async function main(){
    try{
        const getPersonByIdOne = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log (getPersonByIdOne);
    }catch(e){
        console.log (e);
    }
    try{
        const sameStreetOne = await people.sameStreet("sutherland", "point");
        console.log (util.inspect(sameStreetOne, false, null, true));
    }catch(e){
        console.log (e);
    }
    try{
        const manipulateSsnOne = await people.manipulateSsn();
        console.log (manipulateSsnOne);
    }catch(e){
        console.log (e);
    }
    try{
        const sameBirthdayOne = await people.sameBirthday(09,25);
        console.log (sameBirthdayOne);
    }catch(e){
        console.log (e);
    }
    try{
        const listShareholdersOne = await stocks.listShareholders();
        console.log (util.inspect(listShareholdersOne, false, null, true));
    }catch(e){
        console.log (e);
    }
    try{
        const topShareholderOne = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log (topShareholderOne);
    }catch(e){
        console.log (e);
    }
    try{
        const listStocksOne = await stocks.listStocks("Grenville", "Pawelke");
        console.log (listStocksOne);
    }catch(e){
        console.log (e);
    }
    try{
        const getStockByIdOne = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (getStockByIdOne);
    }catch(e){
        console.log (e);
    }

}


main();