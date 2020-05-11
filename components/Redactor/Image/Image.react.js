import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
        const { data } = this.props;

        return(
            <Box width="100%" my="50px">
                <SimpleImage height="400px" url={data.file.url} bgSize="contain"/>
                <TagLabel textAlign="center" type="normal" color={lightTheme.text.secondary}>{data.caption}</TagLabel>
            </Box>
        );
    }
}


Image.propTypes = {
    data: PropTypes.object,
}

export default Image;