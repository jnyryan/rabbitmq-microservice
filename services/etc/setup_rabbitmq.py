#!/usr/bin/env python
import pika
import sys

client_params = {"x-ha-policy": "all"}

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='test', type='topic', durable='true')
channel.queue_declare(queue='all.test', passive=False, durable=True, exclusive=False, auto_delete=False, nowait=False, arguments=None)
channel.queue_bind('all.test', 'test', routing_key='#', nowait=False, arguments=None)

channel.exchange_declare(exchange='order', type='topic', durable='true')
channel.exchange_declare(exchange='dispatch', type='topic', durable='true')

channel.exchange_declare(exchange='email', type='topic', durable='true')
channel.queue_declare(queue='emailmanager.all.email', passive=False, durable=True, exclusive=False, auto_delete=False, nowait=False, arguments=client_params)
channel.queue_bind('emailmanager.all.email', 'email', routing_key='#', nowait=False, arguments=None)

channel.exchange_declare(exchange='store', type='topic', durable='true')
channel.queue_declare(queue='storemanager.reserve.store', passive=False, durable=True, exclusive=False, auto_delete=False, nowait=False, arguments=client_params)
channel.queue_bind('storemanager.reserve.store', 'store', routing_key='reserve', nowait=False, arguments=None)
channel.queue_declare(queue='storemanager.unreserve.store', passive=False, durable=True, exclusive=False, auto_delete=False, nowait=False, arguments=client_params)
channel.queue_bind('storemanager.unreserve.store', 'store', routing_key='unreserve', nowait=False, arguments=None)
channel.queue_declare(queue='storemanager.insert.store', passive=False, durable=True, exclusive=False, auto_delete=False, nowait=False, arguments=client_params)
channel.queue_bind('storemanager.insert.store', 'store', routing_key='insert', nowait=False, arguments=None)
channel.queue_declare(queue='storemanager.remove.store', passive=False, durable=True, exclusive=False, auto_delete=False, nowait=False, arguments=client_params)
channel.queue_bind('storemanager.remove.store', 'store', routing_key='remove', nowait=False, arguments=None)


#channel.basic_publish(exchange='order', routing_key="SetUp", body="SetUp Message", properties=BasicProperties(content_type="text/plain", delivery_mode=1))
#channel.basic_publish(exchange='dispatch', routing_key="SetUp", body="SetUp Message", properties=BasicProperties(content_type="text/plain", delivery_mode=1))

connection.close()
