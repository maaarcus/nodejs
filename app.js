const http = require('http');

var admin = require("firebase-admin");

var serviceAccount = require("/Users/kinminglaw/IdeaProjects/nodejs/serviceAccountKey.json");

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

function getData(){
    var userRef = admin.database().ref();
    userRef
    .child('accounts')
    .child('Ml5hBpV2UGUQzVDQOsnyPlACIJi2')
    .child('mountains')
    .child('-LFa8sNQZB3DceyaJZ_z')
    .child('name')
    .once('value').then(function(snapshot) {
        var result = snapshot.val();

        return result;

        }
        );

}
//admin.database.enableLogging(true);

const hostname = '127.0.0.1';
const port = 3000;
var result = getData();
getData();

admin.database().ref().on('child_changed', (snapshot) => {
     console.log('user was changed !!' );
});
