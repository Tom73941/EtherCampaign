import React,{Component} from 'react'
import { Button ,Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';

import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/Campaign';

class CampaignRequest extends Component{
    //在Next服务器中预处理JS脚本，NEXT生命周期函数
    static async getInitialProps(props){
        const {address} = props.query;   //也可以写成：const address = props.query.address;
        //得到合约地址
        const camp = Campaign(address);
        const requestCount = await camp.methods.getRequestCount().call();
        const approversCount = await camp.methods.approversCount().call();
        
        console.log(requestCount);
        console.log(approversCount);
        //遍历得到所有的requests
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element,index)=>{
                return camp.methods.requests(index).call();
            })
            )
        return {address,requests,approversCount};
    }

    renderRow(){
        return this.props.requests.map((request,index)=>{
            return (
                <RequestRow 
                    key={index}
                    id = {index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                ></RequestRow>
            );
        });
    }

    render(){
        return (
            <Layout>
                <h3>请求列表</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                  <a>
                    <Button primary>增加请求</Button>
                  </a>
                </Link>
                <Table>
                  <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>描述</Table.HeaderCell>
                        <Table.HeaderCell>总的金额</Table.HeaderCell>
                        <Table.HeaderCell>受益人地址</Table.HeaderCell>
                        <Table.HeaderCell>同意数量</Table.HeaderCell>
                        <Table.HeaderCell>是否同意</Table.HeaderCell>
                        <Table.HeaderCell>是否完成</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.renderRow()}
                  </Table.Body>
                </Table>
            </Layout>
            );
        }
    }

export default CampaignRequest;
