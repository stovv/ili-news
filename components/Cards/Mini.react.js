import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import {withTheme} from "styled-components";

import {Lazy, Simple} from '../Images';
import TagLabel from "../Typography/Tag.react";
import {CardText} from "../Typography";
import {getImageLink} from "../Images/tools";
import {PostLink} from "../Links.react";

class Mini extends React.Component
{
    render(){
        const {heading, cover, children, theme, id, ...props} = this.props;
        if ( typeof cover === "undefined"){
            return (<></>);
        }

        return(
            <PostLink postId={id}>
                <Flex bg={theme.colors.backgroundPrimary} width="100%" minHeight="128px" maxHeight="128px"
                      sx={{
                          cursor: 'pointer',
                          transition: "all .4s ease-in-out",
                          "&:hover":{
                              boxShadow: "0px 10px 100px -5px rgba(0, 0, 0, 0.7)",
                              transform: "scale(1.00009)"
                          }
                      }}>
                    <Box width="128px">
                        <Simple url={getImageLink(cover, 'thumbnail')['url']} />
                    </Box>
                    <Box ml={theme.spacing.xs} my="14px">
                        <TagLabel type="small" color={theme.text.hover}
                                  margin={`0 0 ${theme.spacing.xs} 0`} textTransform="lowercase">
                            {heading}
                        </TagLabel>
                        <CardText hideOwerflow maxLines={4} type="small" width="156px" height="76px" color={theme.text.secondarySecondary}>
                            {children}
                        </CardText>
                    </Box>
                </Flex>
            </PostLink>
        );
    };
}

Mini.propTypes = {
    heading: PropTypes.string.isRequired,
    cover: PropTypes.object.isRequired,
    link: PropTypes.node.isRequired,
}

export default withTheme(Mini);