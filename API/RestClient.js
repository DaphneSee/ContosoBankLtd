var request = require( 'request')

exports.getYelpData = function getData(url,bearer,session, callback){
    //error records error. 
    request.get(url,{'auth': { 'bearer': bearer}} ,function process(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body,session);
        }
    });
};
exports.getCurrencyData = function getData(url,session, callback){
        request.get(url, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body,session);
            }
        });
    };
exports.getMobileNumber = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetRequest(err,res,body){
        if(err){
            console.log(err);
        }else {
            //in js, you can't return, so we have callback to get it.
            callback(body, session, username);
        }
    });
};
//have to use exports when we use the function in other files.
exports.postMobileNumber = function sentData(url, username, mobileNumber){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "Mobile" : mobileNumber
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};
//delete mobile number
exports.deleteMobileNumber = function deleteData(url,session, username ,favouriteFood, id, callback){
    var options = {
        //need id to delete
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,username, favouriteFood);
        }else {
            console.log(err);
            console.log(res);
        }
    })

};
//QnA
exports.postQnAResults = function getData(url, session, question, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'd56629dcd95047f485fec732164014f6',
            'Content-Type':'application/json'
        },
        json: {
            "question" : question
        }
      };
  
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body, session, question);
        }
        else{
            console.log(error);
        }
      });
  };