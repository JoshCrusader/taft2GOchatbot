function returnJsonObject(){
    var responseObj = {'fulfillmentMessages': [
            {
                'payload':{
                    'facebook':{
                        'text':'Hello there! Looking for beautiful condos 😍😍😍? taft2GO is here for you 🤑👌'
                    }
                }
            },
            {
                'payload':{
                    'facebook':{
                        "attachment":{
                            "type":"image", 
                            "payload":{
                              "url":"https://scontent.fmnl10-1.fna.fbcdn.net/v/t1.0-9/37919994_540458299704180_7427140185940295680_n.png?_nc_cat=0&oh=d483375363e866b32846c329f2d72bf8&oe=5BFD3D62", 
                              "is_reusable":true
                            }
                          }
                    }
                }
            },
            {
            'payload': {
                "facebook": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "taft2GO offers various services for you to get to the place you want to stay in! :) How do you want to get started? ;)",
                            "buttons": [{
                                "type": "web_url",
                                "url": "localhost/taft2GO/index.php",
                                "title": "Visit Taft2GO"
                            }]
                        }
                    },
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Browse Condo Gallery",
                            "payload": "View condo"
                        },
                        {
                            "content_type": "text",
                            "title": "Request for Condo",
                            "payload": "Rent condo"
                        },
                    ],
                    
                }
            }
        },
    ]};

    return responseObj;
}

module.exports = {"data": returnJsonObject};