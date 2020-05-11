import React from 'react';
import { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';
import { Icons } from "../../assets";
import {Router} from "next/router";
import {Heading} from "../Typography";
import {Emoji} from "emoji-mart";


class HeaderRedactor extends React.Component {

    render(){
        const { theme } = this.props;

        return(
            <Flex height="64px" >
                <Flex ml="104px" mr="auto" my="auto">
                    <Emoji emoji='writing_hand' set='apple' size={24} style={{marginTop: "10px"}}/>
                    <Heading level={3} margin="0 0 0 5px" color={theme.text.hover} textTransform="lowercase" >смысл</Heading>
                </Flex>

                <Box ml="auto" bg={theme.colors.primary} width="64px" sx={{position: 'relative'}} >
                    <a href="/">
                        <Box sx={{position: 'absolute', top: "50%", left: "50%", transform: 'translate(-50%, -50%)'}}>
                            <Icons.CloseIcon />
                        </Box>
                    </a>
                </Box>
            </Flex>
        );
    }
}


export default withTheme(HeaderRedactor);