import React from 'react';
import styled, {withTheme} from 'styled-components';
import {Flex, Box } from 'rebass';

import {
    Logo
} from '../../assets';


const MenuLink = styled.a`
  font-family: Helvetica;
  font-size: ${props=> props.theme.fontSizes[3]};
  text-decoration: none;
  text-transform: lowercase;
  color: ${props=> props.theme.text.primary};
  :hover{
    color: ${props=> props.theme.text.hover};
  }
  border-bottom: ${props => props.selected ? `4px solid ${props.theme.colors.primary}` : "none"};
`;

class Header extends React.Component {
    constructor(props){
        super(props);
        this.route = props.route ? props.route : "";
    }
    render(){
        return(
            <Flex bg={this.props.theme.colors.secondary}>
                <Box width={2/8}>
                    <Box width="80px" height="80px" ml="20%">
                        <a href="/">
                            <Logo width="90%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/>
                        </a>
                    </Box>
                </Box>
                
                <Box width={4/8} my='auto'>
                    <Flex style={{justifyContent: "center"}}>
                    {this.props.categories.map((item, index)=>{
                        return (
                            <React.Fragment key={item.slug}>
                            <Box mr={index < this.props.categories.length -1 ? "80px" : 0}>
                                <MenuLink href={`/category/${item.slug}`} selected={this.route === `/category/${item.slug}`}>
                                    {item.title}
                                </MenuLink>
                            </Box>
                            </React.Fragment>
                        )})
                    }
                    </Flex>
                </Box>
                <Box width={2/8} my='auto'/>
            </Flex>
            
        );
    }
}


export default withTheme(Header);