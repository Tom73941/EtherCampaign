// JavaScript source code
const HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = require("web3");

//const {interface,bytecode} = require('./compile');
const compileFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'cry second spider green jelly combine repair size focus push shrug grief',
    'https://ropsten.infura.io/v3/caae5d1a13ce42d28ad5cd28a0422d20'
);

//console.log(provider.getAddress());
//0x99d603a846718fd5b6375b9a8775f1f528084a76

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log(accounts);
    console.log(balance);

    //Remix中手动部署花费0000407887000000000wei
    const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
        .send({from:accounts[0], gas:'100000000000000000'});
    console.log('contract deployed to ',result.options.address);
    //0x7693AC3C2B7DF561CDCC1Bf44E17097233b55803
}

deploy();