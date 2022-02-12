const util = require('util');
const axios = require('axios');


async function getPeople() {
    const url = 'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json';
    const { data } = await axios.get(url);
    return data; // this will be the array of people objects
}
async function getStocks() {
    const url = 'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json';
    const { data } = await axios.get(url);
    return data; // this will be the array of people objects
}





async function listShareholders() {
    if(Object.keys(arguments).length !==0){
        throw "no arguments allowed";
    }
    let people = await getPeople();
    let stocks = await getStocks();
    result = {}, array = [], result2 = {}, array2 = [];
    for (let i = 0; i < stocks.length; i++) {
        for (let j = 0; j < stocks[i].shareholders.length; j++) {
            for (let k = 0; k < people.length; k++) {
                if (stocks[i].shareholders[j].userId === people[k].id) {
                    result = { first_name: people[k].first_name, last_name: people[k].last_name, number_of_shares: stocks[i].shareholders[j].number_of_shares };
                    array.push(result);

                }


            }

        }
        result2 = {
            id: stocks[i].id,
            stock_name: stocks[i].stock_name,
            shareholders: array
        }
        result = '';
        array = [];

        array2.push(result2);

    }
    return (array2);
}






async function getStockById(id) {
    let final;
    if (id === undefined) {
        throw 'Please provide an input';
    }

    if (typeof (id) != 'string') {
        throw 'Input must be of type string';
    }
    if (id.length === undefined || id.length === 0) {
        throw 'string cannot be empty';
    }
    if (id.trim().length === 0) {
        throw 'string cannot be just empty spaces';
    }






    let stocks = await getStocks();
    for (let key = 0; key < stocks.length; key++) {
        if (id === stocks[key].id) {
            final = stocks[key];
            return stocks[key];
        }

    }
    if (final === undefined) {
        throw 'Stock not found';
    }
    return final;


}






async function topShareholder(stockName) {

    if (stockName === undefined) {
        throw 'Please provide a input';
    }
    if (typeof (stockName) != 'string') {
        throw 'Input must be of type string';
    }
    if (stockName.trim().length === 0) {
        throw 'string cannot be just empty spaces';
    }








    let temp = 0; user = '', name1 = '', name2 = '';
    let people = await getPeople();
    let stocks = await getStocks();
    for (let i = 0; i < stocks.length; i++) {
        if (stockName === stocks[i].stock_name) {
            for (let j = 0; j < stocks[i].shareholders.length; j++) {
                if (stocks[i].shareholders[j].number_of_shares > temp) {
                    temp = stocks[i].shareholders[j].number_of_shares;
                }
            }

        }
    }
    for (let i = 0; i < stocks.length; i++) {
        if (stockName === stocks[i].stock_name) {
            for (let j = 0; j < stocks[i].shareholders.length; j++) {
                if (stocks[i].shareholders[j].number_of_shares === temp) {
                    user = stocks[i].shareholders[j].userId;
                }
            }

        }
    }

    for (key = 0; key < people.length; key++) {
        if (people[key].id === user) {
            name1 = name1.concat(people[key].first_name);
            name2 = name2.concat(people[key].last_name);
        }
    }

    for (let i = 0; i < stocks.length; i++) {
        if (stockName === stocks[i].stock_name) {
            if (stocks[i].shareholders.length === 0) {
                return `${stockName} currently has no share holders.`;
            }
            else {

                return `With ${temp} shares in ${stockName}, ${name1} ${name2} is the top shareholder.`;
            }
        }
    }
}





async function listStocks(firstName, lastName) {

    if (firstName === undefined) {
        throw 'Please provide First input Parameter';
    }
    if (lastName === undefined) {
        throw 'Please provide Second input Parameter';
    }
    if (typeof (firstName) != 'string') {
        throw 'Input for first parameter must be of type string';
    }
    if (typeof (lastName) != 'string') {
        throw 'Input for second parameter must be of type string';
    }
    if (firstName.length === undefined || firstName.length === 0) {
        throw 'string cannot be empty';
    }
    if (lastName.length === undefined || lastName.length === 0) {
        throw 'string cannot be empty';
    }





    let people = await getPeople();
    let stocks = await getStocks();
    let user;
    let result = [];
    for (let i = 0; i < people.length; i++) {
        if (firstName === people[i].first_name && lastName === people[i].last_name) {
            user = people[i].id;
            break;
        }
    }
    if (!user) {
        throw 'Person not found';
    }
    for (let i = 0; i < stocks.length; i++) {
        for (let j = 0; j < stocks[i].shareholders.length; j++) {
            if (stocks[i].shareholders[j].userId === user) {
                result.push({ stock_name: stocks[i].stock_name, number_of_shares: stocks[i].shareholders[j].number_of_shares });
            }
        }
    }
    if(!result.length){
        throw 'Person doesnt hold shares in any company';
    }
    return result;
}




module.exports = { listShareholders, topShareholder, listStocks, getStockById };
