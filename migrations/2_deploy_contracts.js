
const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer) {
    //Deploy mock Tether Contract
        await deployer.deploy(Tether);
        //const tether = await Tether.deployed();

    //Deploy mock RWD Contract
        await deployer.deploy(RWD);
        //const rwd = await RWD.deployed();

    //Deploy mock Dee Contract
        await deployer.deploy(DecentralBank);
        //const decentralBank = await DecentralBank.deployed();

  deployer.deploy(Tether);
};
