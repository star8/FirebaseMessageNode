# FirebaseMessageNode

A node module to help you send downstream message to a client.
Installation
 npm install @star8/firebase-message-node  --save
Sample usage
To send message synchronously
1.	send notification

firebaseMsg.initilize({SERVER_KEY:' YOUR_SERVER_KEY ',SENDER_ID:'YOUR_SENDER_ID',collapsible: false,
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,

notification: {
	title: "Dummy Title",
	icon: "test icon ",
	body: "This is a notification that will be displayed if your app is in the background."
},
registrationIDs:[ user_registration_token']
}
)


firebaseMsg.send();
FirebaseMessage.intialize("YOUR_SERVER_KEY").to("user_registration_token")
.notification(Notification.body("MSG_BODY").title("MSG_TITLE").send();

2.	Send message

FirebaseMessage.intialize("YOUR_SERVER_KEY").to("user_registration_token")
.data(Data.add("KEY1", "VALUE1").add("KEY2", "VALUE2")).send();


firebaseMsg.initilize({SERVER_KEY:' YOUR_SERVER_KEY ',SENDER_ID:'YOUR_SENDER_ID',collapsible: false,
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,
data{
"KEY1": "VALUE1",
"KEY2": "VALUE2"
},
registrationIDs:[ user_registration_token']
}
)
firebaseMsg.send();
3.Send message & notification

firebaseMsg.initilize({SERVER_KEY:' YOUR_SERVER_KEY ',SENDER_ID:'YOUR_SENDER_ID',collapsible: false,
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,
notification: {
	title: "Dummy Title",
	icon: "test icon ",
	body: "This is a notification that will be displayed if your app is in the background."
},
data{
"KEY1": "VALUE1",
"KEY2": "VALUE2"
},
registrationIDs:[ user_registration_token']
}
)
firebaseMsg.send();
To create Group of devices for single user having multiple devices

1.Create Group of Devices


firebaseMsg.initilize({SERVER_KEY:' YOUR_SERVER_KEY ',SENDER_ID:'YOUR_SENDER_ID',collapsible: false,
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,
registrationIDs:[ user_registration_token'],
notification_key_name:"1234_3"
}
)
var notification_key = firebaseMsg.createDeviceGroup();

2. Add device in Group

firebaseMsg.initilize({SERVER_KEY:' YOUR_SERVER_KEY ',SENDER_ID:'YOUR_SENDER_ID',collapsible: false,
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,
registrationIDs:[ user_registration_token'],
notification_key_name:"1234_3"
notification_key:notification_key//this key is  as ontained in step Create Group of Devices above 

}
)
firebaseMsg.addDeviceGroup();

3. Delete device from Group

firebaseMsg.initilize({SERVER_KEY:' YOUR_SERVER_KEY ',SENDER_ID:'YOUR_SENDER_ID',collapsible: false,
priority: 'high',contentAvailable: true,delayWhileIdle: true,timeToLive: 3,dryRun: false,
registrationIDs:[ user_registration_token'],
notification_key_name:"1234_3"
notification_key:notification_key//this key is  as ontained in step Create Group of Devices above 

}
)
firebaseMsg.removeDeviceGroup();

License
Copyright (C) 2018 Star labs.
Licensed under the Apache License, Version 2.0 (the "License"), you may not use this file except in compliance with the License. You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.



