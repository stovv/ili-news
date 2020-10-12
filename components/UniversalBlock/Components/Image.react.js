import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SimpleImage from "../../Images/Simple.react";
import TagLabel from "../../Typography/Tag.react";
import { Box } from 'reflexbox';

class Image extends React.Component {
    state = {
        cover: null
    }

    render(){
        const { data, width } = this.props;

        if ( width > 1023 ){
            return(
                <Box width="100%" my="50px">
                    <SimpleImage height="400px" url={data.file.url} bgSize="contain"/>
                    <TagLabel textAlign="center" type="normal" color={"var(--text-secondary)"}>{data.caption}</TagLabel>
                </Box>
            );
        }else {
            return(
                <Box width="100%" my="10px">
                    <SimpleImage height="285px" url={data.file.url} bgSize="contain"/>
                    <TagLabel textAlign="center" type="normal" color={"var(--text-secondary)"}>{data.caption}</TagLabel>
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