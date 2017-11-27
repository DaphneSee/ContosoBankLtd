var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    //appId: "d9f15478-e2dc-4d26-9651-5d47ca652edf",
    //appPassword: "gnzMMRY615=!}vnzoSJA82("
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
    
        //session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
    });
    
    // This line will call the function in your LuisDialog.js file
    luis.startDialog(bot);