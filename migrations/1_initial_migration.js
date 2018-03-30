var Migrations = artifacts.require("./Migrations.sol");
const Web3 = require('web3');
const TruffleConfig = require('../truffle');

module.exports = function(deployer, network, accounts) {
  if (network == "privateChain") {
    const config = TruffleConfig.networks[network];
    const web3 = new Web3(new Web3.providers.HttpProvider('http://' + config.host + ':' + config.port));
    web3.eth.personal.unlockAccount(accounts[0], 'jason', 36000); // Not good for showing password
  }
  deployer.deploy(Migrations, {"from" : accounts[0]});
};
