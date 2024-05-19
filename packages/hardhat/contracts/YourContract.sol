//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

contract Callee {
	uint256 public x;
	uint256 public value;

	function setX(uint256 _x) public returns (uint256) {
		x = _x;
		return x;
	}

	function setXAndSendEther(
		uint256 _x
	) public payable returns (uint256, uint256) {
		x = _x;
		value = msg.value;
		return (x, value);
	}
}

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	function setX(Callee _callee, uint256 _x) public {
		uint256 x = _callee.setX(_x);
	}

	function setXFromAddress(address _addr, uint256 _x) public {
		Callee callee = Callee(_addr);
		callee.setX(_x);
	}

	function setXAndSendEther(Callee _callee, uint256 _x) public payable {
		(uint256 x, uint256 value) = _callee.setXAndSendEther{
			value: msg.value
		}(_x);
	}
}
