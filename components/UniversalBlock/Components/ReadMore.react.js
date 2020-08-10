import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { Emoji } from "emoji-mart";
import { withTheme } from "styled-components";

import { Heading } from "../../Typography";
import { PostLink } from '../../Links.react';


class ReadMore extends React.Component {

    shouldComponentUpdate() {
        return !this.props.post;
    }

    render(){
        const { theme, post, data } = this.props;

        console.log("READ", data);

        if (data == null || data.length === 0){
            return null;
        }
        return (
            <Box bg={theme.colors.backgroundSecondary} px={theme.spacing.block} py={["24px"]} mb={["46px"]}>
                <Flex mb={["31px"]}>
                    <Heading level={3} color={theme.text.primary} margin="0 10px 0 0">
                        {
                            post
                                ? "Читать также"
                                : "Похожие статьи"
                        }
                    </Heading>
                    <Emoji emoji={{ id: 'thinking_face', skin: 3 }} size={32} />
                </Flex>
                {
                    // TODO Add Link
                    data.map((item, index) =>{
                        if ( item.post != null ){
                            item = item.post;
                        }
                        return(
                            <React.Fragment key={index}>
                                <PostLink postSlug={item.slug}>
                                    <Heading level={4} margin={`0 0 ${theme.spacing.m} 0`} hover
                                             color={theme.text.secondary}>{item.title}</Heading>
                                </PostLink>
                            </React.Fragment>
                        );
                    })
                }
            </Box>
        );
    }
}

ReadMore.propTypes = {
    post: PropTypes.bool,
    data: PropTypes.array.isRequired,
}

export default withTheme(ReadMore);