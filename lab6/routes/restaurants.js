
const express = require('express');
const router = express.Router();
const data = require('../data');
const resData = data.restaurants;
const { ObjectId } = require('mongodb');
//---------------------------------------------------------------------------------------------------------



router.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply and ID to delete' });
    return;
  }
  try {
    ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: 'Id should be valid object ID' });
    return;
  }


  try {
    let rest = await resData.get(req.params.id);
    res.status(200).json(rest);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
  }
});




//---------------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    let resList = await resData.getAll();
    res.status(200).json(resList);
  } catch (e) {
    res.sendStatus(500);
  }
});




//---------------------------------------------------------------------------------------------------------


router.post('/', async (req, res) => {
  let resInfo = req.body;
  let im4 = Object.keys(req.body);
  if(im4.length != 7){
    res.status(400).json({ error: 'JSON provided doesnt match the schema' });
    return;
  }


  //checking whether input is provided
  if (!resInfo) {
    res.status(400).json({ error: 'You must provide data to create a restaurant' });
    return;
  }
  if (!resInfo.name) {
    res.status(400).json({ error: 'You must provide a  name' });
    return;
  }
  if (!resInfo.location) {
    res.status(400).json({ error: 'You must provide location' });
    return;
  }
  if (!resInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide phone number' });
    return;
  }
  if (!resInfo.website) {
    res.status(400).json({ error: 'You must provide website' });
    return;
  }
  if (!resInfo.priceRange) {
    res.status(400).json({ error: 'You must provide price range' });
    return;
  }
  if (!resInfo.cuisines) {
    res.status(400).json({ error: 'You must provide cuisines' });
    return;
  }
  if (!resInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide service options' });
    return;
  }





  //Checking whether type is string

  if(typeof(resInfo.name)!= 'string' ){
    res.status(400).json({ error: 'name should be a string' });
    return;
  }

  if(typeof(resInfo.location)!= 'string'){
    res.status(400).json({ error: 'location should be a string' });
    return;
  }
  if(typeof(resInfo.phoneNumber)!= 'string'){
    res.status(400).json({ error: 'phone number should be a string' });
    return;
  }
  if(typeof(resInfo.website)!= 'string'){
    res.status(400).json({ error: 'website should be a string' });
    return;
  }
  if(typeof(resInfo.priceRange)!= 'string'){
    res.status(400).json({ error: 'price Range should be a string' });
    return;
  }


   //Checking whether string is not empty
   if(resInfo.name.length===0 ){
    res.status(400).json({ error: 'name cannot be empty' });
    return;
  }
  if(resInfo.location.length===0 ){
    res.status(400).json({ error: 'location cannot be empty' });
    return;
  }
  if(resInfo.phoneNumber.length===0 ){
    res.status(400).json({ error: 'phone number cannot be empty' });
    return;
  }
  if(resInfo.website.length===0 ){
    res.status(400).json({ error: 'website cannot be empty' });
    return;
  }
  if(resInfo.priceRange.length===0 ){
    res.status(400).json({ error: 'price Range cannot be empty' });
    return;
  }


  //checking whether strings are not just empty spaces 

  if(resInfo.name.trim().length === 0){
    res.status(400).json({ error: 'name cannot be just empty spaces' });
    return;
  }
  if(resInfo.location.trim().length === 0){
    res.status(400).json({ error: 'location cannot be just empty spaces' });
    return;
  }
  if(resInfo.phoneNumber.trim().length === 0){
    res.status(400).json({ error: 'phone number cannot be just empty spaces' });
    return;
  }
  if(resInfo.website.trim().length === 0){
    res.status(400).json({ error: 'website cannot be just empty spaces' });
    return;
  }
  if(resInfo.priceRange.trim().length === 0){
    res.status(400).json({ error: 'price range cannot be just empty spaces' });
    return;
  }



  // Ckecking price range format

  if(resInfo.priceRange != '$' && resInfo.priceRange != '$$' && resInfo.priceRange != '$$$' && resInfo.priceRange != '$$$$'){
    res.status(400).json({ error: 'price range should be in between $ to $$$$' });
    return; 
  }

  //Checking if cuisines is an array and at least one element inside it which is a string and is not empty

  if(!Array.isArray(resInfo.cuisines)){
    res.status(400).json({ error: 'Cuisines should be an array' });
    return; 
  }
  if(resInfo.cuisines.length=== undefined || resInfo.cuisines.length=== 0){
    res.status(400).json({ error: 'Cuisines cannot be empty' });
    return;
  }
  for(let i=0;i<resInfo.cuisines.length;i++){
    if(typeof(resInfo.cuisines[i])!== 'string'){
      res.status(400).json({ error: 'Cuisines can only hold string inside it' });
    return;
    }
  }
  for(let i=0;i<resInfo.cuisines.length;i++){
    if(resInfo.cuisines[i].length === 0){
      res.status(400).json({ error: 'string inside Cuisines cannot be empty' });
    return;
    }
  }
  for(let i=0;i<resInfo.cuisines.length;i++){
    if(resInfo.cuisines[i].trim().length === 0){
      res.status(400).json({ error: 'string inside Cuisines cannot be just filled with empty spaces' });
      return;
    }
  }


    //Checking whether serviceOptions is not an object
    
    if(typeof(resInfo.serviceOptions) != 'object'){
      res.status(400).json({ error: 'Service options should always be an object' });
      return;
  }

  if(Array.isArray(resInfo.serviceOptions)){
    res.status(400).json({ error: 'Service options should always be an object' });
      return;
  }

       //Checking for boolean
   let im = Object.values(resInfo.serviceOptions);
   for (let k of im){
     if (typeof(k)!= 'boolean'){
      res.status(400).json({ error: 'Service options should always be a boolean' });
      return;
     }
   }


   //checking whether dineIn, dine OUt and delivery are present
   let im1 = Object.keys(resInfo.serviceOptions);
     if(im1[0] != 'dineIn'){
      res.status(400).json({ error: 'first option in service option should be dine in ' });
      return;
     }
    if(im1[1] != 'takeOut'){
      res.status(400).json({ error: 'second option in service option should be take out ' });
      return;
    }
    if(im1[2] != 'delivery'){
      res.status(400).json({ error: 'third option in service option should be delivery ' });
      return;
    }

    //checking if service option only has 3 keys.
    let im2 = Object.keys(resInfo.serviceOptions);

    if(im2.length>3){
      res.status(400).json({ error: 'there can only be 3 options in service options' });
      return;
    }









   //Checking for website pattern
   let pattern = /^https?:\/\/www\.[-a-zA-Z0-9@:%._\+~#=]{5,256}\.com/

   if(!resInfo.website.match(pattern) || resInfo.website.slice(-4) !== '.com'){
    res.status(400).json({ error: 'Enter a valid URl' });
    return;
   }

   //Checking for phone number pattern
   let phone_pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}/
   if(!resInfo.phoneNumber.match(phone_pattern) || resInfo.phoneNumber.slice(-5)[0] !== '-'){
    res.status(400).json({ error: 'Enter a valid Phone number' });
    return;
  }

  

  try {
    const newRestaurant = await resData.create(
      resInfo.name,
      resInfo.location,
      resInfo.phoneNumber,
      resInfo.website,
      resInfo.priceRange,
      resInfo.cuisines,
      resInfo.serviceOptions

    );
    res.status(200).json(newRestaurant);
  } catch (e) {
    res.sendStatus(500);
  }
});






