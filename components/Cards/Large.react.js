import React from 'react';
import PropTypes from 'prop-types';

import {Lazy} from '../Images';
import { TagLabel, CardText } from '../Typography';
import { Box } from 'reflexbox';


const Types = {
    bottomLeft: {
        text: {
            position: "absolute",
            bottom: ["4px"],
            left: "var(--spacing-m)",
            maxWidth: "576px"
        }
    },
    topRight: {
        wrap:{
            sx:{
                top: "30px",
                position: "absolute",
                right: "var(--spacing-m)",
            }
        },
        heading:{
            textAlign: "right",
            margin: `0 0 var(--spacing-m) 0`
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
                right: "var(--spacing-m)",
            }
        },
        heading:{
            textAlign: "right",
            margin: `0 0 var(--spacing-m) 0`
        },
        text:{
            margin: "0",
            textAlign: "right",
            maxHeight: "96px",
            maxWidth: "460px",
        }
    }
};

/*maxWidth={*}*/

class Large extends React.Component{
    render(){
        const { heading, children, type, cover, tight, height} = this.props;
        let TextPosition = Types[type];
        if (TextPosition === undefined){
            TextPosition = Object.values(Types)[0];
        }
        return (
            <Lazy cover={cover} blackout height={height} hover>
                    <Box  {...TextPosition.wrap}>
                        {
                            heading &&
                            <TagLabel type="large" color={"var(--text-onPrimary)"} {...TextPosition.heading}
                                      textTransform="lowercase">{heading}</TagLabel>
                        }
                        <CardText type="large" {...TextPosition.text}
                                  color={"var(--text-onPrimary)"}>{children}</CardText>
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

export default Large;