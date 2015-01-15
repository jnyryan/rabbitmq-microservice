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


RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=rabbitnode2 rabbitmq-server -detached
rabbitmqctl -n rabbitnode2 status
rabbitmqctl -n rabbitnode2 stop_app
rabbitmqctl -n rabbitnode2 reset
rabbitmqctl -n rabbitnode2 join_cluster rabbit@`hostname -s`
rabbitmqctl -n rabbitnode2 change_cluster_node_type disc
rabbitmqctl -n rabbitnode2 start_app

RABBITMQ_NODE_PORT=5674 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15674}]" RABBITMQ_NODENAME=rabbitnode3 rabbitmq-server -detached
rabbitmqctl -n rabbitnode3 status
rabbitmqctl -n rabbitnode3 stop_app
rabbitmqctl -n rabbitnode3 reset
rabbitmqctl -n rabbitnode3 join_cluster rabbit@`hostname -s`
rabbitmqctl -n rabbitnode3 change_cluster_node_type ram
rabbitmqctl -n rabbitnode3 start_app

RABBITMQ_NODE_PORT=5675 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15675}]" RABBITMQ_NODENAME=rabbitnode4 rabbitmq-server -detached
rabbitmqctl -n rabbitnode4 status
rabbitmqctl -n rabbitnode4 stop_app
rabbitmqctl -n rabbitnode4 reset
rabbitmqctl -n rabbitnode4 join_cluster rabbit@`hostname -s`
rabbitmqctl -n rabbitnode4 change_cluster_node_type ram
rabbitmqctl -n rabbitnode4 start_app
rabbitmqctl cluster_status
