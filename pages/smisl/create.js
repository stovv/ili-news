import dynamic from 'next/dynamic'
import Router from 'next/router';
import React from 'react';
import {connect} from 'react-redux';

import { Menus } from '../../components';

class Create extends React.Component {

    shouldComponentUpdate(){
        return this.props.draft == null;
    }

    componentDidMount() {
        if (typeof window !== "undefined"){
            if (!this.props.isLoggedIn){
                Router.push('/login');
            }
            if (this.props.draft == null ){
                Router.push('/smisl/drafts');
            }
        }
    }

    render(){
        let RedactorSSRSafe = dynamic(import('../../redactor'), {
            ssr: false
        });

        return (
            <>
                <Menus.HeaderRedactor type="create"/>
                <RedactorSSRSafe/>
            </>
        );
    }
}



function mapStateToProps(state){
    return {
        draft: state.smisol.draft,
        isLoggedIn: state.auth.isLoggedIn
    };
}
 
export default connect(mapStateToProps)(Create);