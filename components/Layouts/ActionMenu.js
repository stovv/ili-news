import React from 'react';
import styled from "styled-components";


export const Menu = styled.div`
    border-radius: 8px;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.08);
    background-color: ${props => props.theme.colors.backgroundPrimary};
`;

const ItemWrap = styled.div`
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.text.primary};
  user-select: none;
`;

const ItemHover = styled.div`
  background-color: ${props => props.theme.colors.backgroundPrimary};
  cursor: pointer;
  ${({icon}) => icon
    ? `padding: 8px 16px`
    : `padding: 8px 52px 8px 16px;`
  };
  
  :first-child{
    margin-top: 8px;
  }
  
  :last-child{
    margin-bottom: 8px;
  }
  :hover{
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
`

export const Item = ({icon, opened, children, ...props}) => (
    <ItemHover {...props}>
        <ItemWrap icon={!!icon} opened={opened}>
            {children}
            {icon}
        </ItemWrap>
    </ItemHover>
);