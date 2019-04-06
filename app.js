
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

function updateFirebase(temp,humid) {
  admin.database().ref('dht22').set({
    humi: humid,
    temp: temp,
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
    //sleep(10000);
  //main();
}

var start = Date.now()

while (1){
    if ( (Date.now() - start) > 5000){
    console.log(Date.now() - start)
    start = Date.now();
    main();
  }
}


	

