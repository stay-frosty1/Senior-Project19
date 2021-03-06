import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import MessageModal from "../../../../components/MessageModal";

const menuItems = {
	'Compose  ': {href: '/dashboard/messages/ '},
	'Inbox  ': {href: '/dashboard/inbox '},
	'Sent  ': {href: '/dashboard/outbox '}

};



export default class MessagesSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show0: false
		}
	}

	handleClick0 = () => {

		this.setState({ show0: !this.state.show0});
	};

	handleClose = () => {
		this.setState({ show0: !this.state.show0 });
	};

render() {
	return (
		<>
			<MessageModal handleClose={this.handleClick0} show={this.state.show0} />
			{/* First column that holds the menu items */}
			<Col xs={1} style={{ paddingLeft: "0px",paddingRight: '0px', backgroundColor: "grey",bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
				<ListGroup variant="flush" defaultActiveKey="1"  style={{ paddingRight: '0px'}}>

					<ListGroup.Item key={menuItems[1]}   style={{backgroundColor: "grey", color: "white"	,fontWeight:'bold',
						fontFamily: 'monospace', paddingRight: '0px',bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}} onClick={this.handleClick0}>
						Compose
						<i className ="fa fa-pencil text-white" />
					</ListGroup.Item>

					<ListGroup.Item key={menuItems[2]}  action href={menuItems["Inbox  "].href} style={{backgroundColor: "grey", color: "white"	,fontWeight:'bold',
						fontFamily: 'monospace', paddingTop: '5px',bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
						{"Inbox  "}
						<i className ="fa fa-envelope-open-o text-white" />
					</ListGroup.Item>
					<ListGroup.Item key={menuItems[3]}  action href={menuItems["Sent  "].href} style={{backgroundColor: "grey", color: "white"	,fontWeight:'bold',
						fontFamily: 'monospace', paddingRight: '0px',bordered: '0.5px solid rgba(0, 0, 0, 0.5)'}}>
						{"Sent  "}
						<i className ="fa fa-send-o text-white" />
					</ListGroup.Item>
				</ListGroup>
			</Col>
		</>
	);
  }
}

