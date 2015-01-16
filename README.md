# vagrant-microservice

a vagrant virtual machine to run rabbitmq cluster on a single server hosting node.js micro-services.

Admittedly this is not a very realistic situation but it does serve as a good tool
to demonstrate how clustering works and how multiple instances of nodejs (micro) services can be used to scale out.

## Run in Vagrant Virtual Machine

1. Install VirtualBox
2. Install (VagrantUp)[http://www.vagrantup.com/]
3. Clone (this repo)[github.com/jnyryan/vagrant-rabbitmq-cluster.git]
4. run ```vagrant up```

## Usage

  Browse to http://localhost:15672

## Under the hood

The [VagrantProvision](VagrantProvision.sh) script does all the work to get this
cluster up and running. Here I will go through the main points of the script and highlight what i think is important.

Note: This is all on Ubuntu Linux, but the principle is the same on windows/osx

### Server Setup

TBD

### Clustering the RabbitMQ

Setting up clustering on a single box is easy. Here we set up 4 nodes.

```bash
RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=rabbitnode2 rabbitmq-server -detached
rabbitmqctl -n rabbitnode2 status
rabbitmqctl -n rabbitnode2 stop_app
rabbitmqctl -n rabbitnode2 reset
rabbitmqctl -n rabbitnode2 join_cluster rabbit@`hostname -s`
rabbitmqctl -n rabbitnode2 change_cluster_node_type disc
rabbitmqctl -n rabbitnode2 start_app
```

### NodeJS Services

TBD

### Python Bulk Inserter

This is unnecessary but a nice easy way to dump loads of messages on the exchange.

```bash
python bulk_insert.py "routing-key" "my message"
```


## References

[https://www.rabbitmq.com/clustering.html](https://www.rabbitmq.com/clustering.html)

[https://bunnyamqp.wordpress.com/2012/12/13/rabbitmq-create-a-cluster-on-a-single-machine/](https://bunnyamqp.wordpress.com/2012/12/13/rabbitmq-create-a-cluster-on-a-single-machine/)

[https://www.npmjs.com/package/easy-amqp](https://www.npmjs.com/package/easy-amqp)
