import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { userInfo } from '../actions/userInfo'
import Post from './Post'
import Nav from '../components/Nav'
class App extends PureComponent {
  
  render() {
    return (
      <div>
        <Nav/>
        <div className="container">
          <Post></Post>
          <Post></Post>
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
})(App)