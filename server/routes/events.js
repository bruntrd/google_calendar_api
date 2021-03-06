var googleConfig = {
    clientID: '270120115745-e2n1h3h8aufb1brf05hbin6r54orduop.apps.googleusercontent.com',
    clientSecret: 'uwWUU7VuuVSxZwZ5GT132DHv',
    calendarId: 'tpt.roomer@gmail.com',
    redirectURL: 'http://localhost:5000/auth'
};

var express = require('express');
var moment = require('moment');
var google = require('googleapis');
var router = express.Router();
var path = require('path');


var app = express(),
    calendar = google.calendar('v3');
oAuthClient = new google.auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.redirectURL),
    authed = false;

router.post('/', function(req,res,next){
    //var today = moment().format('YYYY-MM-DD') + 'T';
    console.log(req.body);
    console.log("post hit");
    var event = {
        summary: req.body.summary,
        location: req.body.location,
        start: {
            'dateTime': '2015-09-18T16:00:00-05:00',
            'timeZone': 'America/Chicago'
        },
        end: {
            'dateTime': '2015-09-18T17:00:00-05:00',
            'timeZone': 'America/Chicago'
        }
        };


    calendar.events.insert({
        calendarId: googleConfig.calendarId,
        resource: event,
        auth: oAuthClient
    }, function(err, event){
        if (err) {
            console.log('There was an error contacing google calendar: ' + err);
            return;
        }
        console.log('event created', event.htmlLink);
    });
});

router.get('/', function(req, res) {
    console.log(req.params[0]);

    var today = moment().format('YYYY-MM-DD') + 'T';

    calendar.events.list({
        calendarId: googleConfig.calendarId,
        maxResults: 20,
        timeMin: today + '00:00:00.000Z',
        timeMax: today + '23:59:59.000Z',
        auth: oAuthClient
    }, function(err, events) {
        if(err) {
            console.log('Error fetching events');
        } else {
            console.log('Successfully fetched events');
            console.log(events);
            res.json(events);

        }
    });
    //}
});



router.get("/*", function(req,res){
    var file = req.params[0] || '/assets/views/index.html';
    //console.log(file);
    res.sendFile(path.join(__dirname, '../public', file));

});

module.exports = router;