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

var exchangeOptions = { durable : true, autoDelete : false, exclusive: false  };
var queueOptions = { durable : true, autoDelete : false, exclusive: false, arguments : {"x-ha-policy": "all"} };
var publishOptions = { contentType : "text/plain", contentEncoding : "text/plain" };

conn
  .queue('dispatchmanager.new.dispatch', queueOptions)
  .bind('dispatch', 'new')
  .subscribe(function(message, headers, deliveryInfo, rawMessage, queue) {
    console.log("Processing new Dispatch");

    conn
      .exchange('email', exchangeOptions)
      .publish('new', '{message:"ORDER DISPATCHED"}', publishOptions);

    conn
      .exchange('store', exchangeOptions)
      .publish('remove', '{message:"Product Removed"}', publishOptions);

  });

conn
  .queue('dispatchmanager.cancelled.dispatch', queueOptions)
  .bind('dispatch', 'cancelled')
  .subscribe(function(message, headers, deliveryInfo, rawMessage, queue) {
    console.log("Processing Cancelled Dispatch");

    conn
      .exchange('email', exchangeOptions)
      .publish('new', '{message:"ORDER DISPATCH RECEIVED"}', publishOptions);

    conn
      .exchange('store', exchangeOptions)
      .publish('unreserve', '{message:"Product Unreserved"}', publishOptions);

  });
