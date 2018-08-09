const http = require('http'); //we need to http object of nodejs to be able to start a server

const app = require('./app'); //needs the app.js file we created to use its functions as it exports a response handling function object

const port = process.env.PORT || 3000; //define the port number where to host the app

const server = http.createServer(app); //create server accepts response handling functions and express app is a sample of a response handling function

server.listen(port); //start the server to listen at this certain port