const express = require('express');
const router = express.Router();
//const utf8 = require('utf8');
router.get('/:AreaName/:Resolution/:Year/:Month/:Date', (req,res)=>{
    let format;
    if(Object.entries(req.query).length === 0 ) format="json";
    else format = req.query.format; 
    res.send(format);
})

module.exports = router