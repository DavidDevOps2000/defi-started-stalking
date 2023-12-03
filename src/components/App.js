import React, {Component} from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';

class App extends Component{
    async componentWillUnmount(){
    await this.loadWeb3()
  }

    async loadWeb3(){
      if(window.ethereuem){
        window.web3 = new Web3(window.ethereum)
        await window.ethereuem.enable()
      }else if (window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
      }else{
        window.alert('No Ethereum browser detected ! You Check out MetaMask')
      }
    }

    constructor(props){
        super(props)
      this.state = {
        account:'0x0'
      }
    }

  render() {
    return (
    <Navbar account={this.state.account}/>
    )
  }
}

export default App;
