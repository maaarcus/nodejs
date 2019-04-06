const http = require('http');

let {PythonShell} = require('python-shell')
var admin = require("firebase-admin");

var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],
    scriptPath: '/home/marcus/',
    args: ['22','22']
};

var serviceAccount = require("/home/marcus/myNode/nodejs/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tbhapp-3c45e.firebaseio.com"
});

console.log("HiHIHI");

var ref = admin.database().ref("airCon");


function getData(){
    ref.on("child_changed", function(snapshot) {
    var airConStatus = snapshot.val();
    console.log("The air con is now: " + airConStatus.turn_on);
  });
}
async function checkForChanges(){
    await 
}

ref.on("child_changed", function(snapshot) {
var airConStatus = snapshot.val();
console.log("The air con is now: " + airConStatus.turn_on);
});
