
const tether = artifacts.require('Tether.sol');
const rwd = artifacts.require('RWD.sol');
const decentralBank = artifacts.require('DecentralBank.sol');

module.exports = async function (deployer) {
    //Deploy mock Tether Contract
        await deployer.deploy(tether);
        //const tether = await Tether.deployed();

    //Deploy mock RWD Contract
        await deployer.deploy(rwd);
        //const rwd = await RWD.deployed();

    //Deploy mock Dee Contract
        await deployer.deploy(decentralBank);
        //const decentralBank = await DecentralBank.deployed();

  deployer.deploy(tether);
};
