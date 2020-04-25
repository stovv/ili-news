import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux';
import {getDrafts, createNewDraft} from '../../store/smisolActions.react';
import { Form } from '../../components';

class Drafts extends React.Component {
    constructor(props){
        super(props);
        this.handleNewDraft = this.handleNewDraft.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getDrafts(this.props.user_id));
    }

    handleNewDraft(){
        if (typeof window !== "undefined"){
            this.props.dispatch(createNewDraft())
                .then(response=>{

                    Router.push("/smisol/create");
                })
                .catch(reason=>{
                    console.log("REASON", reason);
                });
        }
    }

    render(){
        if (typeof window === "undefined"){
            return null
        }
        
        if (!this.props.isLoggedIn){
            Router.push('/smisol/create');
            return null;
        }
        return (<p>
            <Form.Buttons.SimpleButton onClick={()=>this.handleNewDraft()}>+ Create New</Form.Buttons.SimpleButton>
        </p>);
    }
}

function mapStateToProps(state) {
    return {
        user_id: state.auth.user_id,
        isLoggedIn: state.auth.isLoggedIn,
        drafts: state.smisol.drafts
    };
}
 
export default connect(mapStateToProps)(Drafts);