# vagrant-rabbitmq-cluster
a vagrant virtual machine to run rabbitmq cluster on asingle server

## Run in Vagrant Virtual Machine

1. Install VirtualBox
2. Install (VagrantUp)[http://www.vagrantup.com/]
3. Clone (this repo)[github.com/jnyryan/vagrant-rabbitmq-cluster.git]
4. run ```vagrant up```

## Usage

  Browse to http://localhost:15672

    RABBITMQ_NODE_PORT=5673 RABBITMQ_SERVER_START_ARGS="-rabbitmq_management listener [{port,15673}]" RABBITMQ_NODENAME=hare rabbitmq-server -detached
    rabbitmqctl -n hare status
    rabbitmqctl -n hare stop_app
    rabbitmqctl -n hare reset
    rabbitmqctl -n hare join_cluster rabbit@`hostname -s`
    rabbitmqctl -n hare change_cluster_node_type disc
    rabbitmqctl -n hare start_app
    rabbitmqctl cluster_status

## References
[https://www.rabbitmq.com/clustering.html](https://www.rabbitmq.com/clustering.html)

[https://bunnyamqp.wordpress.com/2012/12/13/rabbitmq-create-a-cluster-on-a-single-machine/](https://bunnyamqp.wordpress.com/2012/12/13/rabbitmq-create-a-cluster-on-a-single-machine/)
