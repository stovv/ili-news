import React from 'react';
import PropTypes from 'prop-types';
import {Box} from 'rebass';
import { withTheme } from 'styled-components';

import { Lazy } from '../Images';
import { TagLabel, CardText } from '../Typography';
import { PostLink } from "../Links.react";

class Post extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext){
        return false;
    }

    render(){
        const { theme, float, noPreFetch } = this.props;
        const {id, title, cover, publish_at, rubric } = this.props.post || {};

        var date = new Date(publish_at);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        const publishDate = date.toLocaleString("ru-RU", options).replace('г.', '');

        return (
            <PostLink postId={id} prefetch={!noPreFetch}>
                <Box height="100%" width="100%" >
                    <Lazy cover={cover} maxWidth={["296px"]} maxHeight={["248px"]} overflow="visible" hover float={float}>
                        <Box bg={theme.colors.backgroundPrimary}
                             maxWidth={["264px"]} px={[theme.spacing.s]}
                             sx={{
                                 position: "absolute",
                                 bottom: "-75px",
                                 right: 0
                             }}>

                            <TagLabel type="normal" color={theme.text.hover}
                                      textTransform="lowercase" margin={`${theme.spacing.xs} 0`}>
                                {rubric.title}
                            </TagLabel>
                            <CardText type="normal" maxWidth={["240px"]} margin="0" color={theme.text.secondarySecondary}>
                                {title}
                            </CardText>
                            <TagLabel type="small" color={theme.text.secondary} margin={`${theme.spacing.xs} 0`}>
                                {publishDate}
                            </TagLabel>
                        </Box>
                    </Lazy>
                </Box>
            </PostLink>
        );
    }
}

/*
*
* */

Post.propTypes = {
    post: PropTypes.object.isRequired,
    float: PropTypes.string,
    noPreFetch: PropTypes.bool,
}

export default withTheme(Post);