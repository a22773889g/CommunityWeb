import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/post'
import Nav from '../components/Nav'
import Loading from '../components/Loading'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { findDOMNode } from 'react-dom'
import axios from 'axios'
import swal  from 'sweetalert'
class AddPost extends PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
       imageUrl: '',
       like: 0,
       loadinged: false,
       editorState: BraftEditor.createEditorState(null)
    }
  }
  
  componentDidMount = () =>{
    let context = this

    findDOMNode(this.refs.fileInput).addEventListener("change",() => {
      if (findDOMNode(this.refs.fileInput).files && findDOMNode(this.refs.fileInput).files[0]) {
        var FR= new FileReader()
        FR.onload = function(e) {
            context.setState({
              loadinged: true
            })
          let base64 = e.target.result.replace(/^data:image\/(png|jpeg);base64,/, "")
          axios.post('https://api.imgur.com/3/image',{image:base64},{headers:{
            "Content-type":"application/json",
            "Authorization": "Client-ID c2b4a7b241757bd"
          }}).then((res)=>{
            console.log(res)
            context.setState({
              imageUrl:res.data.data.link,
              loadinged: false
            })
          })
        }
        FR.readAsDataURL(findDOMNode(this.refs.fileInput).files[0]);
      }
    })
    
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
    console.log(this.state.editorState.toHTML())
  }

  addPost = () =>{
    const context = this
    const { editorState, like, imageUrl } = this.state
    const { userid, account, name , avatar } = this.props.userInfo
    axios.post('http://localhost:3000/api/addPost',{
      userid: userid,
      account: account,
      author: name,
      avatar: avatar,
      content: editorState.toHTML(),
      like: like,
      image: imageUrl
    },{withCredentials: true}).then((res)=>{
      swal({
        title: "發布成功",
        icon: "success",
        }).then((val)=>{
          if(val){
          context.props.addPost({
            userid: userid,
            account: account,
            author: name,
            avatar: avatar,
            content: editorState.toHTML(),
            like: like,
            image: imageUrl,
            comments:[]
          })
          context.props.history.replace('/')
        }
        })
      
    })
  }
render() {
    return (
      <div>
        <Nav/>
        <div className="container d-flex flex-column align-items-center">
        
          <div className="custom-file">
            <input id="logo" type="file" className="custom-file-input"  ref="fileInput"/>
            <label htmlFor="logo" className="custom-file-label">Choose file...</label>
          </div>

          {this.state.loadinged ? <Loading/> :   <div className="showImage mt-3" style={{backgroundImage:`url(${this.state.imageUrl})`}}></div> }

          <hr/>

          <BraftEditor
            value={this.state.editorState}
            onChange={this.handleChange}
          />

          <button className="postBtn mb-3" onClick={this.addPost}>發布文章</button>
        </div>
      </div>
      
    )
  }
}
function mapStateToProp (state){
    return{
      userInfo: state.userInfo,
      post: state.post
    }
  } 
  
export default connect(mapStateToProp,{
    addPost: addPost
})(AddPost)
