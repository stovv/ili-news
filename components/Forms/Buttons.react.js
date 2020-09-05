import styled from 'styled-components';

export const SimpleButton = styled.button`
    color: ${props => props.outline ? props.theme.colors.primary: "#ffffff"};
    text-transform: uppercase;
    text-decoration: none;
    background: ${props => props.outline ? "#ffffff" : props.theme.colors.primary};
    padding: 10px;
    border: 2px solid ${props => props.theme.colors.primary} !important;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease 0s;
    width: 100%;
    outline: none;
    :hover {
        color: ${props => props.outline ? "#ffffff" : props.theme.colors.primary};
        background: ${props => props.outline ? props.theme.colors.primary : "#ffffff"};
        border-color: ${props => props.theme.colors.primary} !important;
        transition: all 0.4s ease 0s;
    }
`;

export const LoginButton = styled.button`
    color: #ffffff;
    text-decoration: none;
    background: ${props => props.theme.colors.primary};
    padding: 16px 0;
    border: 2px solid ${props => props.theme.colors.primary} !important;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease 0s;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal; 
    outline: none;
    
    ${props => !props.stuck && `
        :hover {
            cursor: pointer;
            color: ${props.theme.colors.primary};
            background: #ffffff;
            border-color: ${props.theme.colors.primary} !important;
            transition: all 0.4s ease 0s;
        }
    `}
    @media screen and (min-width: 1110px){
        min-width: ${props => props.width ? props.width : "410px"};
    } 
    @media screen and (max-width: 1110px){
        min-width: ${props => props.width ? props.width : "95%"};
    }
`;