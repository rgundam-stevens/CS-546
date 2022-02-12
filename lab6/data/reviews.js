const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;
const restaurants1 = require('./restaurants');

const { ObjectId } = require('mongodb');




//---------------------------------------------------------------------------------------------------------








module.exports = {
  async create(restaurantId, title, reviewer, rating, dateOfReview, review) {


    //Checking whether all fields are provided are not

    if(!restaurantId || !title || !reviewer || !rating || !dateOfReview || !review){
      throw 'All fields need to have valid values';
    }
    //Checking whether type is string

    if(typeof(restaurantId)!= 'string' ){
      throw 'restaurant ID should be a string';
    }

    if(typeof(title)!= 'string'){
      throw 'title should be a string';
    }
    if(typeof(reviewer)!= 'string'){
      throw 'reviewer should be a string';
    }
    if(typeof(dateOfReview)!= 'string'){
      throw 'date of review should be a string';
    }
    if(typeof(review)!= 'string'){
      throw 'review should be a string';
    }


    //Checking whether string is not empty
    if(restaurantId.length===0 ){
      throw 'restaurant ID cannot be a empty string';
    }
    if(title.length===0 ){
      throw 'title cannot be a empty string';
    }
    if(reviewer.length===0 ){
      throw 'reviewer cannot be a empty string';
    }
    if(dateOfReview.length===0 ){
      throw 'date of review cannot be a empty string';
    }
    if(review.length===0 ){
      throw 'review cannot be a empty string';
    }

    //checking whether strings are not just empty spaces 

    if(restaurantId.trim().length === 0){
      throw 'restaurant ID cannot be just empty spaces';
    }
    if(title.trim().length === 0){
      throw 'title cannot be just empty spaces';
    }
    if(reviewer.trim().length === 0){
      throw 'reviewer cannot be just empty spaces';
    }
    if(dateOfReview.trim().length === 0){
      throw 'date of review cannot be just empty spaces';
    }
    if(review.trim().length === 0){
      throw 'review  cannot be just empty spaces';
    }

     //Checking if Id is valid Object ID
     try {
      ObjectId(restaurantId);
    } catch (error) {
      throw 'restaurant id should be valid ObjectId';
    }

    //Checking for overall rating is number and range is valid

  if(typeof(rating) != 'number'){
    throw 'rating should be a number'
  }
  if(rating < 0 || rating > 5){
    throw 'rating value should be in between 0 to 5';
  }


// Checking correct date format

 let pattern1 = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

 if(!dateOfReview.match(pattern1)){
   throw 'enter a valid date format of mm/dd/yyyy';
 }


  // Checking correct date
  let inputDate = new Date(dateOfReview);

  // Get today's date
  let todaysDate = new Date();
  
  // call setHours to take the time out of the comparison
  if(inputDate.setHours(0,0,0,0) != todaysDate.setHours(0,0,0,0)) {
      throw "Date should be today's date";
  }

  
    const restaurantCollection =  await restaurants();
    const updateInfo = await restaurantCollection.updateOne(
      { _id: ObjectId(restaurantId)},
      { $addToSet: { reviews: { 
        _id : ObjectId(),
        title: title,
        reviewer : reviewer,
        rating : rating,
        dateOfReview : dateOfReview,
        review : review} } }
    );
        let overallRating1 = 0;
    const resto = await restaurantCollection.findOne({ _id: ObjectId(restaurantId) }); 
    const resto1 = resto.reviews;
    for(let i=0;i<resto1.length;i++){
      overallRating1 = overallRating1+resto1[i].rating;
    }
    let overallRating2 = overallRating1/resto1.length;
    const updateInfo1 = await restaurantCollection.updateOne(
      { _id: ObjectId(restaurantId)},
      { $set:  { 
        overallRating :  overallRating2,
      }});

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'adding review failed';

    const final = await restaurants1.get(restaurantId);
    return final;
  },

  
  //---------------------------------------------------------------------------------------------------------


    async getAll(restaurantId){


      //Checking whether all fields are provided are not
    if(!restaurantId){
      throw 'restaurant ID need to be provided';
    }
    //Checking whether type is string
    if(typeof(restaurantId)!= 'string' ){
      throw 'restaurant ID should be a string';
    }
     //Checking whether string is not empty
     if(restaurantId.length===0 ){
      throw 'restaurant ID cannot be a empty string';
    }
    //checking whether strings are not just empty spaces 

    if(restaurantId.trim().length === 0){
      throw 'restaurant ID cannot be just empty spaces';
    }

    //Checking if Id is valid Object ID
    try {
      ObjectId(restaurantId);
    } catch (error) {
      throw 'restaurant id should be valid ObjectId';
    }

      let rest = await restaurants();
        const resto = await rest.findOne({ _id: ObjectId(restaurantId) });
        if (resto === null) throw 'No restaurant with that id';
    
    
        const reviewList = await resto.reviews;
        return reviewList;
      },


//---------------------------------------------------------------------------------------------------------


      async get(reviewId){

        //Checking whether all fields are provided are not
    if(!reviewId){
      throw 'review ID need to be provided';
    }
    //Checking whether type is string
    if(typeof(reviewId)!= 'string' ){
      throw 'review ID should be a string';
    }
     //Checking whether string is not empty
     if(reviewId.length===0 ){
      throw 'review ID cannot be a empty string';
    }
    //checking whether strings are not just empty spaces 

    if(reviewId.trim().length === 0){
      throw 'review ID cannot be just empty spaces';
    }

    //Checking if Id is valid Object ID
    try {
      ObjectId(reviewId);
    } catch (error) {
      throw 'review id should be valid ObjectId';
    }



        const rest = await restaurants();
        const review = await rest.findOne({"reviews._id" : ObjectId(reviewId)});
        if(review === null){
          throw 'review not found';
        }
        const reviewList = await review.reviews;
        let reviewList1 = reviewList.length;
        for(let i=0; i<=reviewList1; i++){
          if(reviewId === reviewList[i]._id.toString() ){
          return reviewList[i];
          }
        }
        
  },


  //---------------------------------------------------------------------------------------------------------

  async remove(reviewId) {


     //Checking whether all fields are provided are not
     if(!reviewId){
      throw 'review ID need to be provided';
    }
    //Checking whether type is string
    if(typeof(reviewId)!= 'string' ){
      throw 'review ID should be a string';
    }
     //Checking whether string is not empty
     if(reviewId.length===0 ){
      throw 'review ID cannot be a empty string';
    }
    //checking whether strings are not just empty spaces 

    if(reviewId.trim().length === 0){
      throw 'review ID cannot be just empty spaces';
    }

    //Checking if Id is valid Object ID
    try {
      ObjectId(reviewId);
    } catch (error) {
      throw 'review id should be valid ObjectId';
    }







    const rest = await restaurants();
    const review = await rest.findOne({"reviews._id" : ObjectId(reviewId)});
    if(review === null){
      throw 'review not found';
    }
    const updateInfo = await rest.updateOne(
      { _id: review._id },
      { $pull: {  reviews: { _id : ObjectId(reviewId),
        } } }
    );





    let overallRating1 = 0;
    const resto = await rest.findOne({ _id: ObjectId(review._id) }); 
    const resto1 = resto.reviews;
    for(let i=0;i<resto1.length;i++){
      overallRating1 = overallRating1+resto1[i].rating;
    }
    let overallRating2 = overallRating1/resto1.length;
    const updateInfo1 = await rest.updateOne(
      { _id: ObjectId(review._id)},
      { $set:  { 
        overallRating :  overallRating2,
      }});




    return {"reviewId" : reviewId , "deleted" : true};
  },

        





   



};
    