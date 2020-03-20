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
    margin: 0 20px;
    :hover {
        color: ${props => props.outline ? "#ffffff" : props.theme.colors.primary};
        background: ${props => props.outline ? props.theme.colors.primary : "#ffffff"};
        border-color: ${props => props.theme.colors.primary} !important;
        transition: all 0.4s ease 0s;
    }
`;