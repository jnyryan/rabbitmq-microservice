#!/bin/bash

####################
# Prerequisites
apt-get update
apt-get install -y make curl git

#####################
# Install RabbitMQ

cp /vagrant/etc/rabbitmq-signing-key-public.asc /tmp/rabbitmq-signing-key-public.asc
apt-key add /tmp/rabbitmq-signing-key-public.asc

echo "deb http://www.rabbitmq.com/debian/ testing main" > /etc/apt/sources.list.d/rabbitmq.list
apt-get -qq update > /dev/null
apt-get -qq -y install rabbitmq-server > /dev/null
/usr/sbin/rabbitmq-plugins enable rabbitmq_management rabbitmq_management_agent rabbitmq_management_visualiser
# rabbitmq_mqtt rabbitmq_stomp rabbitmq_management  rabbitmq_management_agent rabbitmq_management_visualiser rabbitmq_federation rabbitmq_federation_management sockjs

echo "[{rabbit, [{loopback_users, []}]}]." > /etc/rabbitmq/rabbitmq.config

/etc/init.d/rabbitmq-server restart

exit

RABBITMQ_NODE_PORT=5672 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15672}]" RABBITMQ_NODENAME=rabbitking rabbitmq-server -detached
RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=rabbitpawn rabbitmq-server -detached

rabbitmqctl -n rabbitpawn stop_app
rabbitmqctl -n rabbitpawn join_cluster rabbitking@`hostname -s`
rabbitmqctl -n rabbitpawn start_app
