import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import {withTheme} from "styled-components";

import { Simple } from '../Images';
import TagLabel from "../Typography/Tag.react";
import {CardText} from "../Typography";
import {geImageLink} from "../Images/tools";

class Mini extends React.Component
{
    render(){
        const {heading, cover, children, theme, link, ...props} = this.props;
        console.log(cover);
        if ( typeof cover === "undefined"){
            return (<></>);
        }
        let Link = link;
        if (Link == null){
            Link = ({children})=><a>{children}</a>;
        }

        return(
            <Link {...props}>
                <Flex bg={theme.colors.backgroundPrimary} width="100%" minHeight="128px" maxHeight="128px"
                      sx={{
                          cursor: 'pointer',
                          transition: "transform .1s ease-out",
                          "&:hover":{
                              boxShadow: "0px 5px 32px -5px rgba(0, 0, 0, 0.2)",
                              transform: "scale(1.03)"
                          }
                      }}>
                    <Box width="128px">
                        <Simple url={geImageLink(cover, 'small')} />
                    </Box>
                    <Box ml={theme.spacing.xs} my="14px">
                        <TagLabel type="small" color={theme.text.hover}
                                  margin={`0 0 ${theme.spacing.xs} 0`} textTransform="lowercase">
                            {heading}
                        </TagLabel>
                        <CardText type="small" maxWidth="156px" maxHeight="76px" color={theme.text.secondarySecondary}>
                            {children}
                        </CardText>
                    </Box>
                </Flex>
            </Link>
        );
    };
}

Mini.propTypes = {
    heading: PropTypes.string.isRequired,
    cover: PropTypes.object.isRequired,
    link: PropTypes.node.isRequired,
}

export default withTheme(Mini);