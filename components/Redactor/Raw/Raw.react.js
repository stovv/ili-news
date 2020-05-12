import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Flex, Box} from "rebass";
import { connect } from 'react-redux';

import { lightTheme } from "../../../theme/theme.react";

class Raw extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            reactionShown: false,
            emoji: props.data.emoji || { id: 'ok_hand', skin: 3 },
            text: props.data ? props.data.text: null
        }
    }

    render(){
        const { data, width } = this.props;
        return (
                width > 1023
                ?
                <Box mt="35px" mb="40px">
                    <CardText type="xlarge" textAlign="center" margin="0 0 23px 0">« »</CardText>
                    <TagLabel type="large" weight="500" textAlign="center" margin="0">
                        <em><div dangerouslySetInnerHTML={data.text}/></em>
                    </TagLabel>
                </Box>
                :
                <Box mt="50px" mb="50px">
                    <CardText type="large" textAlign="center" margin="0 0 5px 0">« »</CardText>
                    <CardText type="normal" weight="500" textAlign="center" margin="0">
                        <em><div dangerouslySetInnerHTML={data.text}/></em>
                    </CardText>
                </Box>
        );

    }
}


Raw.propTypes = {
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(Raw);