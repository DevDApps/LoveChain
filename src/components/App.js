import LoveChain from '../abis/LoveChain.json'
import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = LoveChain.networks[networkId]
    if(networkData) {
      const loveChain = new web3.eth.Contract(LoveChain.abi, networkData.address)
      this.setState({ loveChain })
      const imagesCount = await loveChain.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await loveChain.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }

      this.setState({ loading: false})
    } else {
      window.alert('LoveChain contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
         this.setState({ buffer: Buffer(reader.result) })
    console.log('buffer', this.state.buffer)  }
  }

  uploadImage = email => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.loveChain.methods.uploadImage(result[0].hash, email).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      // refresh
      window.location.reload(false);
      })
    })
  }

  getValueInput = event => {
      event.preventDefault()
      const searchValue = event.target.value
      const last = this.state.userSearchFilter

      this.setState({ userSearchFilterLast: this.state.userSearchFilter })
      this.setState({ userSearchFilter: searchValue })

      console.log("in getValueInput, last value =  ",  last)
      this.filterNames(searchValue)

      this.setState({ userSearchFilterLast: searchValue })
      if (searchValue == "" || last.length > searchValue.length)
        window.location.reload(false);
  }

  filterNames (searchValue) {
      const { images } = this.state
      console.log("in filterNames searchValue = ", searchValue)
      this.setState({
        images: images.filter(x => x.email.includes(searchValue))
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loveChain: null,
      images: [],
      userSearchFilter: "",
      userSearchFilterLast: "",
      loading: true
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.captureFile = this.captureFile.bind(this)
    this.filterNames = this.filterNames.bind(this);
    this.getValueInput = this.getValueInput.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              images={this.state.images}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              filterNames={this.filterNames}
              getValueInput={this.getValueInput}
            />
        }
      </div>
    );
  }
}

export default App;
