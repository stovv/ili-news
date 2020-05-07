import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Box } from 'rebass';

import {Lazy} from '../Images';
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
        wrap:{
            sx:{
                bottom: "30px",
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
    }
});

/*maxWidth={["576px"]} maxHeight={["116px"]}*/

class Large extends React.Component{
    render(){
        const { theme, heading, children, type, cover, tight, height} = this.props;
        var TextPosition = Types(theme)[type];
        if (TextPosition === undefined){
            TextPosition = Object.values(Types(theme))[0];
        }
        return (
            <Lazy cover={cover} blackout height={height} hover>
                    <Box  {...TextPosition.wrap}>
                        {
                            heading &&
                            <TagLabel type="large" color={theme.text.onPrimary} {...TextPosition.heading}
                                      textTransform="lowercase">{heading}</TagLabel>
                        }
                        <CardText type="large" {...TextPosition.text}
                                  color={theme.text.onPrimary}>{children}</CardText>
                    </Box>
            </Lazy>
        );
    }
}

Large.propTypes = {
    heading: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.string,
    type: PropTypes.string,
    cover: PropTypes.object,
    tight: PropTypes.bool,
}

export default withTheme(Large);