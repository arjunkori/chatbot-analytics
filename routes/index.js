"use strict";
var express = require('express');
var PubNub = require('pubnub');
var router = express.Router();
var utility = require('./utility');

GLOBAL.pubnub = new PubNub({
    publishKey:'pub-c-9c9ae7fc-36b4-4991-a377-641db3978ce5',
    subscribeKey:'sub-c-ade885f6-95d8-11e6-b36e-0619f8945a4f'
});


/*router.post('/',function(req,res){
    var str = req.body.msg;
    var arr = str.split(" ");
    var metric  = 'ga:'+arr[1];
    var dimension  = 'ga:'+arr[3]
    //help,summary,
    switch(arr[0]){
        case 'help': utility.getHelp(res);
        break;
        case 'summary' : utility.getSummary(res);
        break;
        case 'get' : utility.getMetrics(metric,dimension,res);
        break;
        default :res.send({error:400,message:'Command not found.'})
    }
});
*/

router.get('/', function(req, res, next) {
    console.log("################## INSIDE ##################");

    pubnub.addListener({
        message: function(obj) {

            console.log("######### MESSAGE ####### " + JSON.stringify(obj));
            console.log("######### Msg     ####### " + obj.message['data'].chatMsg);

            /*pubnub.publish({
                channel: "ch2",
                message: utility.getSummary()
            }, function(status, response) {
                console.log(status);
            })*/

            if (obj.message['data'].botMsg != true) {
                console.log("Message Send From Bot")
            } else {
                console.log("######### INSIDE ELSE #########")
                var str2 = obj.message['data'].chatMsg //obj.message;
                //var arr = str.split(" ");
                let finalString;
                var str = str2.toLowerCase();

                if (str.match("help")) {
                    finalString = "help";
                } else if (str.match("summary")) {
                    finalString = "summary"
                } else if (str.match("platform")) {
                    finalString = "platform"
                } else if (str.match("geo")) {
                    finalString = "geo"
                } else if (str.match("speed")) {
                    finalString = "speed"
                } else if (str.match("browser")) {
                    finalString = "browser"
                } else {
                    finalString = "help"
                }

                //var metric = 'ga:' + arr[1];
                //var dimension = 'ga:' + arr[3]

                //var ts = Math.round((new Date()).getTime() / 1000);
                var _unixTimeStamp = Date.now();

                //help,summary,
                //finalString = ;
                console.log("########## finalString Value is : ########### " + finalString)


                switch (finalString) {
                    case 'help':
                        //utility.getHelp(res, function(callback) {
                            pubnub.publish({
                                channel: "GAChatBot",
                                message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "GA ChatBot",
                                        "chatMsg": 'Try following commands \n\t get summary \n\t get paltform \n\t get geo \n\t get browser \n\t get speed.',
                                        "chatTime": _unixTimeStamp,
                                        "image": 'http://seeklogo.com/images/G/google-2015-icon-logo-B4217923DD-seeklogo.com.png',
                                        "botMsg": false
                                    }
                                }
                            }, function(status, response) {
                                console.log(status);
                            })
                        //});
                        break;

                    case 'summary':
                        var summ = utility.getSummary(res, function(callback) {
                            pubnub.publish({
                                channel: "GAChatBot",
                                message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "GA ChatBot",
                                        "chatMsg": callback, 
                                        "chatTime": _unixTimeStamp,
                                        "image": 'http://seeklogo.com/images/G/google-2015-icon-logo-B4217923DD-seeklogo.com.png',
                                        "botMsg": false
                                    }
                                }
                            }, function(status, response) {
                                console.log(status);
                            })
                        });
                        break;

                    case 'platform':
                        utility.getPlatform(res, function(callback) {
                            pubnub.publish({
                                channel: "GAChatBot",
                                message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "GA ChatBot",
                                        "chatMsg": callback,
                                        "chatTime": _unixTimeStamp,
                                        "image": 'http://seeklogo.com/images/G/google-2015-icon-logo-B4217923DD-seeklogo.com.png',
                                        "botMsg": false
                                    }
                                }
                            }, function(status, response) {
                                console.log(status);
                            })

                        });
                        break;

                    case 'geo':
                        utility.getGeo(res, function(callback) {
                            pubnub.publish({
                                channel: "GAChatBot",
                                message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "GA ChatBot",
                                        "chatMsg": callback, 
                                        "chatTime": _unixTimeStamp,
                                        "image": 'http://seeklogo.com/images/G/google-2015-icon-logo-B4217923DD-seeklogo.com.png',
                                        "botMsg": false
                                    }
                                }
                            }, function(status, response) {
                                console.log(status);
                            })

                        });
                        break;

                    case 'browser':
                        utility.getBrowser(res, function(callback) {
                            pubnub.publish({
                                channel: "GAChatBot",
                                message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "GA ChatBot",
                                        "chatMsg": callback, 
                                        "chatTime": _unixTimeStamp,
                                        "image": 'http://seeklogo.com/images/G/google-2015-icon-logo-B4217923DD-seeklogo.com.png',
                                        "botMsg": false
                                    }
                                }
                            }, function(status, response) {
                                console.log(status);
                            })

                        });
                        break;

                    case 'speed':
                        utility.getSpeed(res, function(callback) {
                            pubnub.publish({
                                channel: "GAChatBot",
                                message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "GA ChatBot",
                                        "chatMsg": callback, 
                                        "chatTime":_unixTimeStamp,
                                        "image": 'http://seeklogo.com/images/G/google-2015-icon-logo-B4217923DD-seeklogo.com.png',
                                        "botMsg": false
                                    }
                                }
                            }, function(status, response) {
                                console.log(status);
                            })

                        });
                        break;
                        /*case 'get' : utility.getMetrics(metric,dimension,res);
                        break;*/
                    default:
                        'sorry Command Not Found.'
                }
            }
        }
    });

    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['GAChatBot']
    });

    /* pubnub.publish({
            channel: "GAChatBot",
            message: {
                                    "type": "groupMessage",
                                    "data": {
                                        "chatUser": "Anonymous",
                                        "chatMsg":"sdsd",//"PageViews :200 ,Users :321 , NewUsers:45",
                                        "chatTime":"1477649539241"
                                    }
                                }
        }, function(status, response) {
            console.log(status);
        })*/

});

module.exports = router;


/*var express = require('express');
var PubNub = require('pubnub');
var router = express.Router();

GLOBAL.pubnub = new PubNub({
    publishKey: 'pub-c-82c3802d-345d-4af8-ad15-639371ca2fe6',
    subscribeKey: 'sub-c-6df84dfa-9aa6-11e6-8467-02ee2ddab7fe'
})

router.get('/', function(req, res, next) {
    res.render('browser', {
        title: 'Express'
    });

});

router.get('/publish', function(req, res) {
    console.log('########## PUBLISH #####################');

    pubnub.publish({
            message: {
                text: 'Hi pubnub'
            },
            channel: 'my_channel',
            sendByPost: false, // true to send via post

        },
        function(status, response) {
            if (status.error) {
                console.log(status)
            } else {
                console.log("message Published w/ timetoken", response.timetoken);
                console.log("PUBLISH REPONSE " + JSON.stringify(response));
            }
        }
    );

    console.log("############# SUBSCRIBE #################");

    pubnub.subscribe({
        channels: ['my_channel'],
        callback: function(m) {
                console.log(m);
            }
    })

});

router.get('/subscribe', function(req, res) {
    console.log("############# SUBSCRIBE #################");

    pubnub.subscribe({
        channels: ['my_channel'],
        callback: function(m) {
                console.log(m);
            }
    })
})

module.exports = router;*/