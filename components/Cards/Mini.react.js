import React from 'react';
import PropTypes from 'prop-types';

import {Lazy, Simple} from '../Images';
import TagLabel from "../Typography/Tag.react";
import {CardText} from "../Typography";
import {getImageLink} from "../Images/tools";
import {PostLink} from "../Links.react";
import { Flex, Box } from 'reflexbox';
import styles from './styles/mini.module.css';

class Mini extends React.Component
{
    render(){
        const { heading, cover, children, slug, full, transparent, onClick } = this.props;
//        if ( typeof cover === "undefined" ) return null;

        return(
            <PostLink postSlug={slug}>
                <Flex bg={"var(--backgroundPrimary)"} width="100%" onClick={onClick}
                      minHeight="128px" maxHeight={full ? undefined : "128px"}
                      className={styles.miniHover}
                      sx={{
                          cursor: 'pointer',
                          transition: "all .3s ease-out",
                          overflow: "hidden",
                      }}>
                    <Box width={ full ? 2/3 : "128px"}>
                        <Simple url={getImageLink(cover, 'thumbnail')['url']} />
                    </Box>
                    <Box ml={"var(--spacing-xs)"} my="14px">
                        <TagLabel type="small" color={"var(--text-hover)"}
                                  margin={`0 0 ${"var(--spacing-xs)"} 0`} textTransform="lowercase">
                            {heading}
                        </TagLabel>
                        <CardText maxLines={3} margin={"1em 0"} type="small" width={ full ? 1/3 : "156px"}
                                  height={ full ? "100%" : "60px"} color={"var(--text-secondarySecondary)"}>
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

export default Mini;