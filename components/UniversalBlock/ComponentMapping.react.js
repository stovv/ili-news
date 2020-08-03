import * as Typography from "../Typography";
import Image from "./Components/Image.react";
import Quote from "./Components/Quote.react";
import Embed from "./Components/Embed.react";
import Callout from './Components/Callout.react';
import ReadMore from "./Components/ReadMore.react";


const Components = {
    header: Typography.Heading,
    paragraph: Typography.Paragraph,
    callout: Callout,
    image: Image,
    quote: Quote,
    embed: Embed,
    readmore: ReadMore
};

export default Components;