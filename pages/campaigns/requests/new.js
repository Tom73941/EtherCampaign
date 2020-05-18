import React,{Component} from 'react'
import { Button, Form ,Input, Message } from 'semantic-ui-react'
import {Router,Link} from '../../../routes';

import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/Campaign';

class CampaignRequestNew extends Component{

    state={
        description:'',
        value:'',
        recipientAdd:'',
        errorMsg:'',
        loading:''
    };
    //在Next服务器中预处理JS脚本，NEXT生命周期函数
    static async getInitialProps(props){
        const {address} = props.query;   //
        return {address};
    }

    onSubmit = async ()=>{
        event.preventDefault();
        this.setState({errorMsg:''});
        this.setState({loading:true});
        const {description,value,recipientAdd} = this.state;

        try{
            //得到合约地址
            const camp = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();

            await camp.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipientAdd).send({
                from:accounts[0],
            })
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        }catch(err){
            this.setState({errorMsg:err.message});
        }
        this.setState({loading:false});
    }
    
    render(){
        return (
        <Layout>
            <Link route={`/campaigns/${this.props.address}/requests`}><a>返回</a></Link>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
            <Form.Field>
                <label>请求描述</label>
                <Input 
                    value={this.state.description}
                    onChange={event=>this.setState({description:event.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <label>请求金额</label>
                <Input 
                value={this.state.value}
                onChange={event=>this.setState({value:event.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <label>受益人地址</label>
                <Input 
                value={this.state.recipientAdd}
                onChange={event=>this.setState({recipientAdd:event.target.value})}
                />
            </Form.Field>
            <Message error header="错误！" content={this.state.errorMsg}/>
            <Button loading={this.state.loading} primary>增加请求</Button>
            </Form>
        </Layout>
        );

    }

}

export default CampaignRequestNew;
