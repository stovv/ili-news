import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Box } from 'rebass';

import {Simple} from '../Images';
import { TagLabel, CardText } from '../Typography';


const Types =(theme)=> ({
    bottomLeft: {
        text: {
            position: "absolute",
            bottom: ["4px"],
            left: theme.spacing.m,
            maxWidth: "576px"
        }
    },
    topRight: {
        wrap:{
            sx:{
                top: "30px",
                position: "absolute",
                right: theme.spacing.m,
            }
        },
        heading:{
            textAlign: "right",
            margin: `0 0 ${theme.spacing.m} 0`
        },
        text:{
            margin: "0",
            textAlign: "right",
            maxHeight: "96px",
            maxWidth: "460px",
        }
    },
    bottomRight: {
        wrap:{},
        heading:{},
        text:{}
    }
});

class Large extends React.Component{
    render(){
        const { theme, heading, children, type, url, tight, full} = this.props;
        var TextPosition = Types(theme)[type];
        if (TextPosition === undefined){
            TextPosition = Object.values(Types(theme))[0];
        }
        return (

            <Simple url={url} maxWidth={!full && "624px"} blackout
                    transform={tight && "translate(0, -20%)"} hover>
                    <Box maxWidth={["576px"]} maxHeight={["116px"]} {...TextPosition.wrap}>
                        {
                            heading &&
                            <TagLabel type="large" color={theme.text.onPrimary} {...TextPosition.heading}
                                      textTransform="lowercase">{heading}</TagLabel>
                        }
                        <CardText type="large" {...TextPosition.text}
                                  color={theme.text.onPrimary}>{children}</CardText>
                    </Box>
            </Simple>
        );
    }
}

Large.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    tight: PropTypes.bool,
    full: PropTypes.bool,
}

export default withTheme(Large);