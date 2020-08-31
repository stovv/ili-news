import styled from "styled-components";

import { ComposeFont } from "../../Typography";


export const JournalTitle = styled.h1`
    ${props => ComposeFont(props.theme.journal.heading.title, {
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
            s: "auto 0 5px 0",
            m: "auto 0 5px 0",
            l: "auto 0 5px 0",
            tablet: "auto 20px auto 0",
            laptop: "auto 20px auto 0"
        },
        color: props.theme.text.primary
    })};
    text-align: center;
`;

export const JournalSubTitle = styled.h2`
    ${props => ComposeFont(props.theme.journal.heading.subTitle, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.2,
        fontWeight: "bold",
        fontSize: {
            s: "14px",
            m: "16px",
            l: "18px",
            tablet: "20px",
            laptop: "20px",
        },
        margin: {
            s: "auto 0 5px 0",
            m: "auto 0 5px 0",
            l: "auto 0 5px 0",
            tablet: "auto 20px auto 0",
            laptop: "auto 20px auto 0"
        },
        color: props.theme.text.secondary    
    })};
    text-align: center;
`;