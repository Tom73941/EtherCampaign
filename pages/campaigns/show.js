// JavaScript source code
import React,{Component} from 'react';
import { Card, Grid ,Button } from 'semantic-ui-react';
import {Link} from '../../routes';

import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Campaign from '../../ethereum/Campaign';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component{

    //在Next服务器中预处理JS脚本，NEXT生命周期函数
    static async getInitialProps(props){
        const addr = props.query.address;   //
        console.log(addr);
        const camp = Campaign(addr);
        const summary = await camp.methods.getSummary().call();
        //返回后存储在Props属性中
        return {
                address:addr,
                minimumContribute:summary[0],
                balance:summary[1],
                requestcount:summary[2],
                approvalCount:summary[3],
                manager:summary[4]
            };
    }

    renderCards(){
        const {
            address,
            minimumContribute,
            balance,
            requestcount,
            approvalCount,
            manager
        }= this.props;
        console.log(this.props);
        const items = [
            {
                header: manager,
                meta:'管理者的地址',
                description:'当前管理者创建了众筹项目，并且是众筹项目的受益人',
                style:{overflowWrap:'break-word'}
            },
            {
                header: minimumContribute,
                meta:'最小贡献量',
                description:'如果您想对此众筹投资，您就需要投资至少大于当前的金额',
                style:{overflowWrap:'break-word'}
            },
            {
                header: requestcount,
                meta:'请求数量',
                description:'当前的管理者创建请求从合约中提钱，必须大于50%的投资人同意！',
                style:{overflowWrap:'break-word'}
            },
            {
                header: approvalCount,
                meta:'投资人数量',
                description:'已经为当前众筹投资的投资人的数量',
                style:{overflowWrap:'break-word'}
            },        
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta:'众筹总的金额(ether)',
                description:'当前众筹中，还剩下了多少的金额。',
                style:{overflowWrap:'break-word'}
            },        
        ];
        return <Card.Group items={items}/>;
    }

    render(){
        return (
            <Layout>
              <h3>众筹项目信息</h3>
              <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                      {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <ContributeForm address={this.props.address}/>  
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                        <Button primary>查看请求</Button>
                        </a>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
