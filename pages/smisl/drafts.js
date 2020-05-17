import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import Head from "next/head";
import { Flex, Box } from 'rebass';
import { withTheme } from "styled-components";


import { getDrafts, createNewDraft } from '../../store/smisolActions.react';
import { Typography, Menus, Cards } from '../../components';


class Drafts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drafts: [],
            updated: false
        };
    }

    componentDidMount() {
        if (!this.props.isLoggedIn && typeof window !== "undefined"){
            this.state.updated = true;
            Router.replace('/login');
        }
        this.props.dispatch(getDrafts(this.props.user_id))
            .then(() => {
                const { drafts, theme } = this.props;
                let items = [];

                for (let i = 0; i < drafts.length; i+= 3) {
                    items.push(
                        <Flex mt={theme.spacing.block}>
                            {
                                drafts.slice(i, i + 3).map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box width={1/3} height="250px">
                                            <Cards.Draft draft={item}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                    )
                }
                this.setState({ drafts: items });
            });
    }


    render(){
        const { drafts, isLoggedIn, theme } = this.props;
        return (
            <>
                <Head>
                    <title>Смысл | Черновики</title>
                </Head>
                <Menus.HeaderRedactor/>
                <Flex height="100vh">
                    <Box width={2/12} >
                        <Menus.LeftMenu/>
                    </Box>
                    <Box width={10/12}>
                        {
                            this.state.drafts.length > 0
                                ? this.state.drafts
                                : <Typography.Heading level={3} margin="50px auto" textAlign="center" width="100%" color={theme.text.editorSecondary}>
                                Пока нет ни одного черновика
                                </Typography.Heading>
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
 
export default connect(mapStateToProps)(withTheme(Drafts));