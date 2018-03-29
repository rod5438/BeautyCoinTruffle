var BeautyCoin = artifacts.require("./BeautyCoin.sol");
var PerfectOneToOne = artifacts.require("./PerfectOneToOne.sol");

module.exports = function(deployer) {
  deployer.deploy(PerfectOneToOne, 0x23db10ec719f70825021cb6c842f864534be973b, BeautyCoin.address, {"from" : "0xc3a43ad23daf240b9126f69b191314e40d546ef1"});
};

// Launch rpc with mnemonic code(-m) in order to create defaut accounts with 100 ether
// testrpc -m "truck sand amateur oak trigger soft helmet jump explain resource exchange tree"

// Available Accounts
// ==================
// (0) 0x39efb622753b4cd56a0986a7b61a217ba2a050df // Default
// (1) 0xc3a43ad23daf240b9126f69b191314e40d546ef1 // BA
// (2) 0x23db10ec719f70825021cb6c842f864534be973b // Perfect
// (3) 0x6c5b9984af62d72e7d4f6c0b61ab5bf1ece8cf35 // iPhone user
// (4) 0x7dec96a702b387f03ddb2f1340a503b8395b1363
// (5) 0x4f5cbd4ac0eb32228dcca3e524de1c13c3b7d94c
// (6) 0xfb1eeee5317796507a09a5ec44fed4ddd697180b
// (7) 0x234c6286dbae8f59e955e11ac7221e78a0ae643a
// (8) 0x5b8659d00b574aefba5173f0a57436ad378b7113
// (9) 0x5752b73a29ae76e582e49cf38a5cba4b54939fb5
//
// Private Keys
// ==================
// (0) 2ab0af71fbf44837952625a38d4f67defda3fbe9a38852f423c21fcc0e462e01
// (1) 87108c284f54f8827587c38b288725f2b8cace2637153137627e16b7a80e28b7
// (2) 3c1653a58b875217b6354f6ea2d372490bf6c079e2cfeee765016d2e1d319595
// (3) eb4df66248d7d6c22d8ab8d19ad0f36112518eada9f976e5bb5ca4b2d46788e5
// (4) 65823115d4f1405c29bdfeaaa88ccfb0a60b69217667568b57ff1a67c8153e9e
// (5) 05fcecd2138f9d218d4d60a856ac4f82498d5341707f9b09f235434c45330295
// (6) 83cfc7d4024db3e23adc2105eb9a99b3d6c083386e18ec42c2f5aed367070879
// (7) b21a4993c3e7fa39b115ddf464791d1d642942c3cd4dd99d9606b85dfd2787e8
// (8) 9c77efc848a8da04ab16a3f429ec0b6e600652d0f3c0c2acb8766f80aac25a6f
// (9) 6308a1de5bebc29800d74f90c8ebd0c64997d06b4c6329ac8269665900553ed2
//
// HD Wallet
// ==================
// Mnemonic:      truck sand amateur oak trigger soft helmet jump explain resource exchange tree
// Base HD Path:  m/44'/60'/0'/0/{account_index}
