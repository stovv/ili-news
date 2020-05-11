import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, Box} from "rebass";

import { lightTheme } from "../../../theme/theme.react";
import SimpleImage from "../../Images/Simple.react";
import TagLabel from "../../Typography/Tag.react";

/*
caption: ""
file: {url: "https://xpan.ili-nnov.ru/uploads/Снимок-экрана-2020-04-21-в-11.33.26-1024x573_26e97fe961.png"}
stretched: false
withBackground: false
withBorder: false
reactionShown: false,*/

class Image extends React.Component {
    state={
        cover: null
    }

    render(){
        const { data, width } = this.props;

        if ( width > 1023 ){
            return(
                <Box width="100%" my="50px">
                    <SimpleImage height="400px" url={data.file.url} bgSize="contain"/>
                    <TagLabel textAlign="center" type="normal" color={lightTheme.text.secondary}>{data.caption}</TagLabel>
                </Box>
            );
        }else {
            return(
                <Box width="100%" my="10px">
                    <SimpleImage height="285px" url={data.file.url} bgSize="contain"/>
                    <TagLabel textAlign="center" type="normal" color={lightTheme.text.secondary}>{data.caption}</TagLabel>
                </Box>
            );
        }
    }
}


Image.propTypes = {
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(Image);