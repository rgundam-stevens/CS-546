




const axios = require('axios');
const util = require('util');
const md5 = require('blueimp-md5');

const exportedMethods = {
    async getCharacter(searchTerm) {

        let beta = [];
        let theta = [];
        const publickey = '7a9867a1d9fa42a616143310a732a737';
        const privatekey = '3576b68102722480962d7c4cdb30de8bf90ae954';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?';
        const SEARCH_TERM_HERE = searchTerm;
        const url = baseUrl + 'nameStartsWith=' + SEARCH_TERM_HERE + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(url);
        for (let i = 0; i < data.data.results.length; i++) {
            beta.push(data.data.results[i]);


        }
        if (beta.length > 19) {
            for (let i = 0; i < 20; i++) {
                theta.push(beta[i]);
            }
        }
        else {
            for (let i = 0; i < beta.length; i++) {
                theta.push(beta[i]);
            }
        }
        return theta;
    },


    async getCharacterById(id) {

        let meta = [];
        let theta = [];
        let peta = {};
        const publickey = '7a9867a1d9fa42a616143310a732a737';
        const privatekey = '3576b68102722480962d7c4cdb30de8bf90ae954';
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
        const Id = id;
        const url = baseUrl + Id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
        const { data } = await axios.get(url);
        meta.push(data.data.results[0].name);
        meta.push(data.data.results[0].thumbnail.path);
        meta.push(data.data.results[0].thumbnail.extension)
        meta.push(data.data.results[0].description);
        for (let i = 0; i < data.data.results[0].comics.items.length; i++) {
            theta.push(data.data.results[0].comics.items[i].name);
        }
        peta["comics"] = theta;
        peta["name"] = meta[0];
        peta["thumbnail"] = meta[1];
        peta["extension"] = meta[2];
        let url0 = peta.thumbnail + "." + peta.extension;
        peta["url1"] = url0;
        peta["description"] = meta[3];
        return peta;
    }







};

module.exports = exportedMethods;