const express = require('express')
const router = express.Router();
router.get('/person',(req,res)=>{
    res.send("you have requested a person")
});

router.get('/person/:name', (req,res)=>{
    res.send(`You have requested person ${req.params.name}`);
});

module.exports = router;