# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.provision "shell", path: "VagrantProvision.sh"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 4369, host: 4369#,   auto_correct: true
  config.vm.network :forwarded_port, guest: 5672, host: 5672#,   auto_correct: true
  config.vm.network :forwarded_port, guest: 5673, host: 5673#,   auto_correct: true
  config.vm.network :forwarded_port, guest: 5674, host: 5674#,   auto_correct: true
  config.vm.network :forwarded_port, guest: 5675, host: 5675#,   auto_correct: true
  config.vm.network :forwarded_port, guest: 15672, host: 15672#, auto_correct: true
  config.vm.network :forwarded_port, guest: 15673, host: 15673#, auto_correct: true
  config.vm.network :forwarded_port, guest: 15674, host: 15674#, auto_correct: true
  config.vm.network :forwarded_port, guest: 15675, host: 15675#, auto_correct: true

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider :virtualbox do |vb|
  #   # Don't boot with headless mode
  #   vb.gui = true

    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", "2048"]
  end
  #
  # View the documentation for the provider you're using for more
  # information on available options.

end
