import styled from "styled-components";

// Typography for post components and cards

const ComposeFont = (store) => {
    return `
        font-family: ${store.fontFamily};
        color: ${store.color};
        text-align: ${props=> props.textAlign};
        font-weight: ${store.fontWeight ? store.fontWeight : "bold"};
        font-stretch: ${store.fontStretch ? store.fontStretch : "normal"};
        font-style: ${store.fontWeight ? store.fontStyle : "normal"};
        letter-spacing: ${store.letterSpacing ? store.letterSpacing : "normal"};
        line-height: ${store.lineHeight};
        
        @media screen and (max-width: 4000px){
            font-size: ${store.fontSize.laptop};
            margin: ${store.margin.laptop};
        }
        
        @media screen and (max-width: 768px){
            font-size: ${store.fontSize.tablet};
            margin: ${store.margin.tablet};
        }
        
        @media screen and (max-width: 425px){
            font-size: ${store.fontSize.l};
            margin: ${store.margin.l};
        }
        
        @media screen and (max-width: 375px){
            font-size: ${store.fontSize.m};
            margin: ${store.margin.m};
        }
        
        @media screen and (max-width: 320px){
            font-size: ${store.fontSize.s};
            margin: ${store.margin.s};
        }  
    `;
}

export const Heading = styled.h1`
    ${props => ComposeFont(props.theme.post.heading)}
`;

export const Rubric = styled.h4`    
    ${props => ComposeFont(props.theme.post.rubric)}
`;

export const PublishDate = styled.h4` 
    ${props => ComposeFont(props.theme.post.date)}
`;

export const Authors = styled.h4`
    ${props => ComposeFont(props.theme.post.authors)}
`;

export const EventDateDay = styled.h1`
    ${props => ComposeFont(props.theme.post.eventDate.day)};
    text-align: center;
`;

export const EventDateMouth = styled.h1`
    ${props => ComposeFont(props.theme.post.eventDate.mouth)};
    text-align: center;
`;

export const RatingCounter = styled.span`
    ${props => ComposeFont(props.theme.post.footer)};
    user-select: none;
    
`;