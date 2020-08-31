import Heading from "./Heading.react";
import List from './List.react';
import Paragraph from './Paragraph.react';
import TagLabel from "./Tag.react";
import CardText from "./CardText.react";
import Common from './Common.react';


const ComposeFont = (store, defaultStore) => {
    return `
        font-family: ${store.fontFamily ? store.fontFamily : defaultStore.fontFamily};
        color: ${store.color ? store.color : defaultStore.color};
        text-align: ${props=> props.textAlign ? props.textAlign : (store.textAlign ? store.textAlign : defaultStore.textAlign) };
        font-weight: ${store.fontWeight ? store.fontWeight : defaultStore.fontWeight};
        font-stretch: ${store.fontStretch ? store.fontStretch : defaultStore.fontStretch};
        font-style: ${store.fontWeight ? store.fontStyle : defaultStore.fontStyle};
        letter-spacing: ${store.letterSpacing ? store.letterSpacing : defaultStore.letterSpacing};
        line-height: ${store.lineHeight ? store.lineHeight : defaultStore.lineHeight};
        
        ${((store.fontSize || defaultStore.fontSize) && (store.margin || defaultStore.margin) ) ?
        `
        @media screen and (max-width: 4000px){
          font-size: ${(store.fontSize && store.fontSize.laptop) ? store.fontSize.laptop : defaultStore.fontSize.laptop};
          margin: ${(store.margin && store.margin.laptop) ? store.margin.laptop : defaultStore.margin.laptop};
        }
        
        @media screen and (max-width: 768px){
            font-size: ${(store.fontSize && store.fontSize.tablet) ? store.fontSize.tablet : defaultStore.fontSize.tablet};
            margin: ${(store.margin && store.margin.tablet) ? store.margin.tablet : defaultStore.margin.tablet};
        }
        
        @media screen and (max-width: 425px){
            font-size: ${(store.fontSize && store.fontSize.l) ? store.fontSize.l : defaultStore.fontSize.l};
            margin: ${(store.margin && store.margin.l) ? store.margin.l : defaultStore.margin.l};
        }
        
        @media screen and (max-width: 375px){
            font-size: ${(store.fontSize && store.fontSize.m) ? store.fontSize.m : defaultStore.fontSize.m};
            margin: ${(store.margin && store.margin.m) ? store.margin.m : defaultStore.margin.m};
        }
        
        @media screen and (max-width: 320px){
            font-size: ${(store.fontSize && store.fontSize.s) ? store.fontSize.s : defaultStore.fontSize.s};
            margin: ${(store.margin && store.margin.s) ? store.margin.s : defaultStore.margin.s};
        }
        `
        :''
        }  
    `;
}


export {
    ComposeFont,
    Heading,
    List,
    Paragraph,
    TagLabel,
    CardText,
    Common
}