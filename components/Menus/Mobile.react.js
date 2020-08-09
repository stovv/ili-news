import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { Icons } from '../../assets';
import styled, { withTheme } from "styled-components";
import {UniversalLink} from "../Links.react";

//<MenuLink>test</MenuLink>
const MobileMenuLink = styled.p` 
  font-family: ${props=> props.theme.fontFamily};
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.30;
  margin: 10px 0;
  text-transform: lowercase;
  text-decoration: none;
  letter-spacing: 0.4px;
  color: ${props=>props.theme.text.onPrimary};
  :active{
      color: ${props=>props.theme.text.hover};
  }
`


class MobileMenu extends React.Component {
    componentWillUnmount() {
        if (typeof window !== "undefined"){
            document.documentElement.removeAttribute("style");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.display){
            document.documentElement.removeAttribute("style");
        }else{
            document.documentElement.style = "width: calc(100% - 17px); position: fixed; top: 0px; overflow: hidden;";
        }
    }

    render(){
        const { theme, display, close, menus } = this.props;

        if (typeof window === "undefined"){
            return (<></>);
        }

        const {AnimateOnChange} = require('react-animation');

        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, zIndex: 9999, overflow: 'hidden'
            }}>
            <AnimateOnChange durationOut={500} animationIn="fadeInUp" animationOut="fadeOut">
                {
                    display &&
                        <Flex bg={theme.colors.backgroundInverted} height="100vh" width="100vw" sx={{
                            opacity: 0.999
                        }} justifyContent="center">
                            <Box sx={{
                                position: "fixed",
                                top: "30px",
                                left: "30px"
                            }} onClick={close}>
                                <Icons.CloseIcon />
                            </Box>
                            <Flex m="auto" flexDirection="column">
                                {menus.map((item, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <UniversalLink item={item} component={MobileMenuLink} onClick={close}/>
                                        </React.Fragment>
                                    )})
                                }
                            </Flex>
                        </Flex>
                }
            </AnimateOnChange>
            </div>
        );

    }
}

MobileMenu.propTypes = {
    display: PropTypes.bool,
    close: PropTypes.func,
    menus: PropTypes.array
}

export default withTheme(MobileMenu);