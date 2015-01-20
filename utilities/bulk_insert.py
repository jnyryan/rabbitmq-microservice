#!/usr/bin/env python
import pika
import sys

credentials = pika.PlainCredentials('guest', 'guest')
parameters = pika.ConnectionParameters('localhost',
                                       55672,
                                       '/',
                                       credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()

num_messages = sys.argv[1] if len(sys.argv) > 1 else '100'
exchange = sys.argv[2] if len(sys.argv) > 2 else 'amq.topic'
routing_key = sys.argv[3] if len(sys.argv) > 3 else 'test'
message = ' '.join(sys.argv[4:]) or 'Hello World!'

channel.exchange_declare(exchange=exchange, type='topic', durable='true')

for num in range(0,int(num_messages)):
    channel.basic_publish(exchange=exchange,
                          routing_key=routing_key,
                          body=message + " " + str(num))

    print " [x] Sent %r:%r:%r" % (exchange, routing_key, message + " " + str(num))

connection.close()
