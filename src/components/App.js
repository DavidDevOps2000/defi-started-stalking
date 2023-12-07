import React, {Component} from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';



class App extends Component{
    async UNSAFE_componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

    async loadWeb3(){
      if(window.ethereum){
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }else if (window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
      }else{
        window.alert('No Ethereum browser detected ! You Check out MetaMask')
      }

    }

    async loadBlockchainData(){
      const web3 = window.web3
      const account = await web3.eth.getAccounts()
      this.setState({account:account[0]})
      console.log(account[0])
      const networkId = await web3.eth.net.getId();
      console.log(networkId, 'Network ID')


      //Load Blockchain Data
      const rwdData = RWD.networks[networkId]
      if(rwdData){
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
      this.setState({rwd})
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
      this.setState({rwdBalance: rwdBalance.toString()})
      console.log({balance: rwdBalance})
      }else{
        window.alert('Error Reward contract not deployed - no detected network')
      }

      //Load Blockchain Data
      const decentralBankData = DecentralBank.networks[networkId]
      if(decentralBankData) {
        const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
        this.setState({decentralBank})
        let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
        this.setState({stakingBalance: stakingBalance.toString()})
        console.log({balance: stakingBalance})
      }else{
        window.alert('Decentral bank not deployed - no detected network')
      }
      //Load Blockchain Data
      const tetherData = Tether.networks[networkId]
      if(tetherData) {
        const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
        this.setState({tether})
        let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
        this.setState({tetherBalance: tetherBalance.toString()})
        console.log({balance: tetherBalance})
      }else{
        window.alert('Error Tether contract not deployed - no detected network')
      }

      
    }

    constructor(props){
        super(props)
      this.state = {
        account:'0x0',
        tether:{},
        rwd:{},
        decentralBank:{},
        tetherBalance:'0',
        rwdBalance:'0',
        stakingBalance:'0',
        loading:true
      }
    }

  render() {
    return (
    <Navbar account={this.state.account}/>
    )
  }
}

export default App;