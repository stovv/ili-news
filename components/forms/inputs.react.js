import styled from 'styled-components';

export const BlankInput = styled.input`
    font-family: ${props=>props.theme.fontFamily};
    margin: 0;
    line-height: 1.5em;
    outline: none;
    font-size: 3rem;
    font-weight: 500;
    width: 100%;
    border: none;
    text-overflow: ellipsis;
    :placeholder{
        -webkit-text-fill-color: rgba(55, 53, 47, 0.2);
    }
`;
