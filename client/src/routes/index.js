import React from 'react'

import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import App from '../components/App';
import Profile from '../components/Profile';
import Login from '../components/Login';
import AddPost from '../components/AddPost' 
export default (
  <AnimatedSwitch 
    atEnter={{ opacity: 0 }}
    atLeave={{ opacity: 0 }}
    atActive={{ opacity: 1 }}
    className="switch-wrapper"
  >
      <Route exact path="/" component={ App } />
      <Route path="/profile/:account" component={ Profile } />
      <Route path="/login" component={ Login } />
      <Route path="/addPost" component={ AddPost } />
  </AnimatedSwitch>
)


      
