import React from 'react';
import { Box } from "rebass";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Raw extends React.Component {
    render(){
        const { data, width } = this.props;
        return (
            <Box mt="35px" mb="40px">
                <div dangerouslySetInnerHTML={{__html: data.html}}/>
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