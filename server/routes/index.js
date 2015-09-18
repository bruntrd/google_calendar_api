var express = require('express')
var router = express.Router();
var path = require('path');

router.get('/*', function(req,res,next){
    //console.log(req.params[0]);
    var file= req.params[0] || "assets/views/index.html";
    //console.log(file);
    res.sendFile(path.join(__dirname, "../public", file));

});

module.exports= router;