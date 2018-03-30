module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    privateChain: {
      host: "192.168.8.86", // Jason's macbook pro
      port: 8545,
      network_id: "1108", // Private chain ID
      gas: 4712388, // Default gas is not enough now
      gasPrice: 100000000000,
    }
  }
};
