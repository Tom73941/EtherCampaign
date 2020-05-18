// JavaScript source code
import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button, Form ,Input, Message } from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import {Router} from '../../routes';

class CampaignNew extends Component{

    state={
        minimum:'',
        errorMsg:'',
        loading:''
    };

    onSubmit = async()=>{
        this.setState({errorMsg:''});
        this.setState({loading:true});
        try{
            event.preventDefault();
            const accounts = await web3.eth.getAccounts();

            await factory.methods.createCampaign(this.state.minimum).send({from:accounts[0]});
            Router.pushRoute('/');
        }catch(err){
            this.setState({errorMsg:err.message});
        }
        this.setState({loading:false});
    }

    render(){
        return (
            <Layout>
              <h3>创建您的众筹项目</h3>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                <Form.Field>
                  <label>请输入最小的贡献量</label>
                  <Input label='wei' labelPosition='right'
                     value={this.state.minimum}
                     onChange={event=>this.setState({minimum:event.target.value})}
                  />
                </Form.Field>
                <Message error header="错误！" content={this.state.errorMsg}/>
                <Button loading={this.state.loading} primary>创建众筹</Button>
              </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
