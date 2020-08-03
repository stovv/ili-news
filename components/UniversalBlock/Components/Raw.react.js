import React from 'react';
import { Box } from "rebass";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardText, TagLabel } from "../../Typography"


class Raw extends React.Component {
    render(){
        const { data, width } = this.props;
        return (
                width > 1023
                ?
                <Box mt="35px" mb="40px">
                    <CardText type="xxlarge" textAlign="center" margin="0 0 23px 0">« »</CardText>
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