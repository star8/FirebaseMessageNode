'use strict';

var gcm = require('node-gcm');
var request = require('request');

var  PRIORITY = {
  NORMAL: "normal",
  HIGH: "high"
}

var message ,messageCreateDeviceGroup,messageRemoveDeviceGroup,messageAddDeviceGroup

var SERVER_KEY 
var SENDER_ID
// Set custom request options
var requestOptions = {}
var requestOptionsDeviceGroup={}
  //proxy: 'http://127.0.0.1:8888',
  
//};


var COLLAPSE_KEY = "collapse_key";
/**
		 * Endpoint for sending messages.
		 */
		var FCM_SEND_ENDPOINT = "https://fcm.googleapis.com/fcm/send";

		/**
		 * Endpoint for create/add/remove device groups.
		 */
		var FCM_DEVICE_GROUP_ENDPOINT = "https://android.googleapis.com/gcm/notification";
		
		/**
		 * User defined collapse-key for collapse parameter. Maximum 4 keys
		 * allowed for single device to use collapse.
		 */
		var COLLAPSE_KEY = "collapse_key";
		
		/**
		 * User defined collapse-key for collapse parameter. Maximum 4 keys
		 * allowed for single device to use collapse.
		 */
		var CONTENT_AVAILABLE = "content_available";

		/**
		 * Parameter for Header content-type.
		 */

		var PARAM_HEADER_CONTENT_TYPE = "Content-Type";

		/**
		 * value for default connection time-Out.
		 */

		var DEFAUTL_CONNECTION_TIMEOUT = 10 * 1000;

		/**
		 * value for default connection time-Out.
		 */

		var DEFAUTL_TIME_TO_LIVE = 4 * 7 * 24 * 60 * 60;

		/**
		 * Parameter value for Header content-type.
		 */

		var HEADER_CONTENT_TYPE_JSON = "application/json";

		/**
		 * Parameter for Header authorization server-key.
		 */

		var PARAM_HEADER_SERVER_KEY = "Authorization";
		/**
		 * Prefix of the topic.
		 */
		var PARAM_REGISTRATION_IDS = "registration_ids";
		/**
		 * Missing registration_id. Sender should always add the registration_id
		 * to the request.
		 */
		var ERROR_MISSING_REGISTRATION = "MissingRegistration";


var sender

