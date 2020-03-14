import dynamic from 'next/dynamic'
import React from 'react';
import {connect} from 'react-redux';
import PleaseAuth from '../../components/please_auth.react.js';

class Create extends React.Component {
    render(){
        let RedactorSSRSafe = dynamic(import('../../components/redactor'), {
            ssr: false
        })

        if (!this.props.isLoggedIn){
            return (<PleaseAuth/>);
        }
        return (<RedactorSSRSafe jwt={this.props.jwt} user={this.props.user}/>);
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        jwt: state.auth.jwt,
        isLoggedIn: state.auth.isLoggedIn
    };
}
 
export default connect(mapStateToProps)(Create);