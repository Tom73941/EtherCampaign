// JavaScript source code
import web3 from './web3';
import Campaign from './build/Campaign.json';

//���ݴ���ĵ�ַ����̬������Լʵ��
export default (address)=>{
    return new web3.eth.Contract(JSON.parse(Campaign.interface),address);
}
