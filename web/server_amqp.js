var amqp = require('amqp');
var cron = require('cron');

var connection = amqp.createConnection(
  {
    url:"amqp://guest:guest@localhost"
  },
  {
    clientProperties: {
      applicationName: 'notify-microservice',
      capabilities: { consumer_cancel_notify: true}
    },
    defaultExchangeName: '',
    reconnect: true,
    reconnectBackoffStrategy: 'linear',
    reconnectExponentialLimit: 120000,
    reconnectBackoffTime: 1000
  }
);

var exchange = connection.exchange('notification');

var cronJobPub = cron.job("*/1  * * * * *", function(){
  // perform operation e.g. GET request http.get() etc.
  console.info('cron job completed');
  publishTestNotification();
});
cronJobPub.start();

var publishTestNotification = function(){
  var msg='{"message":"This is a test message"}';
  connection.publish('ms.notification', msg);
  console.log(msg);
}

connection.on('ready', function () {
  console.log('Attaching to queue');
  return;
  var q = connection.queue('ms.notification',
    { autoDelete: false, durable: true, exclusive: false }
  );

  var ctag;
  q.subscribe(function (message) {
    console.log(message);
  })
  .addCallback(function(ok) { ctag = ok.consumerTag; });
  //q.unsubscribe(ctag);
});
