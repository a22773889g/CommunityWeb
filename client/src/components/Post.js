import React, { PureComponent } from 'react'
export default class Post extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            image: "asdas",
            article:"",
            like: false
        }
    }
    changeLike = () =>{
        this.setState({
            like : !this.state.like
        })
    }
    render() {
    return (
        <div className="container">
            <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src="https://images.gamme.com.tw/news2/2016/11/05/qZqYnaWWlKWVqqQ.jpg"></img>
                <div className="card-body">
                    {this.state.like ? <i className="fas fa-heart" onClick={this.changeLike}></i>:<i className="far fa-heart" onClick={this.changeLike}></i>}
                    <i className="pl-2 far fa-comment"></i>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <input className="form-control" placeholder="留言..."></input>
                        <i className="pl-3 fas fa-ellipsis-h"></i>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}
