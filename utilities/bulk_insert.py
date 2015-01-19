#!/usr/bin/env python
import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='order', type='topic', durable='true')

num_messages = sys.argv[1] if len(sys.argv) > 1 else '100'
routing_key = sys.argv[2] if len(sys.argv) > 2 else 'anonymous.info'
message = ' '.join(sys.argv[3:]) or 'Hello World!'

for num in range(0,int(num_messages)):
    channel.basic_publish(exchange='order',
                          routing_key=routing_key,
                          body=message + " " + str(num))

    print " [x] Sent %r:%r" % (routing_key, message + " " + str(num))

connection.close()
