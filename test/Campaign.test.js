// JavaScript source code
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compileFactory = require("../ethereum/build/CampaignFactory.json");
const compileCampaign = require("../ethereum/build/Campaign.json");

var accounts;
var factory;
var campaignAddr;
var campaign;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
        .send({from:accounts[0],gas:'990000000000000'});

    await factory.methods.createCampaign('100').send({from:accounts[0],gas:'990000000000000'});
    [campaignAddr] = await factory.methods.getDeployedCampaign().call();

    campaign = await new web3.eth.Contract(JSON.parse(compileCampaign.interface),campaignAddr);
})

describe('campaign',()=>{
    it('deploy a factory and campaign',()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    })

    it('manager address',async ()=>{
        const manager = await campaign.methods.manager().call();
        assert(manager,accounts[0]);
    })

    it('allow people to contribute', async() =>{
        await campaign.methods.contribute().send({from:accounts[1],value:'200'});
        const isContribute = await campaign.methods.approvers(account[1]).call();
        assert(isContribute);
    })

    it('require a minimum contribute', async()=>{
        try{
            //测试minimum设置是否有效，value为5，期望值失败
            await campaign.methods.contribute().send({from:accounts[1],value:'5'});
            const isContribute = await campaign.methods.approvers(account[1]).call();
            assert(isContribute);
        }
        catch(err){
            assert(err);
        }
    })

    it('allow a manager to make request',async()=>{
        await campaign.methods.createRequest('buy a pig','100',accounts[1]).send({from:accounts[0],gas:'990000000000000'});
        const request = await campaign.methods.requests(0).call();
        assert.equal('buy a pig',request.description);
    })
})