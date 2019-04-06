const http = require('http');
const shell = require('shelljs');

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



ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  shell.exec(' ~/MarcusWork/turn_on_aircon.sh')
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
