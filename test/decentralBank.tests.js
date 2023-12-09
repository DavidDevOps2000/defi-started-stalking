const { assert } = require('console');

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
contract('decentralBank', ([owner, costumer]) => {

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
})

    describe('Reward Token', async ()=>{
        it('matches name successfully', async ()=>{
            let name = await rwd.name();
                assert.equal(name, 'Reward Token');
        })
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

        describe('Yeild Farming', async()=>{
            // eslint-disable-next-line no-unused-expressions
            it('rewards tokens for staking', async ()=>{
                let result
                //Check Investor Balance
                result = await tether.balanceOf(costumer)
                assert.equal(result.toString(), tokens('100'), 'costumer mock wallet staking')

                await tether.approve(decentralBank.address, tokens('100'), {from:costumer})
                await decentralBank.depositTokens(tokens('0'), {from:costumer})
                
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('0'), 'costumer mock wallet staking')
                
                //Is Staking Balance
                result = await decentralBank.stakingBalance(costumer);
                assert.equal(result.toString(), tokens('100'), 'costumer mock wallet staking')

                result = await decentralBank.isStaking(costumer)
                assert.equal(result.toString(), 'true', 'costumer mock wallet staking')

                //Issue Tokens
                await decentralBank.issueTokens({from:owner})

                // Ensure Only the Owner Can Issue Tokens
                await decentralBank.issueTokens({from:costumer}).should.be.rejected;

                //Unstake Tokens
                await decentralBank.unstakeTokens({from: costumer})

                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), tokens('100'), 'costumer mock wallet unstaking')
                
                //Is Staking Balance
                result = await decentralBank.stakingBalance(costumer);
                assert.equal(result.toString(), tokens('0'), 'costumer mock wallet staking')
                // Is staking update
                result = await decentralBank.isStaking(costumer)
                assert.equal(result.toString(), 'false', 'costumer is longer status after unstaking')

                //Check Unstaking Balances

            })
        })
    })
