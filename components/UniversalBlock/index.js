import React from 'react';
import { Box } from 'rebass';
import PropTypes from 'prop-types';

// Block types
import RawBlock from "./Components/Raw.react";
import ImageBlock from './Components/Image.react';
import EmbedBlock from "./Components/Embed.react";
import QuoteBlock from "./Components/Quote.react";
import CalloutBlock from "./Components/Callout.react";
import ReadMoreBlock from "./Components/ReadMore.react";
import EventBanner from "./Components/EventBanner.react";

// Block mapping
import {
    Components,
    TurboComponents
} from "./ComponentMapping.react";

//
class UniversalBlock extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext){
        return false
    }

    render(){
        const { block } = this.props;
        let Block = Components[block.type];

        //console.log(block);

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


// Blocks to react dom
const PostBlocks = ({data}) =>(
    <Box px={"2px"}>
        {
            data.map((item, index)=>
                <React.Fragment key={index}>
                    <UniversalBlock block={item}/>
                </React.Fragment>
            )
        }
    </Box>
);

const TurboPostBlocks = (blocks) => {
    return blocks.map(block=>{
        if ( TurboComponents[block.type] === undefined) return '';
        return TurboComponents[block.type](block.data);
    }).join('');
};

export default PostBlocks;

export {
    RawBlock,
    QuoteBlock,
    ImageBlock,
    EmbedBlock,
    EventBanner,
    CalloutBlock,
    ReadMoreBlock,
    TurboPostBlocks
}