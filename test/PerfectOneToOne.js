var BeautyCoin = artifacts.require("./BeautyCoin.sol");
var PerfectOneToOne = artifacts.require("./PerfectOneToOne.sol");

contract('PerfectOneToOne', function(accounts) {
  it ("Should use official BeautyCoin", async function() {
    var beautyCoinAddress = (await BeautyCoin.deployed()).address;
    var perfectOneToOneCoinAddress = await (await PerfectOneToOne.deployed()).coinAddress();
    assert.equal(beautyCoinAddress, perfectOneToOneCoinAddress, "Should use official BeautyCoin");
  });

  it ("Should use PerfectCorp commission account", async function() {
    var PerfectCorpAccount = await (await PerfectOneToOne.deployed()).perfectCorp();
    assert.equal(PerfectCorpAccount, accounts[3], "Should use PerfectCorp as commission account 0x6c5b9984af62d72e7d4f6c0b61ab5bf1ece8cf35");
  });

  it("Send BeautyCoin as gift correctly", async function() {
    var beautyCoin = await BeautyCoin.deployed();
    var totalSupply = (await beautyCoin.totalSupply()).toNumber();
    var giftCoin = 10000;
    await beautyCoin.transfer(accounts[2], giftCoin, {from:accounts[0]});
    assert.equal((await beautyCoin.balanceOf(accounts[2])).toNumber(), giftCoin, "iPhone user should should have gift " + giftCoin + " beauty coin");
    assert.equal((await beautyCoin.balanceOf(accounts[0])).toNumber(), totalSupply - giftCoin, "Default account should have " + (totalSupply - giftCoin) + " beauty coin");
    assert.equal((await beautyCoin.balanceOf(accounts[1])).toNumber(), 0, "BA should have 0 beauty coin");
    assert.equal((await beautyCoin.balanceOf(accounts[3])).toNumber(), 0, "PerfectCorp should have 0 beauty coin");
  });

  it("Approve PerfectOneToOne to use iPhone user's BeautyCoin", async function() {
    var beautyCoin = await BeautyCoin.deployed();
    var perfectOneToOne = await PerfectOneToOne.deployed();
    var approvedAmount = 300;
    await beautyCoin.approve(perfectOneToOne.address, approvedAmount ,{from:accounts[2]});
    assert.equal(await beautyCoin.allowance(accounts[2], perfectOneToOne.address), approvedAmount, "PerfectOneToOne should use " + approvedAmount + " BeautyCoin of iPhone user");
  });

  it("should get one coin to PerfectCorp after call BA", async function() {
    var beautyCoin = await BeautyCoin.deployed();
    var perfectOneToOne = await PerfectOneToOne.deployed();
    var callBAInSec = 200;
    var account1BeginBalance = await beautyCoin.balanceOf(accounts[1]); // BA
    var account2BeginBalance = await beautyCoin.balanceOf(accounts[2]); // iPhone user
    var account3BeginBalance = await beautyCoin.balanceOf(accounts[3]); // Perfect Corp
    await perfectOneToOne.callPerfectBA(callBAInSec, {from:accounts[2]});
    var account1EndBalance = await beautyCoin.balanceOf(accounts[1]); // BA
    var account2EndBalance = await beautyCoin.balanceOf(accounts[2]); // iPhone user
    var account3EndBalance = await beautyCoin.balanceOf(accounts[3]); // erfect Corp
    assert.equal(account2BeginBalance - account2EndBalance, callBAInSec, "iPhone user spend " + callBAInSec + " beauty coin");
    assert.equal(account1EndBalance - account1BeginBalance , callBAInSec - 1, "BA earn " + callBAInSec - 1 + " beauty coin");
    assert.equal(account3EndBalance - account3BeginBalance, 1, "PerfectCorp should have commission " + 1 + " beauty coin");
  });
});
