import SunEditor, {buttonList} from "suneditor-react";
import React, {Component} from "react";
import ReactDOM from "react-dom";

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
            <div>
                <form className="new-blogpost" onSubmit={this.handleWrongSubmit}>
                    <input
                        type="text"
                        ref="titleInput"
                        placeholder="Please Enter Your Title"
                    />
                </form>
                <SunEditor onChange={this.handleChange} setContents={this.state.contents}/>
                <button className="toggle-private" onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
}

}