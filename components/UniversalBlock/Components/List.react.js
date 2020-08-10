import React from 'react';
import { Box } from "rebass";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Item = styled.ul`
    list-style: none;
    padding-inline-start: 0;
    display: flex;
    align-items: center;
`;

class List extends React.Component {
    render(){
        const { data: {items, style}  , width } = this.props;
        return null;
        // return (
        //     <Box mt="35px" mb="40px">
        //         <div dangerouslySetInnerHTML={{__html: data.html}}/>
        //     </Box>
        // );
    }
}



List.propTypes = {
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(List);