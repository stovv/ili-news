import React from 'react';
import PropTypes from 'prop-types';

import RawBlock from "./Components/Raw.react";
import ImageBlock from './Components/Image.react';
import EmbedBlock from "./Components/Embed.react";
import QuoteBlock from "./Components/Quote.react";
import CalloutBlock from "./Components/Callout.react";
import ReadMoreBlock from "./Components/ReadMore.react";


import Components from "./ComponentMapping.react";

class UniversalBlock extends React.Component {

    render(){
        const { block } = this.props;
        let Block = Components[block.type];

        return (
            typeof Components[block.type] === "undefined"
                ? null
                : <Block data={block.data} />
        );
    }
}

UniversalBlock.propTypes = {
    block: PropTypes.object.isRequired,
}

export default UniversalBlock;

export {
    RawBlock,
    QuoteBlock,
    ImageBlock,
    EmbedBlock,
    CalloutBlock,
    ReadMoreBlock
}