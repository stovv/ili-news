import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from "styled-components";
import { Flex, Box } from 'rebass';

import { Icons } from "../../assets";
import { CardText } from "../Typography";
import {connect} from "react-redux";


const iconSpacing = {
    margin: "auto 9px auto 0"
}

class Comments extends React.Component {
    render(){
        const { threadId, theme, width } = this.props;
        // TODO: Remove after block done
        return(
            <></>
        );
    }
}

Comments.propTypes = {
    threadId: PropTypes.number.isRequired,
}

function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(withTheme(Comments));