const express = require('express'); //needed to instantiate express functions
const bodyParser = require('body-parser');
const app = express(); //instantiate the express/response handling function
const request = require('request');
const {host} = require('./api/config');
const requestCondoObj = require('./api/API/requestCondo');
const viewGalleryObj = require('./api/API/viewGalley');
const productRoutes = require('./api/routes/products'); //get route handlng for a specific route with the products.js file

/*
[FUNC]
    this returns a json object at any route it goes to

app.use((req,res,next) => {
    res.status(200).json({
        message: 'wala ako pera'
    });
})
*/

//app.use('/products', productRoutes);

app.use(bodyParser.json()); //parses requests objects so we can always get json format, rip XML lol (i think idk too late to finish reading docu)
app.get("/",(req,res,next) => {
    console.log("lmao who u");
    res.status(200).json({
        message: 'MAMA MO KALBO'
    });
})

app.post("/",(req, res, next) => {
    //bodyParser make req an 
    var bodi = req.body;
    //console.log(bodi);

    var userid = bodi.originalDetectIntentRequest.payload.data.sender.id;
    var callerid = bodi.queryResult.parameters["phone-number"];

    if(bodi.queryResult.intent.displayName == "Default Welcome Intent"){
        res.send(JSON.stringify(requestCondoObj.data()));
    }
    else if(bodi.queryResult.intent.displayName == "view_gallery"){
        var galleryData = "";
        viewGalleryObj.data().then(function(data){
                galleryData = JSON.stringify(data);
                //console.log("HEllo my data is");
                //console.log(galleryData);

                res.send(galleryData);
            }
        )
        
    }
    else if(bodi.queryResult.intent.displayName == "get_phone_number"){
        console.log(userid);
        console.log(callerid);

        var options = {
            uri: host+'/taft2GO/call_logs',
            method: 'POST',
            json: {
                "userid": userid,
                "callerid": callerid,
            }
        };
        
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            console.log(body.id) // Print the shortened url.l
            }
        });
    }


    //res.json({ 'fulfillmentText': 'Alright we can get you a condo, but first what is your phone number?' });

})

module.exports = app; //export the function