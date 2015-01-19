var cron = require('cron');
var easyamqp = require('easy-amqp');

var conn = easyamqp.createConnection(
  {
    host: 'localhost',
    port: 5672,
    login: 'guest',
    password: 'guest',
    vhost: '/'
  },
  {
    defaultExchangeName: "amq.topic"
  }
);

conn
  .queue('ms.notification', { durable : true, autoDelete : false, exclusive: false  })
  .bind('notification', '#')
  .subscribe(function(message, headers, deliveryInfo, rawMessage, queue) {
    console.log(message)
  });

var cronJobPub = cron.job("*/1  * * * * *", function(){
    conn
    .exchange('notification', { durable : true, autoDelete : false, exclusive: false })
    .publish('alert', 'This is an alert generated every second', { contentType : "text/plain", contentEncoding : "text/plain" })
  });
cronJobPub.start();

var bulkExchange = conn.exchange('notification.bulk', { durable : true, autoDelete : false, exclusive: false });
var bulkQueue = conn
  .queue('ms.notification.bulk', { durable : true, autoDelete : false, exclusive: false  })
  .bind('notification.bulk', '#')
  .subscribe(function(message, headers, deliveryInfo, rawMessage, queue) {
    console.log(message)
  });

var cronJobPubBulk = cron.job("*/1  * * * * *", function(){
    for(var i = 0; i<10000; i++){
      bulkExchange.publish('alert', 'Bulk message ' + i, { contentType : "text/plain", contentEncoding : "text/plain" })
    }
  });
cronJobPubBulk.start();
