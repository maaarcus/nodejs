const http = require('http');
const shell = require('shelljs');

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output

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


function endBlink() { //function to stop blinking
  LED.writeSync(1); // Turn LED off
}

ref.on("value", function(snapshot) {
  console.log(snapshot.val());
  LED.writeSync(0);
  setTimeout(endBlink, 500);
  var command = snapshot.val().command
  if ( command == "cool_24"){
    shell.exec('irsend SEND_ONCE gree cool_24')
  } else if ( command == "off" ) {
    shell.exec('irsend SEND_ONCE gree off')
  } else if ( command == "dry_25" ) {
      shell.exec('irsend SEND_ONCE gree dry_25')
  } else if ( command == "cool_25_fan1" ) {
      shell.exec('irsend SEND_ONCE gree cool_25_fan1')
  } else if ( command == "cool_25_fan2" ) {
      shell.exec('irsend SEND_ONCE gree cool_25_fan2')
  }
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
