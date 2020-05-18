import React,{Component} from 'react'
import { Card , Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import {Link} from '../routes';

class CampaignIndex extends Component{
    
    //在Next服务器中预处理JS脚本，NEXT生命周期函数
    static async getInitialProps(){
        //const campaign = ["asfasdgfsfgjhgkhfdsafghjkjhgf","asfasdgfsfgjhg34524513422567543"];//
        const campaign = await factory.methods.getDeployedCampaign().call();
        //返回后存储在Props属性中
        return {campaign};
    }

    renderCampaign(){
        const item = this.props.campaign.map(address=>{
            return {
                header: address,
                //特别注意，这个位置不是单引号，而是撇号`，这个地方很坑。
                description: <Link route={`/campaigns/${address}`}><a>查看众筹信息</a></Link>,
                fluid:true
            }
        });
        return <Card.Group items={item} />;
    }

    render(){
            return (
                <Layout>
                  <div>
                    <h3>众筹列表</h3>
                     <Link route="/campaigns/new">
                       <a>
                         <Button floated='right' content='创建众筹' icon='add' labelPosition='left' primary/>
                       </a>
                    </Link>
                    {this.renderCampaign()}
                  </div>
                </Layout>
                );
    }
}

export default CampaignIndex;