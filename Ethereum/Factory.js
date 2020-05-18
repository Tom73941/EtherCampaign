// JavaScript source code
import web3 from './web3';
import factory from './build/CampaignFactory.json';

const address = '0x8DE30dCeA46041B16235A50F5E7cCBff62645aCF';
    
const instance = new web3.eth.Contract(JSON.parse(factory.interface),address);
            
export default instance;