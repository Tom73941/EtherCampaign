import Web3 from 'web3'
let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

    //消除因为Metamask的隐私问题造成的链接不上账户的问题
    window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            let ethereum = window.ethereum;
            await ethereum.enable();
        }
    });

    //alert('web3 is currentProvider');
    web3 = new Web3(window.web3.currentProvider);
}
else {
    //alert('web3 is infura');
    const provider = new Web3.providers.HttpProvider(
      `https://ropsten.infura.io/v3/caae5d1a13ce42d28ad5cd28a0422d20`
    )
    web3 = new Web3(provider);
}

// export the web3 instance
export default web3;