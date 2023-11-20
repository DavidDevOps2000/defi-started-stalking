pragma solidity '^0.5.0';

contract Migrations {
    address public owner;
    uint public last_completed_migration;


    constructor() public{
        owner = msg.sender;
    }

    modifier retricted(){
        if(msg.sender == owner)_;
    }

    function setCompleted(uint completed) public restricted{
        last_completed_migrations = completed;
    }

    function upgrade(address new_address) public restricted{
        Migrations upgraded = Migrations(new_address);
        upgrade.setCompleted(last_completed_migration);
    }




}