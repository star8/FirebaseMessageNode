
var firebaseMsg = require('./index.js')

firebaseMsg.initilize({SERVER_KEY:'AIzaSyDZGXzG1u3nSvCXpcCXJLEnwGkYWpkG3uc',SENDER_ID:'582092791978',collapseKey: 'demo',
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,

notification: {
	title: "Dummy Title",
	icon: "test icon ",
	body: "This is a notification that will be displayed if your app is in the background."
},
data: {
	key1: 'message1',
	key2: 'message2'
},
registrationIDs:['c-dHuLZ0yRI:APA91bFGllyyYCfgE_948duZGnYOPTiAm3WImxKpTxDFsLIMJlIzW4-A9JplMa3CwQCDX-tUDC2qBVh1L2SSH3GUjlGhdVBkF5j7LWQYSAKiWCVmwTqlY0zZJsmhFw90BbwaonfjGuw3']
,
notification_key_name:"1234_3"
}
)


firebaseMsg.send();

//var notification_key = firebaseMsg.createDeviceGroup();

//firebaseMsg.removeDeviceGroup()

//firebaseMsg.addDeviceGroup()





	