//---------------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
  let resInfo = req.body;

  try {
    ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: 'Id should be valid object ID' });
    return;
  }
  let im5 = Object.keys(req.body);
  if(im5.length != 7){
    res.status(400).json({ error: 'JSON provided doesnt match the schema' });
    return;
  }



  if (!resInfo) {
    res.status(400).json({ error: 'You must provide data to update a restaurant' });
    return;
  }

  if (!resInfo.name) {
    res.status(400).json({ error: 'You must provide a name' });
    return;
  }

  if (!resInfo.location) {
    res.status(400).json({ error: 'You must provide a location' });
    return;
  }
  if (!resInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide a phone number' });
    return;
  }
  if (!resInfo.website) {
    res.status(400).json({ error: 'You must provide a website' });
    return;
  }
  if (!resInfo.priceRange) {
    res.status(400).json({ error: 'You must provide price range' });
    return;
  }
  if (!resInfo.cuisines) {
    res.status(400).json({ error: 'You must provide cuisines' });
    return;
  }
  if (!resInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide service options' });
    return;
  }


  //Checking whether type is string

  if(typeof(resInfo.name)!= 'string' ){
    res.status(400).json({ error: 'name should be a string' });
    return;
  }

  if(typeof(resInfo.location)!= 'string'){
    res.status(400).json({ error: 'location should be a string' });
    return;
  }
  if(typeof(resInfo.phoneNumber)!= 'string'){
    res.status(400).json({ error: 'phone number should be a string' });
    return;
  }
  if(typeof(resInfo.website)!= 'string'){
    res.status(400).json({ error: 'website should be a string' });
    return;
  }
  if(typeof(resInfo.priceRange)!= 'string'){
    res.status(400).json({ error: 'price Range should be a string' });
    return;
  }


    //Checking whether string is not empty
   if(resInfo.name.length===0 ){
    res.status(400).json({ error: 'name cannot be empty' });
    return;
  }
  if(resInfo.location.length===0 ){
    res.status(400).json({ error: 'location cannot be empty' });
    return;
  }
  if(resInfo.phoneNumber.length===0 ){
    res.status(400).json({ error: 'phone number cannot be empty' });
    return;
  }
  if(resInfo.website.length===0 ){
    res.status(400).json({ error: 'website cannot be empty' });
    return;
  }
  if(resInfo.priceRange.length===0 ){
    res.status(400).json({ error: 'price Range cannot be empty' });
    return;
  }


  //checking whether strings are not just empty spaces 

  if(resInfo.name.trim().length === 0){
    res.status(400).json({ error: 'name cannot be just empty spaces' });
    return;
  }
  if(resInfo.location.trim().length === 0){
    res.status(400).json({ error: 'location cannot be just empty spaces' });
    return;
  }
  if(resInfo.phoneNumber.trim().length === 0){
    res.status(400).json({ error: 'phone number cannot be just empty spaces' });
    return;
  }
  if(resInfo.website.trim().length === 0){
    res.status(400).json({ error: 'website cannot be just empty spaces' });
    return;
  }
  if(resInfo.priceRange.trim().length === 0){
    res.status(400).json({ error: 'price range cannot be just empty spaces' });
    return;
  }


  // Ckecking price range format

  if(resInfo.priceRange != '$' && resInfo.priceRange != '$$' && resInfo.priceRange != '$$$' && resInfo.priceRange != '$$$$'){
    res.status(400).json({ error: 'price range should be in between $ to $$$$' });
    return; 
  }

  //Checking if cuisines is an array and at least one element inside it which is a string and is not empty

  if(!Array.isArray(resInfo.cuisines)){
    res.status(400).json({ error: 'Cuisines should be an array' });
    return; 
  }
  if(resInfo.cuisines.length=== undefined || resInfo.cuisines.length=== 0){
    res.status(400).json({ error: 'Cuisines cannot be empty' });
    return;
  }
  for(let i=0;i<resInfo.cuisines.length;i++){
    if(typeof(resInfo.cuisines[i])!== 'string'){
      res.status(400).json({ error: 'Cuisines can only hold string inside it' });
    return;
    }
  }
  for(let i=0;i<resInfo.cuisines.length;i++){
    if(resInfo.cuisines[i].length === 0){
      res.status(400).json({ error: 'string inside Cuisines cannot be empty' });
    return;
    }
  }
  for(let i=0;i<resInfo.cuisines.length;i++){
    if(resInfo.cuisines[i].trim().length === 0){
      res.status(400).json({ error: 'string inside Cuisines cannot be just filled with empty spaces' });
      return;
    }
  }


  //Checking whether serviceOptions is not an object
    
  if(typeof(resInfo.serviceOptions) != 'object'){
    res.status(400).json({ error: 'Service options should always be an object' });
    return;
}

