import React from 'react';
import styled from 'styled-components';

import { ComposeFont } from "../../Typography";

const H1 = styled.h1`
    ${props => ComposeFont(props.theme.post.typo.h1, {
          fontFamily: props.theme.fontFamily,
          lineHeight: 1.12,
          fontWeight: "bold",
          fontSize: {
            s: "18px",
            m: "20px",
            l: "32px",
            tablet: "40px",
            laptop: "48px",
          },
        margin: {
            s: `0 0 ${props.theme.spacing.s} 0`,
            m: `0 0 ${props.theme.spacing.s} 0`,
            l: `0 0 ${props.theme.spacing.s} 0`,
            tablet: `0 0 ${props.theme.spacing.s} 0`,
            laptop: `0 0 ${props.theme.spacing.s} 0`
        },
        color: props.theme.text.primary
    })};
`;

const H2 = styled.h2`
    ${props => ComposeFont(props.theme.post.typo.h2, {
          fontFamily: props.theme.fontFamily,
          lineHeight: 1.2,
          fontWeight: "bold",
          fontSize: {
            s: "40px",
            m: "40px",
            l: "40px",
            tablet: "40px",
            laptop: "40px",
          },
          margin: {
            s: `0 0 ${props.theme.spacing.s} 0`,
            m: `0 0 ${props.theme.spacing.s} 0`,
            l: `0 0 ${props.theme.spacing.s} 0`,
            tablet: `0 0 ${props.theme.spacing.s} 0`,
            laptop: `0 0 ${props.theme.spacing.s} 0`
         },
         color: props.theme.text.primary
    })};
`;

const H3 = styled.h3`
  ${props => ComposeFont(props.theme.post.typo.h3, {
          fontFamily: props.theme.fontFamily,
          lineHeight: 1.27,
          fontWeight: "bold",
          fontSize: {
            s: "28px",
            m: "28px",
            l: "28px",
            tablet: "28px",
            laptop: "28px",
          },
          margin: {
            s: `0 0 ${props.theme.spacing.s} 0`,
            m: `0 0 ${props.theme.spacing.s} 0`,
            l: `0 0 ${props.theme.spacing.s} 0`,
            tablet: `0 0 ${props.theme.spacing.s} 0`,
            laptop: `0 0 ${props.theme.spacing.s} 0`
        },
        color: props.theme.text.primary
    })};
`;

const H4 = styled.h4`
    ${props => ComposeFont(props.theme.post.typo.h4, {
          fontFamily: props.theme.fontFamily,
          lineHeight: 1.12,
          fontWeight: "bold",
          fontSize: {
            s: "18px",
            m: "20px",
            l: "32px",
            tablet: "40px",
            laptop: "48px",
          },
          margin: {
            s: `0 0 ${props.theme.spacing.s} 0`,
            m: `0 0 ${props.theme.spacing.s} 0`,
            l: `0 0 ${props.theme.spacing.s} 0`,
            tablet: `0 0 ${props.theme.spacing.s} 0`,
            laptop: `0 0 ${props.theme.spacing.s} 0`
          },
          color: props.theme.text.primary
    })};
`;

const H5 = styled.h5`
    ${props => ComposeFont(props.theme.post.typo.h5, {
          fontFamily: props.theme.fontFamily,
          lineHeight: 1.12,
          fontWeight: "bold",
          fontSize: {
            s: "18px",
            m: "20px",
            l: "32px",
            tablet: "40px",
            laptop: "48px",
          },
          margin: {
            s: `0 0 ${props.theme.spacing.s} 0`,
            m: `0 0 ${props.theme.spacing.s} 0`,
            l: `0 0 ${props.theme.spacing.s} 0`,
            tablet: `0 0 ${props.theme.spacing.s} 0`,
            laptop: `0 0 ${props.theme.spacing.s} 0`
         },
         color: props.theme.text.primary
    })};
`;

const H6 = styled.h6`
    ${props => ComposeFont(props.theme.post.typo.h6, {
          fontFamily: theme.fontFamily,
          lineHeight: 1.12,
          fontWeight: "bold",
          fontSize: {
            s: "18px",
            m: "20px",
            l: "32px",
            tablet: "40px",
            laptop: "48px",
          },
          margin: {
            s: `0 0 ${props.theme.spacing.s} 0`,
            m: `0 0 ${props.theme.spacing.s} 0`,
            l: `0 0 ${props.theme.spacing.s} 0`,
            tablet: `0 0 ${props.theme.spacing.s} 0`,
            laptop: `0 0 ${props.theme.spacing.s} 0`
          },
          color: theme.text.primary
    })};
`;

const headings = {
    1: H1,
    2: H2,
    3: H3,
    4: H4,
    5: H5,
    6: H6,
    7: H6
};

class Heading extends React.Component{
    render(){
        const  { data } = this.props;

        if (typeof data !== 'undefined'){
            const HeadingComp = headings[data.level + 1];
            return(
                <HeadingComp><div dangerouslySetInnerHTML={{__html: data.text}}/></HeadingComp>
            );
        }
        return null;
    }

}

export default Heading;