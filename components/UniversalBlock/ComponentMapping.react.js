import Raw from "./Components/Raw.react";
import * as Typography from "../Typography";
import Image from "./Components/Image.react";
import Quote from "./Components/Quote.react";
import Embed from "./Components/Embed.react";
import Callout from './Components/Callout.react';
import ReadMore from "./Components/ReadMore.react";


import {
    TurboEmbed,
    TurboHeading, TurboImage, TurboParagraph, TurboQuote
} from './TurboComponents';

const Components = {
    header: Typography.Heading,
    paragraph: Typography.Paragraph,
    callout: Callout,
    image: Image,
    quote: Quote,
    embed: Embed,
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