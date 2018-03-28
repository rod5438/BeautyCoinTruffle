var BeautyCoin = artifacts.require("./BeautyCoin.sol");

contract('BeautyCoin', function(accounts) {
  it("should put 50000000 BeautyCoin in the first account", function() {
    return BeautyCoin.deployed().then(function(instance) {
      return instance.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 50000000, "50000000 wasn't in the first account");
    });
  });

  it("should send coin correctly", function() {
    var beautyCoin;
    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;
    var amount = 10000;

    return BeautyCoin.deployed().then(function(instance) {
      beautyCoin = instance;
      return beautyCoin.balanceOf(accounts[0]);
    }).then(function(balance) {
      account_one_starting_balance = balance;
      return beautyCoin.balanceOf(accounts[1]);
    }).then(function(balance) {
      account_two_starting_balance = balance;
      return beautyCoin.approve(accounts[2], amount, {from: accounts[0]});
    }).then (function() {
      return beautyCoin.allowance(accounts[0], accounts[2]);
    }).then (function(allowance) {
      assert.equal(allowance, amount, "approve balance fail amount incorrect!");
      return beautyCoin.transferFrom(accounts[0], accounts[1], amount, {from: accounts[2]});
    }).then(function() {
      return beautyCoin.balanceOf(accounts[0]);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return beautyCoin.balanceOf(accounts[1]);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();
      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
