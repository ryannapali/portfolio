import SunEditor, {buttonList} from "suneditor-react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default class Editor extends Component {
    constructor(props) {
        super(props)
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.state={
            contentToUpload:'',
            lastUpdate:Date.now(),
            contents:undefined,
            show:true,
        }
    }
    //
    //     clearEditor(){
    //         // const contents = this.state.contentToUpload
    //         // this.setState({
    //         //     contentToUpload: contents,
    //         //     lastUpdate:Date.now(),
    //         //     contents:null
    //         // });
    //         // console.log(this.state.contents);
    //         console.log(this.refs.editor.sate);
    //     console.log('destroyed?')
    //     this.setState({show:false,});
    // }

    handleChange(content){
        this.setState({contentToUpload:content},)
    }

    handleSubmit(){
        const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
        const text = this.state.contentToUpload;
        this.props.submit(title,text)
    }

    render(){
        return(
            <Form>
                <Form.Group  as={Row}>
                    <Col ><Form.Control ref="titleInput" placeholder="Enter Title" /></Col>
                    <Col ><Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit Blogpost
                    </Button></Col>
                </Form.Group>
                <SunEditor
                    onChange={this.handleChange}
                    setContents={this.state.contents}
                    setOptions={{
                    buttonList: buttonList.complex // Or Array of button list, eg. [['font', 'align'], ['image']]
                    // Other option
                    }}/>
            </Form>
        );
}

}