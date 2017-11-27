var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayBankLocationCards = function getBankLocationData(bank, location, session){
    var url ='https://api.yelp.com/v3/businesses/search?term='+bank+'&location='+location +',New Zealand' + '&limit=5';
    var auth ='ws1vr3jipli7HbgpbYhTr6zfBmxVQHi8g-EMmu0YyAZPAu-BHYLWuZzk9BMC4iMu3LBAkuI5Em3j8kKWG5mXIOcPix3PM7Tz5qJdmtb9uz_ePl-2D6aBdubFmKcaWnYx';
    rest.getYelpData(url,auth,session,displayBankLocationCards);
}

function displayBankLocationCards(message, session) {
    var attachment = [];
    var bankStores = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    for (var index in bankStores.businesses) {
        var bankStore = bankStores.businesses[index];
        var name = bankStore.name;
        var imageURL = bankStore.image_url;
        var url = bankStore.url;
        var address = bankStore.location.address1 + ", " + bankStore.location.city;

        var card = new builder.HeroCard(session)
            .title(name)
            .text(address)
            .images([
                builder.CardImage.create(session, imageURL)])
            .buttons([
                builder.CardAction.openUrl(session, url, 'More Information')
            ]);
        attachment.push(card);

    }

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message);
}