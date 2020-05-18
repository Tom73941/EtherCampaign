pragma  solidity  ^0.4.24;

contract CampaignFactory{
	address[] public deployedCampaign;
	function createCampaign(uint mininum) public {
		address newCampaign = new Campaign(mininum,msg.sender);
		deployedCampaign.push(newCampaign);
	}

	function getDeployedCampaign() public view returns(address[] ){
		return deployedCampaign;
	}
}

contract Campaign{
	
	struct Request{
		string  description;				//描述
        uint    value;						//申请总金额
		address recipients;					//受益人地址
		bool	compelete;					//项目是否完成
		uint	approvalCount;				//同意请求的投资人总数
		mapping(address => bool) approvers;	//同意的投资人意见列表
	}

	Request[]	public	requests;				//存储请求
	address	public manager;						//管理者地址
	uint public minimumContribute;				//最小的贡献量
	mapping(address=> bool)	public approvers;	//存储投资人
	uint public approversCount;					//投资人的数量

	modifier restricted{
		require(msg.sender == manager);
		_;
	}

	//构造函数
	constructor(uint minimum, address _addr) public {
		manager = _addr;
		minimumContribute = minimum;
	}

	//众筹投资
	function contribute() public payable{
		require(msg.value>minimumContribute);
		approvers[msg.sender] = true;
		approversCount ++;
	}

	//管理者创建众筹请求
	function  createRequest(string _des, uint _value, address _addr) public restricted{
		Request memory newquest = Request({
			description: _des,
			value: _value,
			recipients:_addr,
			compelete:false,
			approvalCount:0
		});
		requests.push(newquest);
	}

	//对请求投票
	function approvalRequest(uint index) public {
		Request storage rqt = requests[index];
		require(approvers[msg.sender]);	        //投票的人必须是该项目的投资人
		require(!rqt.approvers[msg.sender]);
		rqt.approvers[msg.sender] = true;
		rqt.approvalCount ++;
	}

	//投资请求是否成功
	function finalizeRequest(uint index) public restricted payable{
		Request storage rqt = requests[index];
		//超出半数同意才可以投资
		require(rqt.approvalCount > approversCount/2);

		rqt.recipients.transfer(rqt.value);
		rqt.compelete = true;
	}

	function getSummary() public view returns(uint,uint,uint,uint,address){
		return (minimumContribute,address(this).balance,requests.length,approversCount,manager);
	}

	function getRequestCount() public view returns(uint){
		return requests.length;
	}
}
