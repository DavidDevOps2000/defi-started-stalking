// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract Tether{
    string public name = 'Tether';
    string public symbol = 'mUSDT';
    uint256 public totalSupply = 1000000000000000000;
    uint8 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );
    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint _value
        );

    mapping (address => uint256) public balanceOf;

    constructor(){
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success){
        // require that the value is greater or equals to transfer
        require(balanceOf[msg.sender] >= _value);
        //Transfer  the amount and substract the balances
        balanceOf[msg.sender]-= _value;
        // add the balances
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}