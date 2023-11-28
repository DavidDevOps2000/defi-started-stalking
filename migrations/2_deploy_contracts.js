import {artifacts} from 'truffle';

const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer) {
    //Deploy mock Tether Contract
        await deployer.deploy(Tether);
        const tether = await Tether.deployed();

    //Deploy mock RWD Contract
        await deployer.deploy(RWD);
        const rwd = await RWD.deployed();

    //Deploy mock Dee Contract
        await deployer.deploy(DescentralBank);
        const decentralBank = await DecentralBank.deployed();


        await rwd.transfer(descentralBank.address, '1000000000000000000');    

        await tether.transfer(accounts[0], '1000000000000000000');

  deployer.deploy(Tether);
};
