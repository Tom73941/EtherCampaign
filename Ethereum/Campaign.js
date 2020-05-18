// JavaScript source code
import web3 from './web3';
import Campaign from './build/Campaign.json';

//根据传入的地址，动态构建合约实例
export default (address)=>{
    return new web3.eth.Contract(JSON.parse(Campaign.interface),address);
}
