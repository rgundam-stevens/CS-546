const express = require("express");
const router = express.Router()
const path = require('path');




router.get("/", async(req,res) => {
    try{
      res.sendFile(path.join(__dirname, '../public', 'palindrome.html'));
        return;
    }
    catch(e){
        res.status(500).json({message:e});
        return;
    }
});
router.get("/public/site.css", async(req,res) => {
    try{
      res.sendFile(path.join(__dirname, '../public', 'site.css'));
        return;
    }
    catch(e){
        res.status(500).json({message:e});
        return;
    }
});



module.exports = router;