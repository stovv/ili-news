import React from 'react';
import PropTypes from 'prop-types';
import { Icons } from '../../assets';
import {UniversalLink} from "../Links.react";
import { Flex, Box } from 'reflexbox';

import styles from './styles/mobile.module.css';

//<MenuLink>test</MenuLink>

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
        const { display, close, menus } = this.props;

        if (typeof window === "undefined"){
            return (<></>);
        }

        //const {AnimateOnChange} = require('react-animation');

        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, zIndex: 9999, overflow: 'hidden'
            }}>
            {/*<AnimateOnChange durationOut={500} animationIn="fadeInUp" animationOut="fadeOut">*/}
                {
                    display &&
                        <Flex bg={"var(--backgroundInverted)"} height="100vh" width="100vw" sx={{
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
                                            <UniversalLink item={item} onClick={close}
                                                           component={
                                                               ({children})=>
                                                                   <p className={styles.link}>
                                                                       {children}
                                                                   </p>
                                                           }
                                            />
                                        </React.Fragment>
                                    )})
                                }
                            </Flex>
                        </Flex>
                }
            {/*</AnimateOnChange>*/}
            </div>
        );

    }
}

MobileMenu.propTypes = {
    display: PropTypes.bool,
    close: PropTypes.func,
    menus: PropTypes.array
}

export default MobileMenu;