import React from 'react';
import Router from "next/router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';
import { Emoji } from "emoji-mart";


import { Form } from "../index";
import { Icons } from "../../assets";
import { Heading } from "../Typography";
import { createNewDraft } from "../../store/smisolActions.react";


class HeaderRedactor extends React.Component {

    constructor(props) {
        super(props);
        this.handleNewDraft = this.handleNewDraft.bind(this);
    }

    handleNewDraft(){
        if (typeof window !== "undefined"){
            this.props.dispatch(createNewDraft())
                .then(()=>{
                    Router.push("/smisl/create");
                })
                .catch(reason=>{
                    console.log("REASON", reason);
                });
        }
    }

    render(){
        const { theme, type } = this.props;

        return(
            <Flex height="64px" bg={theme.colors.backgroundPrimary}>
                {
                    type === "create" &&
                    <Box bg={theme.colors.backgroundSecondary} width="64px" sx={{position: 'relative', cursor: 'pointer'}}>
                        <a href="/smisl/drafts">
                            <Box sx={{
                                position: 'absolute',
                                top: "50%",
                                left: "50%",
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Icons.ArrowIcon />
                            </Box>
                        </a>
                    </Box>
                }
                {
                    type === "preview" &&
                    <Box bg={theme.colors.backgroundSecondary} width="64px" sx={{position: 'relative', cursor: 'pointer'}}>
                        <a href="/smisl/create">
                            <Box sx={{
                                position: 'absolute',
                                top: "50%",
                                left: "50%",
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <Icons.ArrowIcon />
                            </Box>
                        </a>
                    </Box>
                }
                <Flex ml={["20px", "30px","80px"]} mr="auto" my="auto">
                    <Heading level={3} margin="0 0 0 5px" color={theme.text.hover}><u>смысл</u></Heading>
                    <Box mt="auto">
                        <Emoji emoji='writing_hand' set='apple' size={24} />
                    </Box>
                </Flex>

                <Flex ml="auto">

                    {
                        (type === "create" || type === "preview")
                            ? <></>
                            : <Box width="64px" sx={{
                                position: 'relative',
                                transition: 'all 0.4s ease-out',
                                cursor: 'pointer',
                                "&:hover":{
                                    backgroundColor: theme.colors.primary,
                                    "svg":{
                                        "fill": "#fff"
                                    }
                                }
                            }}>
                                <Box sx={{position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}}>
                                    <Icons.Plus onClick={()=>this.handleNewDraft()}/>
                                </Box>
                            </Box>
                    }
                    {
                        type === "create"
                            ? <Box bg={theme.colors.primary} width="64px" sx={{position: 'relative', cursor: 'pointer'}} >
                                <a href="/smisl/preview">
                                    <Box sx={{position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}}>
                                        <Icons.EyeIcon stroke="#ffffff"/>
                                    </Box>
                                </a>
                            </Box>
                            : (
                                type === "preview"
                                 ? <></>
                                 : <Box bg={theme.colors.primary} width="64px" sx={{position: 'relative'}} >
                                        <a href="/">
                                            <Box sx={{
                                                position: 'absolute',
                                                top: "50%",
                                                left: "50%",
                                                transform: 'translate(-50%, -50%)'
                                            }}>
                                                <Icons.CloseIcon/>
                                            </Box>
                                        </a>
                                    </Box>
                            )
                    }
                </Flex>
            </Flex>
        );
    }
}

HeaderRedactor.propTypes = {
    type: PropTypes.string,
}

export default connect()(withTheme(HeaderRedactor));