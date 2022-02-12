const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const { ObjectId } = require('mongodb');
//---------------------------------------------------------------------------------------------------------



router.get('/review/:id', async (req, res) => {

  try {
    ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: 'Id should be valid object ID' });
    return;
  }


  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply an review ID to get' });
    return;
  }
  try {
    const review = await reviewData.get(req.params.id);
    res.status(200).json(review);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});


//---------------------------------------------------------------------------------------------------------


router.get('/:id', async (req, res) => {
  try {
    ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: 'Id should be valid object ID' });
    return;
  }

  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply an review ID to get' });
    return;
  }

  try {
    const reviewList = await reviewData.getAll(req.params.id);
    res.status(200).json(reviewList);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

//---------------------------------------------------------------------------------------------------------



router.post('/:id', async (req, res) => {
  const reviewPostData = req.body;
  try {
    ObjectId(req.params.id);
  } catch (error) {
    res.status(400).json({ error: 'Id should be valid object ID' });
    return;
  }
  let im6 = Object.keys(req.body);
  if(im6.length != 5){
    res.status(400).json({ error: 'JSON provided doesnt match the schema' });
    return;
  }
  // Check if input is given

  if (!reviewPostData) {
    res.status(400).json({ error: 'You must provide data to create a review' });
    return;
  }
 
  if (!reviewPostData.title) {
    res.status(400).json({ error: 'You must provide review title' });
    return;
  }
  if (!reviewPostData.reviewer) {
    res.status(400).json({ error: 'You must provide reviewer name' });
    return;
  }
  if (!reviewPostData.rating) {
    res.status(400).json({ error: 'You must provide rating' });
    return;
  }
  if (!reviewPostData.dateOfReview) {
    res.status(400).json({ error: 'You must provide date of review' });
    return;
  }
  if (!reviewPostData.review) {
    res.status(400).json({ error: 'You must provide review' });
    return;
  }

//Checking whether type is string

  

  if(typeof(reviewPostData.title)!= 'string'){
    res.status(400).json({ error: 'title should be a string' });
    return;
  }
  if(typeof(reviewPostData.reviewer)!= 'string'){
    res.status(400).json({ error: 'reviewer should be a string' });
    return;
  }
  if(typeof(reviewPostData.dateOfReview)!= 'string'){
    res.status(400).json({ error: 'date of review should be a string' });
    return;
  }
  if(typeof(reviewPostData.review)!= 'string'){
    res.status(400).json({ error: 'review should be a string' });
    return;
  }
  
  //Checking whether string is not empty
  
  if(reviewPostData.title.length===0 ){
    res.status(400).json({ error: 'title cannot be empty' });
    return;
  }
  if(reviewPostData.reviewer.length===0 ){
    res.status(400).json({ error: 'reviewer cannot be empty' });
    return;
  }
  if(reviewPostData.dateOfReview.length===0 ){
    res.status(400).json({ error: 'date of review cannot be empty' });
    return;
  }
  if(reviewPostData.review.length===0 ){
    res.status(400).json({ error: 'review  cannot be empty' });
    return;
  }

  //Checking whether string is not just empty spaces
  
  if(reviewPostData.title.trim().length===0 ){
    res.status(400).json({ error: 'title cannot be just empty spaces' });
    return;
  }
  if(reviewPostData.reviewer.trim().length===0 ){
    res.status(400).json({ error: 'reviewer cannot be just empty spaces' });
    return;
  }
  if(reviewPostData.dateOfReview.trim().length===0 ){
    res.status(400).json({ error: 'date of review cannot be just empty spaces' });
    return;
  }
  if(reviewPostData.review.trim().length===0 ){
    res.status(400).json({ error: 'review  cannot be just empty spaces' });
    return;
  }

  

   //Checking for  rating is number and range is valid

   if(typeof(reviewPostData.rating) != 'number'){
    res.status(400).json({ error: 'rating should be a number' });
    return;
  }
  if(reviewPostData.rating < 0 || reviewPostData.rating > 5){
    res.status(400).json({ error: 'rating value should be in between 0 to 5' });
    return;
  }



  // Checking correct date format

 let pattern1 = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;

 if(!reviewPostData.dateOfReview.match(pattern1)){
  res.status(400).json({ error: 'enter a valid date format of mm/dd/yyyy' });
  return;
 }


  // Checking correct date
  let inputDate = new Date(reviewPostData.dateOfReview);

  // Get today's date
  let todaysDate = new Date();
  
  // call setHours to take the time out of the comparison
  if(inputDate.setHours(0,0,0,0) != todaysDate.setHours(0,0,0,0)) {
    res.status(400).json({ error: 'Date should be todays date' });
    return;
  }







  try {
    const newReview = await reviewData.create(
      req.params.id,
      reviewPostData.title, 
      reviewPostData.reviewer, 
      reviewPostData.rating, 
      reviewPostData.dateOfReview, 
      reviewPostData.review);
    res.status(200).json(newReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});



//---------------------------------------------------------------------------------------------------------


  router.delete('/:id', async (req, res) => {

    try {
      ObjectId(req.params.id);
    } catch (error) {
      res.status(400).json({ error: 'Id should be valid object ID' });
      return;
    }

    if (!req.params.id) {
      res.status(400).json({ error: 'You must Supply an review ID to delete' });
      return;
    }
    try {
      await reviewData.get(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    try {
      await reviewData.remove(req.params.id);
      res.status(200).json({"reviewId": req.params.id, "deleted": true});
    } catch (e) {
      res.status(500).json({ error: e });
    }
});


module.exports = router;