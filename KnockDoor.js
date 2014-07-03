var da = require("DoorAlarm");
var Gmailer = require("gmail-sender");
var net = require('net');
var lc = require('linino-components');
var doorClose=false; // start with Door open
var dl;



var client = net.connect({port: 5555},
		function() { //'connect' listener
	console.log('client connected');
});

client.on('data', function(data) {
	console.log(data.toString());
});
client.on('end', function() {
	console.log('client disconnected');
});



//any options can be set here...
Gmailer.options({
	smtp: {
		service: "Gmail",
		user: "famsmkk@gmail.com",
		pass: "FamigliaFelice"
	}
});
var buttons = [['1','3','2'],['4','6','5'],['7','9','8'],['*','#','0']];

var alarm={
		"keys": {
			"Row1":11,
			"Row2":10,
			"Row3":9,
			"Col4":8,
			"Col3":5,
			"Col2":4,
			"Col1":2,
			"keys": buttons,
			"buttonHoldTime":100,
			"ScanCompleted":200,
			"feedBack":13},
			"sound":6,
			"alarmRetry":3
};

var switchConf={
		"pinAlimentation":3,
		"pinDetect":'A0',
		"delayDetection":1000,
		"threshold":100
};

var dimmerLight ={
		"sensor":'A1',
		"zeroX":11,
		"light":{
			'pin':13,
			'luxMin':1,
			'luxMax':255
		},
		"modal":'invert'
};

var debug=true;
var door = new da(false, alarm, switchConf);
var dl   = new lc.PwmAnlControlled(debug);

//to be use when there is no linino
//setInterval(function(){door.detectCode('1');}, 1000);  
door.startAlarm();
door.on('Alarm', function(){
	console.log('ALARM!!!!!!!!!');
	client.write('ALARM!!!!!!!!!');
	Gmailer.send({
		subject: "ALARM Mail",
		template: "./assets/templates/demo.html",
		from: "'Gmail Sender'",
		to: {
			email: "fontami1@gmail.com",
			name: "Michele",
			surname: "Fontanella"
		},
		data: {
			name: "Michele",
			surname: "Fontanella",
			id: "28329m82198j"
		},
		attachments: [
		              {
		            	  fileName: "Alarm_0.tar",
		            	  filePath: "/opt/DoorAlarm/Alarm-0.tar",
		            	  cid: "html5@demo"
		              }
		              ]
	});
});

door.on('Warning', function(){
	console.log('Warning!!!!!!!!!');
	Gmailer.send({
		subject: "Warning Mail",
		template: "./assets/templates/Warning.html",
		from: "'Gmail Sender'",
		to: {
			email: "fontami1@gmail.com",
			name: "Michele",
			surname: "Fontanella"
		},
		data: {
			name: "Michele",
			surname: "Fontanella",
			id: "28329m82198j"
		},
		attachments: [
		              {
		            	  fileName: "Alarm_0.zip",
		            	  filePath: "/opt/DoorAlarm/Alarm_0.zip",
		            	  cid: "html5@demo"
		              }
		              ]
	});
});

door.on("BoardReady", function(){
	dl = new lc.PwmAnlControlled(debug);
	dl.configure(dimmerLight);
	doorClose = !doorClose;
	dl.enableDimmer(doorClose);
});

door.on('Good', function(){
	console.log('GOOD CODE!!!!!!!!!');
	doorClose = !doorClose;
	console.log('spedisco un ', doorClose);
	dl.enableDimmer(doorClose);
});

door.on('Retry', function(){
	console.log('Wrong button Retry');
});
