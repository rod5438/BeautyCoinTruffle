var BeautyCoin = artifacts.require("./BeautyCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(BeautyCoin, 50000000, 1000000000000000);
};
