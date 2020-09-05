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
        const { heading, cover, children, theme, slug, full, transparent, onClick } = this.props;
//        if ( typeof cover === "undefined" ) return null;

        return(
            <PostLink postSlug={slug}>
                <Flex bg={theme.colors.backgroundPrimary} width="100%" onClick={onClick}
                      minHeight="128px" maxHeight={full ? undefined : "128px"}
                      sx={{
                          cursor: 'pointer',
                          transition: "all .3s ease-out",
                          overflow: "hidden",
                          "&:hover":{
                              boxShadow: "0px 5px 30px -5px rgba(0, 0, 0, 0.4)",
                              transform: "translateY(-3px)"
                          }
                      }}>
                    <Box width={ full ? 2/3 : "128px"}>
                        <Simple url={getImageLink(cover, 'thumbnail')['url']} />
                    </Box>
                    <Box ml={theme.spacing.xs} my="14px">
                        <TagLabel type="small" color={theme.text.hover}
                                  margin={`0 0 ${theme.spacing.xs} 0`} textTransform="lowercase">
                            {heading}
                        </TagLabel>
                        <CardText hideOwerflow maxLines={3} margin={"0"} type="small" width={ full ? 1/3 : "156px"}
                                  height={ full ? "100%" : "60px"} color={theme.text.secondarySecondary}>
                            {children}
                        </CardText>
                    </Box>
                </Flex>
            </PostLink>
        );
    };
}

Mini.propTypes = {
    heading: PropTypes.string,
    cover: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    full: PropTypes.bool,
    transparent: PropTypes.bool
}

export default withTheme(Mini);