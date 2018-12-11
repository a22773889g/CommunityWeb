import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { userInfo } from '../actions/userInfo'
import Nav from '../components/Nav'
import axios from 'axios'
class Profile extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      articles: [],
      follower: [],
      following: [],
      profile: {},
      followed:false,
      loading: false
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.match.params.userid)
    this.getFollowers(nextProps.match.params.userid)
    this.getFollowings(nextProps.match.params.userid)
    this.getPosts(nextProps.match.params.userid)
    this.getProfile(nextProps.match.params.userid)
    this.checkFollowed()
  }
  componentDidMount = ()=>{
    this.getFollowers()
    this.getFollowings()
    this.getPosts()
    this.getProfile()
  }

  getFollowers = (userid=this.props.userInfo.userid)=>{
    axios.get(`http://localhost:3000/api/getFollowers?userid=${userid}`,{withCredentials: true}).then((res)=>{
      this.setState({
        follower: res.data.data
      })
    })
  }
  getFollowings = (userid=this.props.userInfo.userid)=>{
    axios.get(`http://localhost:3000/api/getFollowings?userid=${userid}`,{withCredentials: true}).then((res)=>{
      this.setState({
        following: res.data.data
      })
    })
  }
  getPosts = ()=>{
    axios.get(`http://localhost:3000/api/getPosts`,{withCredentials: true}).then((res)=>{
      this.setState({
        articles: res.data.data
      })
    })
  }

  getProfile = (userid=this.props.userInfo.userid)=>{
    axios.get(`http://localhost:3000/api/getUser?userid=${userid}`,{withCredentials: true}).then((res)=>{
      console.log(res.data.data)
      this.setState({
        profile: res.data.data
      })
    })
  }

  checkFollowed = ()=>{
    if(this.state.following){
      this.state.following.forEach((val)=>{
        if(val.userid == this.state.profile.userid){
          this.setState({
            followed: true
          })
        }else{
          this.setState({
            followed: false
          })
        }
      })
    }
  }

  follow = (user) =>{
    axios.post(`http://localhost:3000/api/follow`,{userid:this.props.userInfo.userid,followingid:user.userid},{withCredentials: true}).then((res)=>{
      if(this.state.following){
        this.setState({
          follower: [...this.state.follower,user]
        })
      }else{
        this.setState({
          follower:[user]
        })
      }
    })
  }
  render() {
    const {articles,follower,following,profile} = this.state
    return (
      <div>
        <Nav/>
        <div className="container d-flex flex-column justify-content-center">
          <div className="row">
            <div className="col-sm-4 d-flex justify-content-center align-items-center">
              <img src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=de853a7ad9c451daf6f60bed8ec6355b/3b87e950352ac65cd568c457fff2b21193138aa1.jpg" className="headshot"></img>
            </div>
            <div className="col-sm">
                <div className="name">
                  {profile.account?profile.account:this.props.userInfo.account}
                  {
                    this.props.userInfo.userid!=this.props.match.params.userid ?
                      !this.state.followed?<button className="ml-3 follow" onClick={()=>{this.follow(profile)}}>追蹤</button>
                      :
                      <button className="ml-3 followed">已追蹤</button>
                    :''
                  }
                </div>
                
                <div className="row mt-3">
                  <div className="col-sm-3">{articles?articles.length:0}貼文</div>
                  <div className="col-sm-3">{follower?follower.length:0}追蹤者</div>
                  <div className="col-sm-3">{following?following.length:0}追蹤中</div>
                </div>
                <div className="row d-flex flex-column mt-4">
                  <div className="col-sm-6">{profile.name?profile.name:this.props.userInfo.name}</div>
                  <div className="col-sm-10">hello ,hihi</div>
                  
                </div>
            </div>
          </div>
            <hr className="mt-5"></hr>

          <div className="article mb-4">
          { articles.length?
            articles.map((article,i)=>{

              return <div className="pic" key={i} style={{backgroundImage:`url(${article.image})` }}>
                  <div className="cover">
                    <i className="fas fa-heart">{article.like}</i>
                    <i className="fas fa-comment">{article.comments?article.comments.length:0}</i>
                  </div>
              </div>
            })
            :
            ''
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