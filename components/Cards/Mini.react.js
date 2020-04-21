import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import {withTheme} from "styled-components";

import { Simple } from '../Images';
import TagLabel from "../Typography/Tag.react";
import {CardText} from "../Typography";

class Mini extends React.Component
{
    render(){
        const {heading, coverUrl, children, theme} = this.props;
        return(
            <Flex bg={theme.colors.backgroundPrimary} width="100%" minHeight="128px" maxHeight="128px"
                  sx={{
                      transition: "transform .1s ease-out",
                      "&:hover":{
                          boxShadow: "0px 5px 32px -5px rgba(0, 0, 0, 0.2)",
                          transform: "scale(1.03)"
                      }
                  }}>
                <Box width="128px">
                    <Simple url={coverUrl} />
                </Box>
                <Box ml={theme.spacing.xs} my="14px">
                    <TagLabel type="small" color={theme.text.hover}
                              margin={`0 0 ${theme.spacing.xs} 0`} textTransform="lowercase">
                        {heading}
                    </TagLabel>
                    <CardText type="small" maxWidth="160px" maxHeight="76px" color={theme.text.secondarySecondary}>
                        {children}
                    </CardText>
                </Box>
            </Flex>
        );
    };
}

Mini.propTypes = {
    heading: PropTypes.string.isRequired,
    coverUrl: PropTypes.string.isRequired,
    link: PropTypes.node.isRequired,
}

export default withTheme(Mini);