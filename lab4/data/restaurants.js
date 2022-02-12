const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const { ObjectId } = require('mongodb');
//const { ObjectID } = require('bson');





module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!






  // create restaurants ------------------------------------------------------------

  async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions) {
    
    //Checking whether all fields are provided are not

    if(!name || !location || !phoneNumber || !website || !priceRange || !cuisines || !overallRating || !serviceOptions){
      throw 'All fields need to have valid values';
    }



    //Checking whether type is string

    if(typeof(name)!= 'string' ){
      throw 'name should be a string';
    }

    if(typeof(location)!= 'string'){
      throw 'location should be a string';
    }
    if(typeof(phoneNumber)!= 'string'){
      throw 'phone number should be a string';
    }
    if(typeof(website)!= 'string'){
      throw 'website should be a string';
    }
    if(typeof(priceRange)!= 'string'){
      throw 'priceRange should be a string';
    }


    //Checking whether string is not empty
    if(name.length===0 ){
      throw 'name cannot be a empty string';
    }
    if(location.length===0 ){
      throw 'location cannot be a empty string';
    }
    if(phoneNumber.length===0 ){
      throw 'phone number cannot be a empty string';
    }
    if(website.length===0 ){
      throw 'website cannot be a empty string';
    }
    if(priceRange.length===0 ){
      throw 'price range cannot be a empty string';
    }

    //checking whether strings are not just empty spaces 

    if(name.trim().length === 0){
      throw 'name cannot be just empty spaces';
    }
    if(location.trim().length === 0){
      throw 'location cannot be just empty spaces';
    }
    if(phoneNumber.trim().length === 0){
      throw 'phone number cannot be just empty spaces';
    }
    if(website.trim().length === 0){
      throw 'website cannot be just empty spaces';
    }
    if(priceRange.trim().length === 0){
      throw 'price ranmge cannot be just empty spaces';
    }


    // Ckecking price range format

    if(priceRange != '$' && priceRange != '$$' && priceRange != '$$$' && priceRange != '$$$$'){
      throw 'price range should be in between $ to $$$$';
    }

    //Checking if cuisines is an array and at least one element inside it which is a string and is not empty

    if(!Array.isArray(cuisines)){
      throw 'Cuisines should be an array';
    }
    if(cuisines.length=== undefined || cuisines.length=== 0){
      throw 'Cuisines cannot be empty';
    }
    for(let i=0;i<cuisines.length;i++){
      if(typeof(cuisines[i])!== 'string'){
        throw 'cuisines can only hold strings inside it'
      }
    }
    for(let i=0;i<cuisines.length;i++){
      if(cuisines[i].length === 0){
        throw 'String cannot be empty';
      }
    }
    for(let i=0;i<cuisines.length;i++){
      if(cuisines[i].trim().length === 0){
        throw 'String cannot be empty spaces';
      }
    }

    //Checking whether serviceOptions is not an object
    
    if(typeof(serviceOptions) != 'object'){
        throw 'Service options should always be an object';
    }

    if(Array.isArray(serviceOptions)){
      throw 'Service options should always be an object';
   }


   //Checking for boolean
   let im = Object.values(serviceOptions);
  for (let k of im){
    if (typeof(k)!= 'boolean'){
      throw 'the value in service options should always be a boolean';
    }
  }
  

  //Checking for overall rating is number and range is valid

  if(typeof(overallRating) != 'number'){
    throw 'overall rating should be a number'
  }
  if(overallRating < 0 || overallRating > 5){
    throw 'overall rating value should be in between 0 to 5';
  }


   let pattern = /^https?:\/\/www\.[-a-zA-Z0-9@:%._\+~#=]{5,256}\.com/

   if(!website.match(pattern) || website.slice(-4) !== '.com'){
     throw 'enter a valid url';
   }

   let phone_pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}/
   if(!phoneNumber.match(phone_pattern) || phoneNumber.slice(-5)[0] !== '-'){
    throw 'enter a valid phone number';
  }





    const restaurantCollection = await restaurants();

    let newRestaurant = {
      name: name,
      location: location,
      phoneNumber:phoneNumber,
      website:website,
      priceRange:priceRange,
      cuisines:cuisines,
      overallRating:overallRating,
      serviceOptions:serviceOptions
    };
    
  
    const resto1 = await restaurantCollection.findOne({ name:name });
    const resto2 = await restaurantCollection.findOne({ phoneNumber:phoneNumber });
    const resto3 = await restaurantCollection.findOne({ location: location });
    if(resto1 !== null && resto2!== null && resto3!== null){
      throw 'restaurant already exist';
    }

    for(let i=0;i<restaurantCollection.length;i++){
      if(km[i].phoneNumber === newRestaurant.phoneNumber && km[i].location === newRestaurant.location && km[i].name=== newRestaurant.name){
      throw 'restaurant already exists';
    }
  }

    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (insertInfo.insertedCount === 0) throw 'Could not add restaurant';

    const newId = insertInfo.insertedId;
    const res = await this.get(newId.toString());
    res._id = res._id.toString();
    return res;
  },














  // get id -------------------------------------------------------------------------------------

  async get(id) {


    //checking if id is provided

    if(!id){
      throw ' please provide an id';
    }

    //Checking id Id is a string and not an empty one or has empty spaces

    if(typeof(id) != 'string'){
      throw 'id must be a string';
    }
    if(id.length === 0){
      throw 'id cannot be empty';
    }
    if(id.trim().length === 0){
      throw 'id cannot be filled with empty spaces';
    }


    const restaurantCollection = await restaurants();
    const resto = await restaurantCollection.findOne({ _id: ObjectId(id) });
    if (resto === null) throw 'No restaurant with that id';

    resto._id = resto._id.toString();
    return resto;
  },


























  // get all reataurants -------------------------------------------------------------------------------------

  async getAll() {

    if(Object.keys(arguments).length !==0){
      throw "no arguments allowed";
  }




    const restaurantCollection = await restaurants();

    const restaurantList = await restaurantCollection.find({}).toArray();
    for(let restaurant of restaurantList){
      restaurant._id = restaurant._id.toString();
    }

    return restaurantList;
  },













  // remove a restaurant -------------------------------------------------------------------------------------


  async remove(id) {

    //checking if id is provided

    if(!id){
      throw ' please provide an id';
    }

    //Checking id Id is a string and not an empty one or has empty spaces

    if(typeof(id) != 'string'){
      throw 'id must be a string';
    }
    if(id.length === 0){
      throw 'id cannot be empty';
    }
    if(id.trim().length === 0){
      throw 'id cannot be filled with empty spaces';
    }

    try {
      ObjectId(id);
    } catch (error) {
      throw 'id should be valid ObjectId';
    }


    const restaurantCollection = await restaurants();
    const restaurant = await this.get(id)
    const deletionInfo = await restaurantCollection.deleteOne({ _id: ObjectId(id) });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete restaurant with id of ${id}`;
    }
    return `${restaurant.name} has been successfully deleted!`;
  },














  // rename a restaurant -------------------------------------------------------------------------------------


  async rename(id, newWebsite) {
   

    //checking if id is provided

    if(!id){
      throw ' please provide an id';
    }

    //Checking id Id is a string and not an empty one or has empty spaces

    if(typeof(id) != 'string'){
      throw 'id must be a string';
    }
    if(id.length === 0){
      throw 'id cannot be empty';
    }
    if(id.trim().length === 0){
      throw 'id cannot be filled with empty spaces';
    }

    try {
      ObjectId(id);
    } catch (error) {
      throw 'id should be valid ObjectId';
    }

    //Checking if website is provided and  is a string and not an empty one or has empty spaces

    if(!newWebsite){
      throw ' please provide an website url';
    }

    if(typeof(newWebsite) != 'string'){
      throw 'id must be a string';
    }

    let pattern = /^https?:\/\/www\.[-a-zA-Z0-9@:%._\+~#=]{5,256}\.com/

   if(!newWebsite.match(pattern) || newWebsite.slice(-4) !== '.com'){
     throw 'enter a valid url';
   }




    const restaurantCollection = await restaurants();
    const updatedRestaurant = {
      website: newWebsite
    };

    const updatedInfo = await restaurantCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedRestaurant }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update restaurant successfully';
    }
    const resu = await this.get(id);
     return resu;
  }
};