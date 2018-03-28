pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BeautyCoin.sol";

contract TestBeautyCoin {
  function testInitialBalanceUsingDeployedContract() public {
    BeautyCoin beautyCoin = BeautyCoin(DeployedAddresses.BeautyCoin());
    uint expected = 50000000;
    Assert.equal(beautyCoin.balanceOf(tx.origin), expected, "Owner should have 50000000 BeautyCoin initially");
  }
}
