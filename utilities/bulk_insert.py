#!/usr/bin/env python
import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='notification.bulk', type='topic', durable='true')

routing_key = sys.argv[1] if len(sys.argv) > 1 else 'anonymous.info'
message = ' '.join(sys.argv[2:]) or 'Hello World!'

for num in range(0,10000):
    channel.basic_publish(exchange='notification.bulk',
                          routing_key=routing_key,
                          body=message)
                          
print " [x] Sent %r:%r" % (routing_key, message)
connection.close()
