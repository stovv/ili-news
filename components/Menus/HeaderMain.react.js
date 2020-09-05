import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled, { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';
import {connect} from 'react-redux';

import {
    Logo,
    Icons
} from '../../assets';
import { Default, Mini } from '../Containers.react';
import { UniversalLink } from '../Links.react';
import { Click } from '../Animations';
import MobileMenu from "./Mobile.react";
import { Common } from "../../actions";


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
  color: ${props=> props.inverted ? (props.active ? props.theme.text.hover : props.theme.text.onPrimary) : (props.active ? props.theme.text.hover : props.theme.text.secondarySecondary) };
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
        this.state = {
            fullScreenMenu: false
        }
        this.route = props.route ? props.route : "";
    }
    render(){
        const { menus, route, width, dispatch, searchActivated, theme, isLoggedIn } = this.props;
        if ( !menus ){
            return null;
        }


        if ( width > 1023 ){

            return (
                <>
                <Box width={searchActivated ? "100vw" : "100%"}
                     bg={searchActivated ? theme.colors.backgroundInverted : theme.colors.secondary}
                     sx={{transition: "all 0.5s ease 0s"}} px={"25px"}>
                    <Flex height={"72px"} maxWidth={"1440px"} mx={"auto"}>
                        <Box width={1/8} height="100%" sx={{position:"relative"}}>
                            <Box width={"55px"} height={"55px"}  sx={{
                                left: "50%", top: "50%", position: "absolute",
                                transform: "translate(-50%, -50%)"
                            }}>
                                <Link href="/" passHref>
                                    <a><Logo width="100%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/></a>
                                </Link>
                            </Box>
                        </Box>
                        <Box width={6/8} my='auto' >
                            <Flex style={{justifyContent: "center"}}>
                                {menus.map((item, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <Box mr={index < menus.length -1 ? "80px" : 0} sx={{position: "relative"}}>
                                                <UniversalLink item={item} component={MenuLink} route={route} componentParams={{ inverted: searchActivated }}/>
                                            </Box>
                                        </React.Fragment>
                                    )})
                                }
                            </Flex>
                        </Box>
                        <Box width={1/8} my='auto' >
                            <Flex justifyContent={"right"}>
                                <Click.SimpleClick style={{margin: "0 32px 0 0"}} onClick={()=>dispatch(Common.clickOnSearch())}>
                                    <Icons.SearchIcon inverted={searchActivated}/>
                                </Click.SimpleClick>
                                <Click.SimpleClick>
                                    <Link href={isLoggedIn ? '/users/me' : '/login'}>
                                        <Icons.UserIcon inverted={searchActivated}/>
                                    </Link>
                                </Click.SimpleClick>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                </>
            );

        }else{
            return (
                <>
                    <MobileMenu display={this.state.fullScreenMenu} menus={menus} close={()=>this.setState({fullScreenMenu: false})}/>
                    <Mini>
                        <Flex bg={theme.colors.secondary}
                              height={["56px"]}>
                            <Box float="left" my="auto" onClick={()=>this.setState({fullScreenMenu: !this.state.fullScreenMenu})}>
                                <Icons.HamburgerMenuIcon/>
                            </Box>
                            <Box mx="auto" height="100%" sx={{position:"relative"}}>
                                <Box width={["55px"]} height={["55px"]}  sx={{
                                    top: "50%",
                                    left: "50%",
                                    position: "absolute",
                                    transform: "translate(-50%, -50%)"
                                }}>
                                    <Link href="/" passHref>
                                        <a><Logo width="100%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/></a>
                                    </Link>
                                </Box>
                            </Box>
                            <Box float="right" my="auto">
                                <Flex>
                                    <Click.SimpleClick style={{margin: "0 10px 0 0"}} onClick={()=>dispatch(Common.clickOnSearch())}>
                                        <Icons.SearchIcon />
                                    </Click.SimpleClick>
                                    <Click.SimpleClick>
                                        <Link href={isLoggedIn ? '/users/me' : '/login'}>
                                            <Icons.UserIcon inverted={searchActivated}/>
                                        </Link>
                                    </Click.SimpleClick>
                                </Flex>
                            </Box>
                        </Flex>
                    </Mini>
                </>
            );
        }
    }
}


HeaderNavBar.propTypes = {
    menus: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width,
        searchActivated: state.common.activeSearch,
        isLoggedIn: state.auth.isLoggedIn
    }
}


export default connect(mapStateToProps)(withTheme(HeaderNavBar));