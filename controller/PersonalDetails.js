var rest = require('../API/Restclient');
var builder = require('botbuilder');

exports.displayMobileNumber = function getMobileNumber(session, username){
    var url = 'http://contosobankbott.azurewebsites.net/tables/CustomerInfo';
    rest.getMobileNumber(url, session, username, handleGetMobileNumberResponse)
};

function handleGetMobileNumberResponse(message, session, username) {
    var mobileNumberResponse = JSON.parse(message);
    var allMobile = [];
    var found = false;
    for (var index in mobileNumberResponse) {
        //varname.nameOnColumnTable
        var usernameReceived = mobileNumberResponse[index].username;
        var mobileNumber = mobileNumberResponse[index].Mobile;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            found = true;
            if(mobileNumberResponse.length - 1) {
                allMobile.push(mobileNumber);
            }
            else {
                allMobile.push(mobileNumber + ', ');
            }
        } 
    }  
    if (found){
            session.send("%s, your mobile number is: %s", username, mobileNumber); 
        }
        else {
            session.send("Invalid username, please try again");
        }              
    
}

exports.deleteMobileNumber = function deleteMobileNumber(session,username){
    var url  = 'http://contosobankbott.azurewebsites.net/tables/CustomerInfo';


    rest.getMobileNumber(url,session, username,function(message,session,username){
     var mobileDetails = JSON.parse(message);

        for(var i in mobileDetails) {

            if (mobileDetails[i].username === username) {
                var deletedMobile = mobileDetails[i].Mobile;

                console.log(mobileDetails[i]);

                rest.deleteMobileNumber(url,session,username,deletedMobile, mobileDetails[i].id ,handleDeleteMobileNumberResponse)

            }
        }
    });
};
function handleDeleteMobileNumberResponse(body,session,username, favouriteFood){
    console.log('Done');
}

exports.setMobileNumber = function postMobileNumber(session, username, mobileNumber){
    var url = 'http://contosobankbott.azurewebsites.net/tables/CustomerInfo';
    rest.postMobileNumber(url, username, mobileNumber);
};