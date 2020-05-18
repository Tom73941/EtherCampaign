// JavaScript source code
import React,{Component} from 'react';
import { Form , Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/Campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ContributeForm extends Component{

    state = {
        value:'',
        errorMsg:'',
        loading:''
    };
    onSubmit = async ()=>{
        this.setState({errorMsg:''});
        this.setState({loading:true});
        try{
            event.preventDefault();
            //得到合约地址
            const camp = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();

            await camp.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
            })
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({errorMsg:err.message});
        }
        this.setState({loading:false});
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
              <Form.Field>
                <label>总的投资额度</label>
                <Input 
                    value={this.state.value} 
                    onChange={event=>this.setState({value:event.target.value})}
                    label="ether" labelPosition="right" />
              </Form.Field>
              <Message error header="错误！" content={this.state.errorMsg}/>
              <Button  loading={this.state.loading}  primary>投资</Button>
            </Form>
         );
    }
}
export default ContributeForm;
