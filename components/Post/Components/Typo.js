import styled from "styled-components";
import { ComposeFont } from "../../Typography";
// Typography for post components and cards

export const Heading = styled.h1`
    ${props => ComposeFont(props.theme.post.heading, {
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
    })}
`;

export const Rubric = styled.h4`   
    ${props => ComposeFont(props.theme.post.rubric, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.2,
        fontWeight: "bold",
        fontSize: {
          s: "20px",
          m: "20px",
          l: "20px",
          tablet: "20px",
          laptop: "20px",
        },
        margin: {
            s: `32px 0 ${props.theme.spacing.m} 0`,
            m: `32px 0 ${props.theme.spacing.m} 0`,
            l: `32px 0 ${props.theme.spacing.m} 0`,
            tablet: `32px 0 ${props.theme.spacing.m} 0`,
            laptop: `32px 0 ${props.theme.spacing.m} 0`
        },
        color: props.theme.colors.primary
    })};
`;

export const PublishDate = styled.h4`
    ${props => ComposeFont(props.theme.post.date, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.2,
        fontWeight: "bold",
        fontSize: {
          s: "20px",
          m: "20px",
          l: "20px",
          tablet: "20px",
          laptop: "20px",
        },
        margin: {
            s: `auto 0`,
            m: `auto 0`,
            l: `auto 0`,
            tablet: `auto 0`,
            laptop: `auto 0`
        },
        color: props.theme.text.secondary
    })};
`;

export const Authors = styled.h4`
    ${props => ComposeFont(props.theme.post.authors, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.2,
        fontWeight: "bold",
        fontSize: {
          s: "20px",
          m: "20px",
          l: "20px",
          tablet: "20px",
          laptop: "20px",
        },
        margin: {
            s: `auto 0 auto 5px`,
            m: `auto 0 auto 5px`,
            l: `auto 0 auto 5px`,
            tablet: `auto 0 auto 5px`,
            laptop: `auto 0 auto 5px`
        },
        color: props.theme.colors.primary
    })}
`;

export const EventDateDay = styled.h1`
    ${props => ComposeFont(props.theme.post.eventDate.day, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.33,
        fontWeight: "500",
        fontSize: {
            s: "20px",
            m: "40px",
            l: "42px",
            tablet: "50px",
            laptop: "64px",
        },
        margin: {
            s: '0 12px 0 0',
            m: '0 14px 0 0',
            l: '0 20px 0 0',
            tablet: '0 24px 0 0',
            laptop: '0 24px 0 0'
        },
        color: props.theme.colors.primary
    })};
    text-align: center;
`;

export const EventDateMouth = styled.h1`
    ${props => ComposeFont(props.theme.post.eventDate.mouth, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.2,
        fontWeight: "bold",
        fontSize: {
            s: "16px",
            m: "18px",
            l: "20px",
            tablet: "24px",
            laptop: "28px",
        },
        margin: {
            s: '0 12px 0 0',
            m: '0 14px 0 0',
            l: '0 20px 0 0',
            tablet: '0 24px 0 0',
            laptop: '0 24px 0 0'
        },
        color: props.theme.colors.primary
    })};
    text-align: center;
`;

export const RatingCounter = styled.span`
    ${props => ComposeFont(props.theme.post.footer, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.33,
        fontWeight: "normal",
        fontSize: {
            s: "16px",
            m: "16px",
            l: "18px",
            tablet: "20px",
            laptop: "20px",
        },
        margin: {
            s: 'auto 0',
            m: 'auto 0',
            l: 'auto 0',
            tablet: 'auto 0',
            laptop: 'auto 0'
        },
        color: props.theme.text.secondary
    })};
    user-select: none;
    
`;