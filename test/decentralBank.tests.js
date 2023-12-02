// eslint-disable-next-line no-undef
const Tether = artifacts.require('Tether.sol');
// eslint-disable-next-line no-undef
const RWD = artifacts.require('RWD.sol');
// eslint-disable-next-line no-undef
const DecentralBank = artifacts.require('DecentralBank.sol');

require('chai')
.use(require('chai-as-promised'))
.should()

// eslint-disable-next-line no-undef
contract('decentralBank', ([owner, costumer]) =>{

    let tether, rwd, decentralBank
    
    function tokens(number) {
        // eslint-disable-next-line no-undef
        return web3.utils.toWei(number, 'ether')
        
    }
    before( async ()=>{
        //Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(rwd.address, tether.address)

        //Transfer all tokens to DecentralBank (1 Million)
        await rwd.transfer(decentralBank.address, web3.utils.toWei('1000000'))

        //Trsnfer 100 mock Tether to Costumer
        await tether.transfer(costumer, tokens('100'), {from: owner})
    })
//All of code goes here for testing
    describe('Mock Tether Deployment', async ()=>{
    it('matches name successfully', async ()=>{
        let tether = await Tether.new();
            assert.equal(name, 'Moch Tether Token');
    })

    describe('Reward Token', async ()=>{
        it('matches name successfully', async ()=>{
            let name = await rwd.name();
                assert.equal(name, 'Reward Token');
        })

    describe('Decentral Bank Deployment', async ()=>{
        it('matches name successfully', async ()=>{
            let name = await decentralBank.name();
                assert.equal(name, 'Reward Token');
        })
        it('contract has token', async ()=>{
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
})
})})