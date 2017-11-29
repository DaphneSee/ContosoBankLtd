var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.displayWelcomeCards = function displayWelcomeCards(session) {
    var msg = new builder.Message(session)
    .text("Here are some suggestions to help you:")
	.suggestedActions(
		builder.SuggestedActions.create(
				session, [
					builder.CardAction.imBack(session, "qna", "help"),
					builder.CardAction.imBack(session, "getmobileNumber", "check mobile number"),
					builder.CardAction.imBack(session, "banks in auckland", "bank stores in Auckland")
				]
			));
session.send(msg);
};