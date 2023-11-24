import {artifacts} from 'truffle';

const Tether = artifacts.require("Tether");
const RWD = artifacts.require('RWD');
const DescentralBank = artifacts.require('DescentralBank');

module.exports = async function (deployer) {

        await deployer.deploy(Tether);
        const tether = await Tether.deployed();


        await deployer.deploy(RWD);
        const rwd = await RWD.deployed();


        await deployer.deploy(DescentralBank);
        const descentralBank = await DescentralBank.deployed();


        await rwd.transfer(descentralBank.address, '1000000000000000000');    

        await tether.transfer(accounts[0], '1000000000000000000');

  deployer.deploy(Tether);
};
