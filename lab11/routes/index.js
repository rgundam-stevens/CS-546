
const express = require('express')
const constructorMethod = (app) => {
  app.get('/',async (req,res)=>{
    res.render('home');
})

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;




