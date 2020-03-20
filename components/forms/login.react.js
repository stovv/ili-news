import React, {Component} from 'react';
import styled from 'styled-components';
import Head from 'next/head';

// TODO: Use normal style!

class Login extends Component {
   constructor(props) {
       super(props);
       this.state = {
           login: null,
           password: null,
           rememberMe: false,
       };
   }


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
           <>
           <Head>
               <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                    crossOrigin="anonymous"/>
           </Head>
           <main className="main-content" style={card_style}>
               <div className="bg-white rounded shadow-7 w-400 mw-100 p-6" >
                   <h5 className="mb-7">Sign into your account</h5>
                   <form id="login" onSubmit={this.handleSubmit} >
                       <div className="form-group">
                           <input onChange={event => this.setState({login: event.target.value})} 
                                type="text"
                                className="form-control"
                                name="phone_number"
                                placeholder="eg. user@email.com" />
                       </div>
                       <div className="form-group">
                           <input onChange={event => this.setState({password: event.target.value})} type="password" className="form-control"
                                  name="customer_pin"
                                  placeholder="Enter your pin"/>
                       </div>
                       <div className="form-group flexbox py-3">
                           <div className="">
                               <input type="checkbox" onChange={event => this.setState({rememberMe: event.target.checked})} className="remember"/>
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
           </>
       )
   }
}


export default Login;