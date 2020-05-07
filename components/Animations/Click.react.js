import styled from "styled-components";

export const SimpleClick = styled.div`
    background-color: Transparent;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    transition: all 0.25s ease-in-out;
    :active{
        transform: scale(0.85);
    }
`;