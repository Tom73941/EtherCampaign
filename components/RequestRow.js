// JavaScript source code
import React,{Component} from 'react';
import { Table,Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/Campaign';

class RequestRow extends Component{

    onApprove = async()=>{
        const camp = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await camp.methods.approvalRequest(this.props.id).send({from:accounts[0]});
    }
    onFinalize = async()=>{
        const camp = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await camp.methods.finalizeRequest(this.props.id).send({from:accounts[0]});
    } 

    render(){
        const {Row,Cell} = Table;
        const {id, request, approversCount} = this.props;
        return (
            <Row disabled={request.compelete}>
                <Cell>{id}</Cell>            
                <Cell>{request.description}</Cell>            
                <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>      
                <Cell>{request.recipients}</Cell>      
                <Cell>{request.approvalCount} / {approversCount}</Cell>      
                <Cell>
                    {
                        request.compelete?null:(<Button color="green" onClick={this.onApprove}>同意</Button>)
                    }
                </Cell>
                <Cell>
                    {
                        request.compelete?null:(<Button color="teal" onClick={this.onFinalize}>完成</Button>)
                    }
                </Cell>
            </Row>
        );

    }
}

export default RequestRow;
        