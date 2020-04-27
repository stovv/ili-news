import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from "styled-components";
import { Flex, Box } from 'rebass';

import { Icons } from "../../assets";
import { CardText } from "../Typography";


const iconSpacing = {
    margin: "auto 9px auto 0"
}

class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            count: 10
        }
    }

    componentDidMount(){
        //TODO Add get count of comments
    }

    componentDidUpdate(){
        //TODO Add get count of comments
    }

    render(){
        const { threadId, theme } = this.props;
        return(
            <Flex ml="65px">
                <Box display="flex" mr="28px">
                    <Icons.CommentsIcon style={iconSpacing}/>
                    {
                        this.state.count > 0 &&
                        <CardText type="normal" margin="0" color={theme.text.secondary}>{this.state.count}</CardText>
                    }
                </Box>
            </Flex>
        );
    }
}

Comments.propTypes = {
    threadId: PropTypes.number.isRequired,
}

export default withTheme(Comments);