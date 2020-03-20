import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux';
import PleaseAuth from '../../components/forms/pleaseAuth.react.js';
import {getDrafts, createNewDraft} from '../../store/smisolActions.react';
import {Buttons} from '../../components';

class Drafts extends React.Component {
    constructor(props){
        super(props);
        this.handleNewDraft = this.handleNewDraft.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getDrafts(this.props.jwt, this.props.user_id));
    }

    handleNewDraft(){
        this.props.dispatch(createNewDraft(this.props.jwt, this.props.user_id));
        Router.push('/smisol/create');
    }

    render(){
        if (!this.props.isLoggedIn){
            return (<PleaseAuth/>);
        }
        return (<p>
            <Buttons.SimpleButton onClick={()=>this.handleNewDraft()}>+ Create New</Buttons.SimpleButton>
        </p>);
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.auth.user_id,
        jwt: state.auth.jwt,
        isLoggedIn: state.auth.isLoggedIn,
        drafts: state.smisol.drafts
    };
}
 
export default connect(mapStateToProps)(Drafts);