import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { userInfo } from '../actions/userInfo'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
class Nav extends PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
       isSearch: false,
       result: [],
       logined: true
    }
  }
  componentWillMount = ()=>{
    if(!this.props.userInfo.account){
      axios.get("http://localhost:3000/api/getUser",{withCredentials: true}).then((res)=>{
        if(res.data.result===-1){
          this.setState({
            logined: false
          })
        }else{
          this.props.userInfoAction(res.data[0])
          this.setState({
            logined: true
          })
        }
      })
    }else{
      this.setState({
        logined: true
      })
    }
  }
  search = (event) =>{
    const value = event.target.value;
    if(value){
      axios.get(`http://localhost:3000/api/search?account=${value}`).then((res)=>{
        console.log(res.data.data);
          this.setState({
            result: res.data.data,
            isSearch: true
        })
      })
    }else{
      this.setState({
        isSearch: false
      })
    }
  }

  render() {
    return (
      !this.state.logined ? <Redirect to="/login"/>
      :
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <div className="container d-flex justify-content-between">
            <div className="navbar-brand d-flex align-items-center">
              <i className="fas fa-skull"></i>
              <Link to="/">XXX.XXX</Link>
            </div>
           <div className="search d-flex align-items-center pl-2">
              <input placeholder="搜尋" onChange={this.search} />
              <i className="fas fa-search"></i>
              {
                this.state.isSearch? 
                <div className="searchModal">
                  <div className="arrow"></div>
                  <div className="content">
                    {
                      this.state.result.length?this.state.result.map((val,i)=>{
                      return <a key={i} className="searchUser">
                              <img src={val.avatar} className="searchAvatar"></img>
                              <span>{val.name}</span>
                      </a>
                     })
                     :
                     <span>查無結果。</span>
                    }
                  </div>
                </div>
                :<div></div>
              }
            </div>
            <nav className="d-flex justify-content-between">
              <Link to="#"><i className="p-2 far fa-image"></i></Link>
              <Link to="#"><i className="p-2 far fa-comment"></i></Link>
              <Link to={`/profile/${this.props.userInfo.account}`}><i className="p-2 far fa-user-circle"></i></Link>
            </nav>
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
})(Nav)