import React, {Component} from 'react';
import styled from 'styled-components';

// TODO: Use normal style!

class LoginForm extends Component {
   constructor(props) {
       super(props);
       this.state = {
           login: null,
           password: null,
           rememberMe: false,
       };
   }


   handleLoginChange = (e) => {
       this.setState({
           login: e.target.value
       });
   };


   handlePasswordChange = (e) => {
       this.setState({
           password: e.target.value
       });
   };


   handleRememberMeCheck = (e) => {
       this.setState({
           rememberMe: e.target.checked
       });
   };


   handleSubmit = async (event) => {
       event.preventDefault();
       this.props.onChange(this.state);
   };


   render() {
       // Only for test use!
       var card_style = {
        width: '30vw',
        height: '30vh',
        margin: '35vh 35vw'
       }
       return (
           <main className="main-content" style={card_style}>
               <div className="bg-white rounded shadow-7 w-400 mw-100 p-6" >
                   <h5 className="mb-7">Sign into your account</h5>
                   <form id="login" onSubmit={this.handleSubmit} >
                       <div className="form-group">
                           <input onChange={this.handleLoginChange} type="text" className="form-control"
                                  name="phone_number"
                                  placeholder="eg. user@email.com" />
                       </div>
                       <div className="form-group">
                           <input onChange={this.handlePasswordChange} type="password" className="form-control"
                                  name="customer_pin"
                                  placeholder="Enter your pin"/>
                       </div>
                       <div className="form-group flexbox py-3">
                           <div className="">
                               <input type="checkbox" onChange={this.handleRememberMeCheck} className="remember"/>
                               <label className="remember">Remember me</label>
                           </div>
                           <a className="text-muted small-2" href="/reset">Forgot password?</a>
                       </div>
                       <div className="form-group">
                           <button className="btn btn-block btn-primary" type="submit">Login</button>
                       </div>
                   </form>
                   <hr className="w-30"/>
                   <p className="text-center text-muted small-2">Don't have an account? <a href="/register">Register here</a></p>
               </div>
           </main>
       )
   }
}


export default LoginForm;