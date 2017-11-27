var rest = require('../API/Restclient');

exports.displayMobileNumber = function getMobileNumber(session, username){
    var url = 'https://bankbotcontoso.azurewebsites.net/tables/bankBotInfo';
    rest.getMobileNumber(url, session, username, handleGetMobileNumberResponse)
};

function handleGetMobileNumberResponse(message, session, username) {
    var mobileNumberResponse = JSON.parse(message);
    var allMobile = [];
    for (var index in mobileNumberResponse) {
        //varname.nameOnColumnTable
        var usernameReceived = mobileNumberResponse[index].username;
        var mobileNumber = mobileNumberResponse[index].Mobile;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(mobileNumberResponse.length - 1) {
                allMobile.push(mobileNumber);
            }
            else {
                allMobile.push(mobileNumber + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your mobile number is: %s", username, mobileNumber);                
    
}

exports.deleteMobileNumber = function deleteMobileNumber(session,username){
    var url  = 'https://bankbotcontoso.azurewebsites.net/tables/bankBotInfo';


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
    var url = 'https://bankbotcontoso.azurewebsites.net/tables/bankBotInfo';
    rest.postMobileNumber(url, username, mobileNumber);
};