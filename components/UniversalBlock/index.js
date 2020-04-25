import React from 'react';
import PropTypes from 'prop-types';

import Components from "./ComponentMapping.react";

class UniversalBlock extends React.Component {

    render(){
        const {block} = this.props;

        let Block =  Components[block.type];
        if (typeof  Components[block.type] === "undefined"){
            return null;
        }

        return <Block data={block.data} />;
    }
}

UniversalBlock.propTypes = {
    block: PropTypes.object.isRequired,
}

export default UniversalBlock;