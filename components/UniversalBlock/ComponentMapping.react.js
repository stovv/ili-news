import Raw from "./Components/Raw.react";
import List from "./Components/List.react";
import * as Typography from "../Typography";
import Image from "./Components/Image.react";
import Quote from "./Components/Quote.react";
import Embed from "./Components/Embed.react";
import Paragraph from "./Components/Paragraph";
import Callout from './Components/Callout.react';
import ReadMore from "./Components/ReadMore.react";


import {
    TurboEmbed, TurboParagraph, TurboQuote,
    TurboHeading, TurboImage
} from './TurboComponents';

const Components = {
    header: Typography.Heading,
    paragraph: Paragraph,
    callout: Callout,
    image: Image,
    quote: Quote,
    embed: Embed,
    list: List,
    readmore: ReadMore,
    raw: Raw
};

const TurboComponents = {
    header: TurboHeading,
    paragraph: TurboParagraph,
    // callout: Callout,
    image: TurboImage,
    quote: TurboQuote,
    embed: TurboEmbed,
    // raw: Raw
};

export {
    TurboComponents,
    Components
}