if(Array.isArray(resInfo.serviceOptions)){
  res.status(400).json({ error: 'Service options should always be an object' });
    return;
}

     //Checking for boolean
 let im = Object.values(resInfo.serviceOptions);
 for (let k of im){
   if (typeof(k)!= 'boolean'){
    res.status(400).json({ error: 'Service options should always be a boolean' });
    return;
   }
 }

 //checking whether dineIn, dine OUt and delivery are present
 let im1 = Object.keys(resInfo.serviceOptions);
 if(im1[0] != 'dineIn'){
  res.status(400).json({ error: 'first option in service option should be dine in ' });
  return;
 }
if(im1[1] != 'takeOut'){
  res.status(400).json({ error: 'second option in service option should be take out ' });
  return;
}
if(im1[2] != 'delivery'){
  res.status(400).json({ error: 'third option in service option should be delivery ' });
  return;
}

//checking if service option only has 3 keys.
let im2 = Object.keys(resInfo.serviceOptions);

if(im2.length>3){
  res.status(400).json({ error: 'there can only be 3 options in service options' });
  return;
}




 //Checking for website pattern
 let pattern = /^https?:\/\/www\.[-a-zA-Z0-9@:%._\+~#=]{5,256}\.com/

 if(!resInfo.website.match(pattern) || resInfo.website.slice(-4) !== '.com'){
  res.status(400).json({ error: 'Enter a valid URl' });
  return;
 }

 //Checking for phone number pattern
 let phone_pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}/
 if(!resInfo.phoneNumber.match(phone_pattern) || resInfo.phoneNumber.slice(-5)[0] !== '-'){
  res.status(400).json({ error: 'Enter a valid Phone number' });
  return;
}





  try {
    await resData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }
  try {
    const updatedRestaurant = await resData.update(req.params.id, resInfo.name, resInfo.location, resInfo.phoneNumber, resInfo.website, resInfo.priceRange, resInfo.cuisines, resInfo.serviceOptions);
    res.status(200).json(updatedRestaurant);
  } catch (e) {
    res.sendStatus(500);
  }
});






//---------------------------------------------------------------------------------------------------------


router.delete('/:id', async (req, res) => {
 
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply and ID to delete' });
    return;
  }
  try {
    ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: 'Id should be valid object ID' });
    return;
  }

  try {
    await resData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Restaurant not found' });
    return;
  }

  try {
    await resData.remove(req.params.id);
    // return {"reviewId": req.params, "deleted": true};
    res.status(200).json({"reviewId": req.params.id, "deleted": true});
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;