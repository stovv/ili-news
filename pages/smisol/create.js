import dynamic from 'next/dynamic'
import React from 'react';
import {connect} from 'react-redux';
import {PleaseAuth} from '../../components';

class Create extends React.Component {

    shouldComponentUpdate(){
        return this.props.draft == null;
    }

    render(){
        let RedactorSSRSafe = dynamic(import('../../redactor'), {
            ssr: false
        });

        if (!this.props.isLoggedIn){
            return (<PleaseAuth/>);
        }
        if (this.props.draft == null){
            return (
                <p>NO Draft</p>
            );
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