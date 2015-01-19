var cron = require('cron');
var easyamqp = require('easy-amqp');

var conn = easyamqp.createConnection(
  {
    host: 'localhost',
    port: 5672,
    login: 'guest',
    password: 'guest',
    vhost: '/',
    clientProperties: { applicationName: 'myApplication'}
  },
  {
    defaultExchangeName: "amq.topic"
  }
);

var exchangeOptions = { durable : true, autoDelete : false, exclusive: false  };
var queueOptions = { durable : true, autoDelete : false, exclusive: false, arguments : {"x-ha-policy": "all"} };
var publishOptions = publishOptions;

conn
  .queue('ordermanager.new.order', queueOptions)
  .bind('order', 'new')
  .subscribe(function(message, headers, deliveryInfo, rawMessage, queue) {
    console.log("Processing New Order");
    conn
      .exchange('dispatch', exchangeOptions)
      .publish('new', message, publishOptions)

    conn
      .exchange('email', exchangeOptions)
      .publish('new', '{message:"ORDER RECEIVED"}', publishOptions)

    conn
      .exchange('store', exchangeOptions)
      .publish('reserve', '{message:"Product Reserved"}', publishOptions)
  });

conn
  .queue('ordermanager.cancelled.order', queueOptions)
  .bind('order', 'cancel')
  .subscribe(function(message, headers, deliveryInfo, rawMessage, queue) {
    console.log("Processing Cancelled Order");
    conn
      .exchange('dispatch', exchangeOptions)
      .publish('cancelled', message, publishOptions)

    conn
      .exchange('email', exchangeOptions)
      .publish('new', '{message:"ORDER CANCELATION RECEIVED"}', publishOptions)

    conn
      .exchange('store', exchangeOptions)
      .publish('unreserve', '{message:"Product Unreserved"}', publishOptions)
  });
