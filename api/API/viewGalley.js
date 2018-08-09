//calling json api from node https://stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js
var request = require('request-promise');
var host = require('../config');

function returnJsonObject(){
    //Some magic i will probably forget in the future
    var responseObj = {'fulfillmentMessages': [

        {
            'payload':{
                'facebook':{
                    'text':'Here are the latest batch of condos for you to see! check them out B)!'
                }
            }
        },
        {
            'payload': {
                "facebook": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [
                                {
                                    "title": "test title",
                                    "image_url": "https://d38dwrpoohadw1.cloudfront.net/public/preselling/project_1437462310_7978_3844.jpg",
                                    "subtitle": "Rate: P500 \n Capacity: 5",
                                    "default_action": {
                                        "type": "web_url",
                                        "url": "https://www.google.com",
                                        "webview_height_ratio": "COMPACT"
                                    }
                                },
                                {
                                    "title": "test title",
                                    "image_url": "https://d38dwrpoohadw1.cloudfront.net/public/preselling/project_1437462310_7978_3844.jpg",
                                    "subtitle": "Rate: P500 \n Capacity: 5",
                                    "default_action": {
                                        "type": "web_url",
                                        "url": "https://www.google.com",
                                        "webview_height_ratio": "COMPACT"
                                    }
                                }
                            ]
                        }
                    },
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Browse Condo Gallery",
                            "payload": "View Condo"
                        },
                        {
                            "content_type": "text",
                            "title": "Request for Condo",
                            "payload": "rent condo"
                        },
                    ],
                      
                },
            }
        },
    ]
    };
    var url = host+'/taft2GO/listing';
    var options = {
        method: 'GET',
        uri: url,
        json: true,
    }
    return request(options).then(function (res){
        var listings = res._embedded;
        var listings_length = listings.length;
        var first4_listings = listings_length >= 4 ? 4: listings_length; //gets the first four listings to display xd
        if(first4_listings == 0){
            responseObj = {
                "facebook":{
                    "text": "There are no condos yet :( please talk to us soon."
                }
            }
        }
        else{
            responseObj.fulfillmentMessages[1].payload.facebook.attachment.payload.elements = []

            for(var i = 0; i < first4_listings; i++){
                //console.log(listings[i].title);
                var carousel_obj = {}
                
                carousel_obj.title = listings[i].title;
                carousel_obj.image_url = listings[i].photo;
                carousel_obj.subtitle = "💸Rate: P"+listings[i].monthlyRate+" \n 👨‍👩‍👧‍👦Capacity: "+listings[i].capacity;
                carousel_obj.default_action = {};
                carousel_obj.default_action.type = "web_url";
                carousel_obj.default_action.url = host+"taft2GO/room-page.php?listingID="+listings[i]._id.$oid;
                carousel_obj.default_action.webview_height_ratio = "COMPACT";
                carousel_obj.buttons = [];
                carousel_but_1 = {
                    'type': 'web_url',
                    'url': host+"taft2GO/room-page.php?listingID="+listings[i]._id.$oid,
                    'title': 'Visit Site🏤'
                }
                carousel_but_2 = {
                    'type': 'web_url',
                    'url': host+"/taft2GO/Stays",
                    'title': 'My profile'
                }
                carousel_obj.buttons.push(carousel_but_1,carousel_but_2);
                responseObj.fulfillmentMessages[1].payload.facebook.attachment.payload.elements.push(carousel_obj);
                
                //console.log(listings[i]);
                
            }
        }
        //console.log(responseObj.fulfillmentMessages[0].payload.facebook.attachment.payload);
        return responseObj;
    }).catch((error) => { //Why does my syntaxing keep changing? Why not?
        console.log(error);
    });
}


module.exports = {"data": returnJsonObject};