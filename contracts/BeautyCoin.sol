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

    function transfer(address _to, uint256 beautyCoin) public returns (bool) {
        require(_to != address(0));
        require(beautyCoin <= balances[msg.sender]);

         // SafeMath.sub will throw if there is not enough balance.
        balances[msg.sender] -= beautyCoin;
        balances[_to] += beautyCoin;
        Transfer(msg.sender, _to, beautyCoin);
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function balanceOfSelf() public view returns (uint256) {
        return balances[msg.sender];
    }

    function transferFrom(address _from, address _to, uint256 beautyCoin) public returns (bool) {
        require(_to != address(0));
        require(beautyCoin <= balances[_from]);
        require(beautyCoin <= allowed[_from][msg.sender]);
        balances[_from] -= beautyCoin;
        balances[_to] += beautyCoin;
        allowed[_from][msg.sender] =- beautyCoin;
        Transfer(_from, _to, beautyCoin);
        return true;
    }

    function approve(address _spender, uint256 beautyCoin) public returns (bool) {
        allowed[msg.sender][_spender] = beautyCoin;
        Approval(msg.sender, _spender, beautyCoin);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }

    event Transfer(address indexed from, address indexed to, uint256 beautyCoin);
    event Approval(address indexed owner, address indexed spender, uint256 beautyCoin);
}
