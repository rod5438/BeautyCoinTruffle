//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract BeautyCoin is StandardToken {
    string public name = "Beauty coin";
    string public symbol = "BTC";
    uint public decimals = 0;
    uint256 presaleWeiPerCoin;
    address publisher;
    // BeautyCoin(50000000, 1000000000000000) 0.0001 eth per coin
    function BeautyCoin(uint256 totalSupply, uint256 _presaleWeiPerCoin) public {
        totalSupply_ = totalSupply;
        presaleWeiPerCoin = _presaleWeiPerCoin;
        publisher = msg.sender;
        balances[publisher] = totalSupply;
        return;
    }

    function BuyBeautyCoin() public payable {
        uint256 totalBeautyCoin = msg.value / presaleWeiPerCoin;
        uint256 weiForBuying = totalBeautyCoin * presaleWeiPerCoin;
        uint256 weiForRefund = msg.value - weiForBuying;
        require(balances[publisher] > totalBeautyCoin);
        balances[msg.sender] += totalBeautyCoin;
        balances[publisher] -= totalBeautyCoin;
        msg.sender.transfer(weiForRefund);
        publisher.transfer(weiForBuying);
        Transfer(publisher, msg.sender, totalBeautyCoin);
    }

    function balanceOfSelf() public view returns (uint256) {
        return balances[msg.sender];
    }

    /* function transfer(address _to, uint256 _value) public returns (bool) {
      require(_to != address(0));
      require(_value <= balances[msg.sender]);

      // Cannot pass test
      balances[msg.sender] = balances[msg.sender].sub(_value + 1);
      balances[_to] = balances[_to].add(_value + 1);
      Transfer(msg.sender, _to, _value);
      return true;
    } */
}
