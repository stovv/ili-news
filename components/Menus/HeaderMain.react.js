import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {connect} from 'react-redux';
import { Flex, Box } from 'reflexbox';

import {
    Logo,
    Icons
} from '../../assets';
import { Default, Mini } from '../Containers';
import { UniversalLink } from '../Links.react';
import { Click } from '../Animations';
import MobileMenu from "./Mobile.react";
import { Common } from "../../actions";
import DropDown from "./DropDown";
import styles from './styles/header.module.css';


class HeaderNavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullScreenMenu: false
        }
        this.route = props.route ? props.route : "";
    }
    render(){
        const { menus, route, width, dispatch, searchActivated, isLoggedIn } = this.props;
        if ( !menus ){
            return null;
        }


        if ( width > 1023 ){

            return (
                <>
                <Box width={searchActivated ? "100vw" : "100%"}
                     bg={searchActivated ? "var(--backgroundInverted)" : "var(--backgroundPrimary)"}
                     sx={{transition: "all 0.5s ease 0s"}} px={"25px"}>
                    <Flex height={"72px"} maxWidth={"1440px"} mx={"auto"}>
                        <Box width={1/8} height="100%" sx={{position:"relative"}}>
                            <Box width={"55px"} height={"55px"}  sx={{
                                left: "50%", top: "50%", position: "absolute",
                                transform: "translate(-50%, -50%)"
                            }}>
                                <Link href="/" passHref prefetch={false}>
                                    <a>
                                        <Logo width="100%" primary={"var(--primary)"} background={"transparent"}/>
                                    </a>
                                </Link>
                            </Box>
                        </Box>
                        <Box width={6/8} my='auto' >
                            <Flex style={{justifyContent: "center"}}>
                                {menus.map((item, index)=>{
                                    return (
                                        <React.Fragment key={index}>
                                            <Box mr={index < menus.length -1 ? "80px" : 0} sx={{position: "relative"}}>
                                                <UniversalLink item={item}
                                                               route={route}
                                                               componentParams={{ inverted: searchActivated }}
                                                               component={({children, ...props})=>(
                                                                   <a className={styles.menuLink} {...props}>
                                                                       {children}
                                                                   </a>
                                                               )}
                                                />
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
                                {/*TODO: Check Token valid ??🤔*/}
                                {
                                    isLoggedIn
                                        ? <DropDown button={(props) =>
                                            <Click.SimpleClick {...props}>
                                                <Icons.UserIcon inverted={searchActivated}/>
                                            </Click.SimpleClick>
                                        } buttonProps={{
                                            inverted: searchActivated
                                        }} type="user-header" dropMargin={"35px 0 0 0"}/>
                                        : <Click.SimpleClick>
                                            <Link href="/login" prefetch={false}>
                                                <Icons.UserIcon inverted={searchActivated}/>
                                            </Link>
                                        </Click.SimpleClick>
                                }
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
                        <Flex bg={"var(--backgroundPrimary)"}
                              height={"56px"}>
                            <Box float="left" my="auto" onClick={()=>this.setState({fullScreenMenu: !this.state.fullScreenMenu})}>
                                <Icons.HamburgerMenuIcon/>
                            </Box>
                            <Box mx="auto" height="100%" sx={{position:"relative"}}>
                                <Box width={"55px"} height={"55px"}  sx={{
                                    top: "50%",
                                    left: "50%",
                                    position: "absolute",
                                    transform: "translate(-50%, -50%)"
                                }}>
                                    <Link href="/" passHref prefetch={false}>
                                        <a>
                                            <Logo width="100%" primary={"var(--primary)"}
                                                  background={"transparent"}/>
                                        </a>
                                    </Link>
                                </Box>
                            </Box>
                            <Box float="right" my="auto">
                                <Flex>
                                    <Click.SimpleClick style={{margin: "0 10px 0 0"}} onClick={()=>dispatch(Common.clickOnSearch())}>
                                        <Icons.SearchIcon />
                                    </Click.SimpleClick>
                                    <Click.SimpleClick>
                                        <Link href={isLoggedIn ? '/users/me' : '/login'} prefetch={false}>
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


export default connect(mapStateToProps)(HeaderNavBar);