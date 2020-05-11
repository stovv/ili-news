import dynamic from 'next/dynamic'
import Router from 'next/router';
import React from 'react';
import {connect} from 'react-redux';

class Create extends React.Component {

    shouldComponentUpdate(){
        return this.props.draft == null;
    }

    render(){
        let RedactorSSRSafe = dynamic(import('../../redactor'), {
            ssr: false
        });

        if (!this.props.isLoggedIn){
            if (typeof window !== "undefined"){
                Router.push('/login')
            }
            return null;
        }
        if (this.props.draft == null){
            Router.push('/smisol/drafts');
        }
        return (<RedactorSSRSafe/>);
    }
}



function mapStateToProps(state){
    return {
        draft: state.smisol.draft,
        isLoggedIn: state.auth.isLoggedIn
    };
}
 
export default connect(mapStateToProps)(Create);