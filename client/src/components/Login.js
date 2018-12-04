import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios' 
import { userInfo } from '../actions/userInfo'
import { connect } from 'react-redux'
import '../sass/login.css'
import swal  from 'sweetalert'
import '../sass/login.css'

class Login extends PureComponent {
    constructor(props) {
      super(props)
      this.state = {
        account: '',
		password: '',
		logined: false
      }
    }
    changeInput = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked: target.value;
        const name = target.name;
        this.setState({
          [name]: value,
        });
    }
    login = (e)=>{
        e.preventDefault()
		const { account, password } = this.state
		const context = this
        axios.post("http://localhost:3000/login",{account,password},{withCredentials: true}).then((res)=>{
            if (res.data.data){
				swal({
					title: "登入成功",
					icon: "success",
				  }).then(()=>{
					context.props.userInfoAction(res.data.data)
					context.setState({
						  logined: true
					  })
				  });
            }else{
				swal({
					title: "登入失敗",
					icon: "error",
				  })
            }
        })
    }
    render() {
        return (
			this.state.logined ? <Redirect to="/"/> :
        	<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
						<form className="login100-form validate-form">
							<span className="login100-form-title p-b-49">
								Login
							</span>

							<div className="wrap-input100 validate-input m-b-23" data-validate = "Account is reauired">
								<span className="label-input100">Account</span>
								<input className="input100" type="text" name="account" placeholder="Type your account" onChange={this.changeInput}/>
								<span className="focus-input100" data-symbol="&#xf206;"></span>
							</div>

							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<span className="label-input100">Password</span>
								<input className="input100" type="password" name="password" placeholder="Type your password" onChange={this.changeInput}/>
								<span className="focus-input100" data-symbol="&#xf190;"></span>
							</div>
							
							<div className="text-right p-t-8 p-b-31">
								<a href="#">
									Forgot password?
								</a>
							</div>
							
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn"></div>
									<button className="login100-form-btn" onClick={this.login}>
										Login
									</button>
								</div>
							</div>

							<div className="txt1 text-center p-t-54 p-b-20">
								<span>
									Or Sign Up Using
								</span>
							</div>

							<div className="flex-c-m">
								<a href="#" className="login100-social-item bg1">
									<i className="fab fa-facebook-f"></i>
								</a>

								<a href="#" className="login100-social-item bg3">
									<i className="fab fa-google"></i>
								</a>
							</div>

							<div className="flex-col-c p-t-155">
								<span className="txt1 p-b-17">
									Or Sign Up Using
								</span>

								<a href="#" className="txt2">
									Sign Up
								</a>
							</div>
						</form>
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
  })(Login)