import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";

export default class ReplyMsgModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: 'RE:',
            to: '',
            type: 'reply',
            body: '',
            sender: Number(localStorage.getItem('userId'))
        };

        this.sendMessage = this.sendMessage.bind(this);

    }

    // Handles state change for each input in the state object
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    // Hits API with body of carve
    sendMessage() {
        // Construct the message here
        const message = {
            sender: this.state.sender,
            reciever: this.props.replier,
            subject: 'RE: ',
            body: this.state.body,
            msgType: 'reply',
            reply: this.props.replyId
        };

        // Post message body to api
        axios.post('http://localhost:8000/messages', message)
          .then(() => {
              this.props.refresh();
              this.props.handleClose();
          });
    }


    // Make sure that all fields are filled in
    validateForm() {
        const {  body } = this.state;
        return (
            body.length > 0
        );
    }

    render() {
        return (
            <Modal size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   show={this.props.show}
                   onHide={this.props.handleClose}
                   style = {{}}>
                <Modal.Header closeButton style = {{color: "lightgrey",backgroundColor:"darkslategrey"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Reply Message</Modal.Title>
                </Modal.Header>


                <Modal.Body style = {{color: "lightgrey",backgroundColor:"slategrey"}}>
                    <Container>

                        <Row>Subject {this.state.subject}</Row>
                        <Row>Replying to {this.props.replier}</Row>

                        {/* Description */}
                        <Form.Group controlId="body">
                            <Form.Label>Message:</Form.Label>
                            <Form.Control value={this.state.description} onChange={this.handleChange} as="textarea" rows="2" placeholder="Enter Message text here..." />
                        </Form.Group>

                        {/* Horizontal rule */}
                        <hr/>


                    </Container>
                </Modal.Body>


                <Modal.Footer style = {{color: "lightgrey",backgroundColor:"midnightblue"}}>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" disabled={!this.validateForm()} onClick={this.sendMessage}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}