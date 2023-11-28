// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Tether {
    string public name = "Tether";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000;
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        // require that the value is greater or equals to transfer
        require(balanceOf[msg.sender] >= _value);
        //Transfer  the amount and substract the balances
        balanceOf[msg.sender] -= _value;
        // add the balances
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool sucdess) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[msg.sender][_from]);
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
