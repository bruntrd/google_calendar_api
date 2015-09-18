var express = require('express');
var path = require('path');
var app = express();
var index = require('./routes/index');
var calendar = require('./routes/calendar');
var events = require('./routes/events');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded:true}));

app.use("/events", events);
app.use("/index", index);
app.use("/", calendar);

app.set("port", (process.env.PORT || 5000));

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

