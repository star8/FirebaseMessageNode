'use strict';


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
  
    
var sender

var registrationTokens = [];


 exports.initilize = function (json) {

  var notification = {}  

SERVER_KEY  = json.SERVER_KEY
SENDER_ID = json.SENDER_ID

var data = {}


  







if(json.notification){
  notification.title=json.notification.title
  notification.icon=json.notification.icon
  notification.body=json.notification.body

}


if(json.registrationIDs){
  for(var j in json.registrationIDs){
    registrationTokens.push(json.registrationIDs[j])
  }
}


message = {  
  priority: !json.priority?PRIORITY.NORMAL:json.priority,
  contentAvailable: !json.contentAvailable?true:json.contentAvailable,
  delay_while_idle: !json.delayWhileIdle?false:json.delayWhileIdle,
  time_to_live: !json.timeToLive?DEFAUTL_TIME_TO_LIVE:json.timeToLive,     
}
if(json.contentAvailable){
  message.content_available = json.contentAvailable
}
if(registrationTokens && registrationTokens.length==1){
  message.to = registrationTokens[0]
}

if(registrationTokens && registrationTokens.length>1){
  message.registration_ids = registrationTokens
}

if(json.data){ 
  message.data = json.data 
}

if(json.notification){ 
  message.notification = json.notification     
}

if(json.collapsible){ 
  message.collapse_key = collapse_key
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


console.log("registrationTokens  == "+JSON.stringify(registrationTokens))

  }


  exports.send=function(){

    console.log("message  == "+JSON.stringify(message))
    
    request({
      url: FCM_SEND_ENDPOINT,
      timeout : DEFAUTL_CONNECTION_TIMEOUT,
      method: 'POST',      
      headers: {
        'content-Type' :HEADER_CONTENT_TYPE_JSON,
        'Authorization': "key=" + SERVER_KEY
        
      },      
      body: JSON.stringify(message)}    
      
    , function(error, response, body) {
      if (error) { 
        console.error(error, response, body); 
      }      
      else {
        //console.log('Done! response = ')
        console.log(JSON.stringify(response))
        //return response.notification_key
      }
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
  
