import React, { PureComponent } from 'react'
import Nav from '../components/Nav'
import { findDOMNode } from 'react-dom'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { addPost } from '../actions/post'
import swal from 'sweetalert'
import { Redirect } from 'react-router-dom'
class AddPost extends PureComponent {
    constructor(props) {
      super(props)
    
      this.state = {
         imageURL:'',
         editorState: null,
         outputHTML: '<p></p>'
      }
    }
  
    componentDidMount = () =>{
        const context = this;
        findDOMNode(this.refs.fileInput).addEventListener("change",() => {
            if (findDOMNode(this.refs.fileInput).files && findDOMNode(this.refs.fileInput).files[0]) {
            var FR= new FileReader();
            FR.onload = function(e) {
              let base64 = e.target.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
              axios.post('https://api.imgur.com/3/image',{'image': base64},{headers:{"Authorization":"Client-ID c2b4a7b241757bd"}}).then((image)=>{
                  context.setState({
                      imageURL: image.data.data.link
                  })
            })
            };
            FR.readAsDataURL(findDOMNode(this.refs.fileInput).files[0]);
        }
        });
      }

    handleChange = (editorState) => {
      this.setState({ editorState,outputHTML: editorState.toHTML() })
    }
    
    addPost = () =>{
        let context = this

        axios.post('http://localhost:3000/api/addPost',
        {   
            author: context.props.userInfo.account,
            avatar: context.props.userInfo.avatar,
            image: context.state.imageURL,
            content: context.state.outputHTML,
            like: 0 
        }).then((res)=>{
            swal({
                title: "發布成功",
                icon: "success",
                button: "OK",
              }).then((value)=>{
                  return <Redirect to={`/profile/:${context.props.userInfo.account}`}/>
              })
        })
    }
  render() {
    return (
        <div>
            <Nav/>
            <div className="container">
                <div className="custom-file">
                    <input id="logo" type="file" className="custom-file-input" ref="fileInput"/>
                    <label htmlFor="logo" className="custom-file-label">Choose file...</label>
                </div> 
                <hr></hr>
                <div className="show">
                    <div ref="show" className="image mb-2"  style={{ backgroundImage: `url(${this.state.imageURL})` }}></div>
                    <BraftEditor
                    value={this.state.editorState}
                    onChange={this.handleChange}
                    />
                    <button className="submit" onClick={this.addPost}>發布文章</button>
                </div>
            </div>
        </div>
    )
  }
}
function mapStateToProp (state){
    return{
        post: state.post,
        userInfo: state.userInfo
    }
  } 
  
  export default connect(mapStateToProp,{
    addPostAction: addPost
  })(AddPost)