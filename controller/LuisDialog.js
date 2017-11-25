var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/777ad1e9-cbe8-475b-98a6-d65dfdde35ee?subscription-key=cfca2d569671445e8749b6528940a169&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('LostPassword', function (session, args) {

        session.send('you have forgotten your password, do you want to reset it?')

            // Pulls out the food entity from the session if it exists
            //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

            // Checks if the for entity was found
            //if (foodEntity) {
              //  session.send('Calculating calories in %s...', foodEntity.entity);
               // Here you would call a function to get the foods nutrition information

            //} else {
              //  session.send("No food identified! Please try again");
            //}
    }).triggerAction({
        matches: 'LostPassword'
    });

    bot.dialog('CheckBalance', function (session, args) {
        
                session.send('do you have an online account?')
        
                    // Pulls out the food entity from the session if it exists
                    //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');
        
                    // Checks if the for entity was found
                    //if (foodEntity) {
                      //  session.send('Calculating calories in %s...', foodEntity.entity);
                       // Here you would call a function to get the foods nutrition information
        
                    //} else {
                      //  session.send("No food identified! Please try again");
                    //}
            }).triggerAction({
                matches: 'CheckBalance'
            });

    bot.dialog('BankLocation', function (session, args) {
                
        session.send('Enter your location ?')
                
                            // Pulls out the food entity from the session if it exists
                            //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');
                
                            // Checks if the for entity was found
                            //if (foodEntity) {
                              //  session.send('Calculating calories in %s...', foodEntity.entity);
                               // Here you would call a function to get the foods nutrition information
                
                            //} else {
                              //  session.send("No food identified! Please try again");
                            //}
        }).triggerAction({
                        matches: 'BankLocation'
         });
    bot.dialog('None', function (session, args) {
            
    session.send('Please try again')
            
                        // Pulls out the food entity from the session if it exists
                        //var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');
            
                        // Checks if the for entity was found
                        //if (foodEntity) {
                          //  session.send('Calculating calories in %s...', foodEntity.entity);
                           // Here you would call a function to get the foods nutrition information
            
                        //} else {
                          //  session.send("No food identified! Please try again");
                        //}
    }).triggerAction({
                    matches: 'None'
     });
}