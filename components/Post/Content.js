import { Fragment } from 'react';
import dynamic from "next/dynamic";

import Embed from './Blocks/Embed';

//const Embed = dynamic(() => import("./Blocks/Embed"));
const Image = dynamic(() => import("./Blocks/Image"));
const Heading = dynamic(() => import("./Blocks/Heading"));
const Paragraph = dynamic(() => import("./Blocks/Paragraph"));



const BlocksMapping = {
    header: Heading,
    paragraph: Paragraph,
    // callout: null,
    image: Image,
    // quote: null,
    embed: Embed,
    // list: null,
    // readmore: null,
    // raw: null
};

const UndefBlock = ({type}) => <p>UNDEFINED BLOCK! {type}</p>;

export default function PostContent({data: {blocks}}){
    return blocks.map((item, index)=>{
        const Block = BlocksMapping[item.type] === undefined ? UndefBlock : BlocksMapping[item.type];
        return (
            <Fragment key={index}>
                <Block {...item}/>
            </Fragment>
        );
    });
}

