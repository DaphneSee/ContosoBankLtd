var request = require('request');
var builder = require('botbuilder');
//calls currency converter
//exports.displayCurrencyInfo = function getCurrencyInfo(currency1, currency2, session){
//    var url ='https://api.fixer.io/latest?symbols='+ currency1 + ',' + currency2;

//    rest.getCurrencyData(url,session,displayCurrencyInfo);
//}

exports.displayCurrencyCards= function currencyConvertPlease(session) {
    //var attachment = [];
    //var currency = JSON.parse(message);
    var msg = new builder.Message(session)
    .addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            type: "AdaptiveCard",
               body: [
                    {
                        "type": "Input.ChoiceSet",
                        "id": "currency1",
                        "style":"compact",
                        "choices": [
                            {
                                "title": "New Zealand Dollar",
                                "value": "NZD",
                                "isSelected": true
                            },
                            {
                                "title": "Australian Dollar",
                                "value": "AUD"
                            },
                            {
                                "title": "United States Dollar",
                                "value": "USD"
                            }
                        ]
                    },
                    {
                        "type": "Input.ChoiceSet",
                        "id": "currency2",
                        "style":"compact",
                        "choices": [
                            {
                                "title": "New Zealand Dollar",
                                "value": "NZD",
                                "isSelected": true
                            },
                            {
                                "title": "Australian Dollar",
                                "value": "AUD"
                            },
                            {
                                "title": "United States Dollar",
                                "value": "USD"
                            }
                        ]

                    }

                ]
        }
    });
    session.send(msg);
}