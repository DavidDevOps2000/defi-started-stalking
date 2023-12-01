
const Tether = artifacts.require('Tether.sol');
const RWD = artifacts.require('RWD.sol');
const DecentralBank = artifacts.require('DecentralBank.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('decentralBank', (accounts) =>{

    let tether, rwd, decentralBank
    
    before( async ()=>{
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)
    })
//All of code goes here for testing
describe('Mock Tether Deployment', async ()=>{
    it('matches name successfully', async ()=>{
        let tether = await Tether.new();
            assert.equal(name, 'Moch Tether Token');
    })

    describe('Reward Token', async ()=>{
        it('matches name successfully', async ()=>{
            let name = await rwd.new();
                assert.equal(name, 'Reward Token');
        })
})
})})