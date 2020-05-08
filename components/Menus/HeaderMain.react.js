import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled, { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';

import {
    Logo,
    Icons
} from '../../assets';
import { Default } from '../Containers.react';
import { UniversalLink } from '../Links.react';
import { Click } from '../Animations';


const MenuLink = styled.a`
  max-width: 128px;
  max-height: 22px;
  font-family: ${props=> props.theme.fontFamily};
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.12;
  text-transform: lowercase;
  text-decoration: none;
  letter-spacing: 0.4px;
  transition: all 0.4s ease 0s;
  color: ${props=>props.theme.text.secondarySecondary};
  :after{
    content: '';
    display: block;
    width: 0;
    height: 4px;
    background: ${props=>props.theme.text.hover};
    transition: width .3s;
  }
  :hover:after{
       width: 100%;
  }
  :hover{
      color: ${props=>props.theme.text.hover};
  }
`


class HeaderNavBar extends React.Component {
    constructor(props){
        super(props);
        this.route = props.route ? props.route : "";
    }
    render(){
        const { menus, route } = this.props;
        return(
            <Default>
                <Flex bg={this.props.theme.colors.secondary} height={["72px"]}>
                    <Box width={1/8} height="100%" sx={{position:"relative"}}>
                        <Box width={["55px"]} height={["55px"]}  sx={{
                            left: "-22%",
                            top: "50%",
                            position: "absolute",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <Link href="/">
                                <a><Logo width="100%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/></a>
                            </Link>
                        </Box>
                    </Box>

                    <Box width={6/8} my='auto'>
                        <Flex style={{justifyContent: "center"}}>
                        {menus.map((item, index)=>{
                            return (
                                <React.Fragment key={index}>
                                    <Box mr={index < menus.length -1 ? "80px" : 0} sx={{position: "relative"}}>
                                        <UniversalLink item={item} component={MenuLink}/>
                                    </Box>
                                </React.Fragment>
                            )})
                        }
                        </Flex>
                    </Box>
                    <Box width={1/8} my='auto'>
                        <Click.SimpleClick style={{float: "right"}}>
                            <Icons.SearchIcon />
                        </Click.SimpleClick>
                    </Box>
                </Flex>
            </Default>
        );
    }
}


HeaderNavBar.propTypes = {
    menus: PropTypes.object.isRequired,
    route: PropTypes.string.isRequired
}

export default withTheme(HeaderNavBar);