var registrationTokens = [];


 exports.initilize = function (json) {

  var notification = {}  

SERVER_KEY  = json.SERVER_KEY
SENDER_ID = json.SENDER_ID

var data = {}


  message = new gcm.Message({
    collapseKey: !json.collapseKey?COLLAPSE_KEY:json.collapseKey ,
    priority: !json.priority?PRIORITY.NORMAL:json.priority,
    contentAvailable: !json.contentAvailable?true:json.contentAvailable,
    delayWhileIdle: !json.delayWhileIdle?false:json.delayWhileIdle,
    timeToLive: !json.timeToLive?DEFAUTL_TIME_TO_LIVE:json.timeToLive,   
    dryRun: !json.dryRun?true:json.dryRun,
   // data: data,
   // notification:notification
});

 message = new gcm.Message({
    collapseKey: !json.collapseKey?COLLAPSE_KEY:json.collapseKey ,
    priority: !json.priority?PRIORITY.NORMAL:json.priority,
    contentAvailable: !json.contentAvailable?true:json.contentAvailable,
    delayWhileIdle: !json.delayWhileIdle?false:json.delayWhileIdle,
    timeToLive: !json.timeToLive?DEFAUTL_TIME_TO_LIVE:json.timeToLive,   
    dryRun: !json.dryRun?true:json.dryRun,
   // data: data,
   // notification:notification
});




if(json.data){

  let keyArr  = Object.keys(json.data),
  dataArr = [];

  for (var i in keyArr) {
    let keyName = keyArr[i]  
    var keyValue = json.data[keyArr[i]]
    var jsonRec = {}
    jsonRec[keyName] = keyValue  
    console.log("keyName =="+keyName )
    console.log("keyValue =="+keyValue )
    message.addData(keyName,keyValue);
    }
}


console.log("message data  == "+JSON.stringify(message.data))

if(json.notification){
  //notification.title=json.notification.title
  //notification.icon=json.notification.icon
  //notification.body=json.notification.body

  // Add notification payload as key value
message.addNotification('title', json.notification.title);
message.addNotification('body', json.notification.body);
message.addNotification('icon', json.notification.icon);
}


if(json.registrationIDs){
  for(var j in json.registrationIDs){
    registrationTokens.push(json.registrationIDs[j])
  }
}

messageCreateDeviceGroup = {
    
  notification_key_name:json.notification_key_name,
  operation:"create",
  registration_ids:registrationTokens

};


messageRemoveDeviceGroup = {
    
  notification_key_name:json.notification_key_name,
  notification_key:"APA91bFMBCG2pVIGWuCYJ-gcynvYBrIHWSbFMkfnS6eKSBsaVMEg1mRzFXm18PAuyZ1snvXraX00tgN_VL4Cm8YMfYkk-NOsJyqeJA56pRxU7AiK2lpOB8w",
  operation:"remove",
  registration_ids:registrationTokens

};



messageAddDeviceGroup = {
    
  notification_key_name:json.notification_key_name,
  operation:"add",
  notification_key:"APA91bFMBCG2pVIGWuCYJ-gcynvYBrIHWSbFMkfnS6eKSBsaVMEg1mRzFXm18PAuyZ1snvXraX00tgN_VL4Cm8YMfYkk-NOsJyqeJA56pRxU7AiK2lpOB8T",
  registration_ids:registrationTokens

};

requestOptionsDeviceGroup ={
  timeout : DEFAUTL_CONNECTION_TIMEOUT,
  url: FCM_DEVICE_GROUP_ENDPOINT,
headers:[
  {
    name: 'accept',
    value: HEADER_CONTENT_TYPE_JSON
  },
  {
    name: 'content-type',
    value: HEADER_CONTENT_TYPE_JSON
  },
  {
    name: PARAM_HEADER_SERVER_KEY,
    value: "key=" + SERVER_KEY
  },
  {
    name: 'project_id',
    value: SENDER_ID
  }
]
}



requestOptions ={
  timeout : DEFAUTL_CONNECTION_TIMEOUT,
  url: FCM_SEND_ENDPOINT,
headers:[
  {
    name: 'content-type',
    value: HEADER_CONTENT_TYPE_JSON
  },
  {
    name: PARAM_HEADER_SERVER_KEY,
    value: "key=" + SERVER_KEY
  }
]
}

console.log("registrationTokens  == "+JSON.stringify(registrationTokens))

  }


  exports.send=function(){
    sender = new gcm.Sender(SERVER_KEY,requestOptions);
    console.log("message  == "+JSON.stringify(message))
    
    sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
      if(err) console.error(err);
      else    console.log(response);
    });
     
  }

  exports.createDeviceGroup=function(){    
    
    console.log("messageCreateDeviceGroup  == "+JSON.stringify(messageCreateDeviceGroup))
    

    request({
      url: FCM_DEVICE_GROUP_ENDPOINT,
      method: 'POST',      
      headers: {
        'content-Type' :HEADER_CONTENT_TYPE_JSON,
        'Authorization': "key=" + SERVER_KEY,
        'accept':HEADER_CONTENT_TYPE_JSON,
        'project_id':SENDER_ID
      },

      
      body: JSON.stringify(messageCreateDeviceGroup)}
    
      
    , function(error, response, body) {
      if (error) { 
        console.error(error, response, body); 
      }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
      }
      else {
        console.log('Done! response = ')
        console.log(JSON.stringify(response))
        return response.notification_key
      }
    });
     
  }
  exports.addDeviceGroup=function(){    
    request({
      url: FCM_DEVICE_GROUP_ENDPOINT,
      method: 'POST',      
      headers: {
        'content-Type' :HEADER_CONTENT_TYPE_JSON,
        'Authorization': "key=" + SERVER_KEY,
        'accept':HEADER_CONTENT_TYPE_JSON,
        'project_id':SENDER_ID
      },

      
      body: JSON.stringify(messageAddDeviceGroup)}
    
      
    , function(error, response, body) {
      if (error) { 
        console.error(error, response, body); 
      }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
      }
      else {
        console.log('Done! response = ')
        
        console.log(JSON.stringify(response))
        return response.notification_key
      }
    });
  }
  exports.removeDeviceGroup=function(){    
    request({
      url: FCM_DEVICE_GROUP_ENDPOINT,
      method: 'POST',      
      headers: {
        'content-Type' :HEADER_CONTENT_TYPE_JSON,
        'Authorization': "key=" + SERVER_KEY,
        'accept':HEADER_CONTENT_TYPE_JSON,
        'project_id':SENDER_ID
      },

      
      body: JSON.stringify(messageRemoveDeviceGroup)}
    
      
    , function(error, response, body) {
      if (error) { 
        console.error(error, response, body); 
      }
      else if (response.statusCode >= 400) { 
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
      }
      else {
        console.log('Done! response = ')
        console.log(JSON.stringify(response))
        return response.notification_key
      }
    });
  }
  
