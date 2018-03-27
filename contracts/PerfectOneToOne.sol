//Write your own contracts here. Currently compiles using solc v0.4.15+commit.bbb8e64f.
pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract PerfectOneToOne {
    address public coinAddress;
    address public perfectCorp;
    address public BA;
    function PerfectOneToOne(address _perfectCorp, address _coinAddress) public {
        BA = msg.sender; // BA
        perfectCorp = _perfectCorp; // Perfect
        coinAddress = _coinAddress; // Beauty Coin
    }
    function callPerfectBA(uint256 second) public {
        // 1 sec 1 BTC
        ERC20 beautyCoin = ERC20(coinAddress);
        require(second > 1);
        require(beautyCoin.balanceOf(msg.sender) >= second);
        beautyCoin.transferFrom(msg.sender, BA, second -1);
        beautyCoin.transferFrom(msg.sender, perfectCorp, 1);
        callBA(msg.sender, second);
        // coinAddress.call(bytes4(bytes32(keccak256("transferFrom(address,address,uint256)"))), msg.sender, BA, second - 1);
        // coinAddress.call(bytes4(bytes32(keccak256("transferFrom(address,address,uint256)"))), msg.sender, perfectCorp, 1);
    }
    event callBA(address indexed caller, uint256 indexed second);
}
