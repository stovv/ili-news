import React from 'react';
import Router from 'next/router';
import {connect} from 'react-redux';
import { Flex, Box } from 'rebass';
import {getDrafts, createNewDraft} from '../../store/smisolActions.react';
import { Form, Menus, Cards } from '../../components';

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
        const { drafts, isLoggedIn } = this.props;
        if (typeof window === "undefined"){
            return null
        }
        
        if (!isLoggedIn){
            Router.push('/login');
            return null;
        }
        return (
            <>
                <Menus.HeaderRedactor/>
                <Flex height="100vh">
                    <Box width={2/12} >
                        <Menus.LeftMenu/>
                    </Box>
                    <Box width={10/12}>
                        <p><Form.Buttons.SimpleButton onClick={()=>this.handleNewDraft()}>+ Create New</Form.Buttons.SimpleButton></p>
                        {
                            drafts.map((draft, index)=>
                                <React.Fragment key={index}>
                                    <Cards.Draft draft={draft}/>
                                </React.Fragment>
                            )
                        }
                    </Box>
                </Flex>
            </>
        );
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