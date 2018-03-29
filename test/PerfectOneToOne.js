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
    assert.equal(PerfectCorpAccount, 0x23db10ec719f70825021cb6c842f864534be973b, "Should use PerfectCorp commission account 0x23db10ec719f70825021cb6c842f864534be973b");
  });

  it("Send BeautyCoin as gift correctly", async function() {
    var beautyCoin = await BeautyCoin.deployed();
    var totalSupply = (await beautyCoin.totalSupply()).toNumber();
    var giftCoin = 10000;
    await beautyCoin.transfer(accounts[3], giftCoin, {from:accounts[0]});
    assert.equal((await beautyCoin.balanceOf(accounts[3])).toNumber(), giftCoin, "iPhone user should should have gift " + giftCoin + " beauty coin");
    assert.equal((await beautyCoin.balanceOf(accounts[0])).toNumber(), totalSupply - giftCoin, "Default account should have " + (totalSupply - giftCoin) + " beauty coin");
    assert.equal((await beautyCoin.balanceOf(accounts[1])).toNumber(), 0, "BA should have 0 beauty coin");
    assert.equal((await beautyCoin.balanceOf(accounts[2])).toNumber(), 0, "PerfectCorp should have 0 beauty coin");
  });

  // it("should get one coin to PerfectCorp after call BA", async function(done) {
  //
  //   var beautyCoin = await BeautyCoin.deployed();
  //   var perfectOneToOne = await PerfectOneToOne.deployed();
  //   var callBAInSec = 200;
  //   var account1BeginBalance = await beautyCoin.balanceOf(accounts[1]); // BA
  //   var account2BeginBalance = await beautyCoin.balanceOf(accounts[2]); // PerfectCorp
  //   var account3BeginBalance = await beautyCoin.balanceOf(accounts[3]); // IPhone user
  //   await perfectOneToOne.callPerfectBA(callBAInSec, {from:accounts[3]});
  //   var account1EndBalance = await beautyCoin.balanceOf(accounts[1]); // BA
  //   var account2EndBalance = await beautyCoin.balanceOf(accounts[2]); // PerfectCorp
  //   var account3EndBalance = await beautyCoin.balanceOf(accounts[3]); // IPhone user
  //   assert.equal(account3BeginBalance - account3EndBalance, callBAInSec, "iPhone user spend " + callBAInSec + " beauty coin");
  //   assert.equal(account1EndBalance - account1BeginBalance , callBAInSec - 1, "BA earn " + callBAInSec - 1 + " beauty coin");
  //   assert.equal(account2EndBalance - account2BeginBalance, 1, "PerfectCorp should have commission " + 1 + " beauty coin");
  // });
});
