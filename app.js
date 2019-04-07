
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

function updateFirebase(temp,humid) {
  admin.database().ref('dht22').set({
    humi: humid,
    temp: temp,
    last_update: getDateTime(),
  });
}

function getData(){
    var userRef = admin.database().ref();
    userRef
    .child('dht22')
    .child('temp')
    .once('value').then(function(snapshot) {
        var result = snapshot.val();
        return result;

        }
        );

}
//admin.database.enableLogging(true);

const hostname = '127.0.0.1';
const port = 3000;
//var result = getData();
//getData();


//admin.database().ref().on('child_changed', (snapshot) => {
//     console.log('user was changed !!' );
//});

function getTempHumid(){
	return new Promise(function(resolve, reject) {
	PythonShell.run('AdafruitDHT.py', options, function (err, results) {
  		if (err) {
			reject(err);
		} else {
			resolve(results);
		}
	});
	});
}

function extractTemp(data){
	return data.substring(data.indexOf(":")+1,data.lastIndexOf("*"));
}


function extractHumid(data){
        return data.substring(data.lastIndexOf(":")+1,data.lastIndexOf("%"));
}


async function main() {
  console.log('calling');
  var result = await getTempHumid();
  console.log(result);
  console.log(extractTemp(result.toString()) + '===' + extractHumid(result.toString()));
  updateFirebase(extractTemp(result.toString()),extractHumid(result.toString()));
  sleep(10000);
  main();
}


main();
	

