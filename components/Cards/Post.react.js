import React from 'react';
import PropTypes from 'prop-types';
import {Box} from 'rebass';
import { withTheme } from 'styled-components';

import { Lazy } from '../Images';
import { TagLabel, CardText } from '../Typography';

class Post extends React.Component{

    render(){
        const { theme, float } = this.props;
        const {id, title, cover, created_at } = this.props.post || {};

        var date = new Date(created_at);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        const publishDate = date.toLocaleString("ru-RU", options).replace('г.', '');

        return (
            <Box height="100%" width="100%" >
                <Lazy cover={cover} maxWidth={["296px"]} maxHeight={["248px"]} overflow="visible" hover float={float}>
                    <Box bg={theme.colors.backgroundPrimary}
                         maxWidth={["264px"]} px={[theme.spacing.s]}
                         sx={{
                             position: "absolute",
                             bottom: 0,
                             right: 0,
                             transform: "translate(0, 65%)",
                         }}>

                        <TagLabel type="normal" color={theme.text.hover}
                                  textTransform="lowercase" margin={`${theme.spacing.xs} 0`}>
                            test
                        </TagLabel>
                        <CardText type="normal" maxWidth={["240px"]} margin="0">
                            {title}
                        </CardText>
                        <TagLabel type="small" color={theme.text.secondary} margin={`${theme.spacing.xs} 0`}>
                            {publishDate}
                        </TagLabel>
                    </Box>
                </Lazy>
            </Box>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    float: PropTypes.string
}

export default withTheme(Post);