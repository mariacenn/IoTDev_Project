//const send = require('gmail-send')({
//	user: 'm.cennerazzo@gmail.com',
//	pass: '***',
//	to: 'm.cennerazzo@gmail.com',
//	subject: 'alert',
//});
var Gpio = require('onoff').Gpio,
buzzer = new Gpio(18, 'out'),
pir = new Gpio(17, 'in', 'both');
pir.watch(function(err, value) {
if (err) exit();
buzzer.writeSync(value);
console.log('Motion detected');
if(value == 1)  require('gmail-send')({
        user: 'm.cennerazzo@gmail.com',
        pass: '***',
        to: 'm.cennerazzo@gmail.com',
        subject: 'alert',
});


var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com');

client.on('connect', function () {
  //client.subscribe('securitytest');
  client.publish('yoo/alert', 'Intruder detected');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});



});
console.log('Alarm program deployed successfully!');
console.log('Motion sensor is detecting...');



function exit() {
buzzer.unexport();
pir.unexport();
process.exit();
}
