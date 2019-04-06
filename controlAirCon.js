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

while (1) {
  ref.on("child_changed", function(snapshot) {
    var airConStatus = snapshot.val();
    console.log("The air con is now: " + airConStatus.turn_on);
  });
    
    var userRef = admin.database().ref();
    userRef
    .child('airCon')
    .child('turn_on')
    .once('value').then(function(snapshot) {
        var result = snapshot.val();
        return result;

        }
        );
}
