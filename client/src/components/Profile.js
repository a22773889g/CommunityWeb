import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { userInfo } from '../actions/userInfo'
import Nav from '../components/Nav'
import axios from 'axios'
class Profile extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      articles: [
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        },
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        },
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        },
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        },
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        },
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        },
        {
          link: 'https://pic.pimg.tw/weilife/1508759490-2807984048.jpg',
          like: 50,
          comment: 10
        }
      ],
      follower: [],
      following: []
    }
  }
  componentDidMount = ()=>{
    axios.get("http://localhost:3000/api/getFollowers",{withCredentials: true}).then((res)=>{
      console.log(res.data)
      this.setState({
        follower: res.data.data
      })
    })

    axios.get("http://localhost:3000/api/getFollowings",{withCredentials: true}).then((res)=>{
      console.log(res.data)
      this.setState({
        following: res.data.data
      })
    })
  }
  render() {
    return (
      <div>
        <Nav/>
        <div className="container">
          <div className="row">
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <img src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=de853a7ad9c451daf6f60bed8ec6355b/3b87e950352ac65cd568c457fff2b21193138aa1.jpg" className="headshot"></img>
            </div>
            <div className="col-sm">
                <p className="name">{this.props.userInfo.account}</p>
                <div className="row">
                  <div className="col-sm-3">{this.state.articles.length}貼文</div>
                  <div className="col-sm-3">{this.state.follower.length}追蹤者</div>
                  <div className="col-sm-3">{this.state.following.length}追蹤中</div>
                </div>
                <div className="row d-flex flex-column mt-4">
                  <div className="col-sm-6">{this.props.userInfo.name}</div>
                  <div className="col-sm-10">hello ,hihi</div>
                  
                </div>
            </div>
          </div>
            <hr className="mt-5"></hr>

          <div className="article mb-4">
          {
            this.state.articles.map((article,i)=>{

              return <div className="pic" key={i} style={{backgroundImage:`url(${article.link})` }}>
                  <div className="cover">
                    <i className="fas fa-heart">{article.like}</i>
                    <i className="fas fa-comment">{article.comment}</i>
                  </div>
              </div>
            })
          }     
          </div>
        </div>

      </div>
    )
  }
}
function mapStateToProp (state){
  return{
    userInfo: state.userInfo
  }
} 

export default connect(mapStateToProp,{
  userInfoAction: userInfo
})(Profile)