var builder = require('botbuilder');
var bankStore = require('./LocationCards');
var mobile = require('./PersonalDetails');
var qna = require('./QnA');
var welcome = require('./welcomeCards');
//var converter = require('./currencyConvert');

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/777ad1e9-cbe8-475b-98a6-d65dfdde35ee?subscription-key=cfca2d569671445e8749b6528940a169&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('currencyConverter', function (session, args) {
        converter.displayCurrencyCards(session);
    }).triggerAction({
                matches: 'currencyConverter'
    });

    bot.dialog('getMobileNumber', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter your username:");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Obtaining your mobile number.");
                mobile.displayMobileNumber(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
    ]).triggerAction({
        matches: 'getMobileNumber'
    });
    bot.dialog('DeleteMobileNo', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter your username to delete your mobile number:");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            session.send("you want to delete your mobile number");
                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Deleting your mobile number.");
                //sends this to personal details.
                mobile.deleteMobileNumber(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            }
    ]).triggerAction({
        matches: 'DeleteMobileNo'
    });
    bot.dialog('setMobileNumber', [
                function (session, args, next) {
                    session.dialogData.args = args || {};        
                    //if (!session.conversationData["username"]) {
                        builder.Prompts.text(session, "Enter a username to set your mobile number.");                
                    //} else {
                      //  next(); // Skip if we already have this info.
                    //}
                },
                function (session, results, next) {
        
                        if (results.response) {
                            session.conversationData["username"] = results.response;
                        }
                        // Pulls out the food entity from the session if it exists
                        var mobileNoEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'mobileNumber');
            
                        // Checks if the food entity was found
                        if (mobileNoEntity) {
                            session.send('Thanks for telling me that \'%s\' is your mobile number', mobileNoEntity.entity);
                            mobile.setMobileNumber(session, session.conversationData["username"], mobileNoEntity.entity); // <--
            
                        } else {
                            session.send("No mobile identified!!!");
                        }
                    }
            ]).triggerAction({
                matches: 'setMobileNumber'
            });

    bot.dialog('BankLocation', function (session, args) {
                
        //session.send('enter location')
        var LocationEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'Location');
        if (LocationEntity) {
            session.send('Looking for banks in %s...', LocationEntity.entity);
            bankStore.displayBankLocationCards("bank", LocationEntity.entity, session);
        } else {
        session.send("No location identified! Please try again");
                    }
        }).triggerAction({
                        matches: 'BankLocation'
         });

    bot.dialog('QnA', [
            function (session, args, next) {
                session.dialogData.args = args || {};
                builder.Prompts.text(session, "What is your question?");
            },
            function (session, results, next) {
                qna.talkToQnA(session, results.response);
            }
        ]).triggerAction({
            matches: 'QnA'
        });

    bot.dialog('welcomeIntent', function (session, args) {
        session.send('Hi, welcome to Contoso! ')
        welcome.displayWelcomeCards(session);
    }).triggerAction({
    matches: 'welcomeIntent'
    });

    bot.dialog('None', function (session, args) {
            
        session.send("Sorry, I didn't get that. Can you please try again?")
    
    }).triggerAction({
                    matches: 'None'
     });
}