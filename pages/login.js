import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux'
import {LoginForm} from '../components/forms';
import {loginAction} from "../store/authActions.react";


class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isLoggedIn === true){
            Router.push('/');
        }
    }

    handleLoginSubmit(value){
        const {dispatch} = this.props;
        dispatch(loginAction(value));
    };

    render() {
        return (
            <div>
                <LoginForm onChange={this.handleLoginSubmit}/>
            </div>
        )
    }
}


function mapStateToProps(state) {
   return {
       user: state.auth.user,
       isLoggedIn: state.auth.isLoggedIn
   };
}

export default connect(mapStateToProps)(LoginPage);