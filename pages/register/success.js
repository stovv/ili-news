import React from "react";
import Router from 'next/router';
import { connect } from 'react-redux';

import {Auth, Common} from '../../actions';

class SuccessPage extends React.Component{
    componentDidMount() {
        const { registered, dispatch } = this.props;
        // TODO: check confirm state on backend
        dispatch(Common.notify('Email подтвержден!'));
        if (registered){
            dispatch(Common.notify('Email подтвержден!\nТеперь надо залогиниться',
                "var(--backgroundPrimary)", "var(--text-secondarySecondary)")
            );
            dispatch(Auth.setRegisterBad());
        }
        Router.push('/');
    }

    render(){
        return null;
        //TODO: Create form of success registration
        // return (
        //     // <Flex height="100vh" width="100vw" bg={theme.colors.backgroundInverted} justidyContent={"center"}>
        //     //     <Box maxWidth={"40vw"} height="100%">
        //     //         Вы успешно зарегестрированы!
        //     //     </Box>
        //     // </Flex>
        // );
    }
}

function mapStateToProps(state){
    return {
        registered: state.auth.registered
    }
}

export default connect(mapStateToProps)(SuccessPage);
