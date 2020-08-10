import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled, { withTheme } from 'styled-components';
import { Flex, Box } from 'rebass';
import {connect} from 'react-redux';

import {
    Logo,
    Icons
} from '../../assets';
import { UniversalLink, SocialLink } from '../Links.react';
import { Heading } from '../Typography';


const MenuLink = styled.a`
  max-width: 128px;
  max-height: 22px;
  font-family: ${props=> props.theme.fontFamily};
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  text-decoration: none;
  letter-spacing: 0.4px;
  transition: all 0.4s ease 0s;
  color: ${props=>props.active ? props.theme.text.hover : props.theme.text.onPrimary};
  cursor: pointer;
  :hover{
      color: ${props=>props.theme.text.hover};
  }
`;

const FooterText = styled.p`
  opacity: 0.64;
  font-family: ${props=>props.theme.fontFamily};
  font-size: 20px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  text-align: center;
  letter-spacing: normal;
  margin: 50px 0 0 0;
  color: ${props=>props.theme.text.onPrimary};
`;


const FooterWrapper = styled.div`
  margin: 120px 0 0 0;
  width: 100%;
  height: 256px;
  background-color: ${props=>props.theme.colors.backgroundInverted};
`;

class FooterMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullScreenMenu: false,
            social: []
        }
        this.route = props.route ? props.route : "";
    }
    componentDidMount() {
        const { menus, theme } = this.props;
        let items = [];
        let filteredMenu = menus.filter(item=>item.socialUrl != null && item.icon != null);
        for (let i = 0; i < filteredMenu.length; i+= 3) {
            items.push(
                <React.Fragment key={i}>
                    <Flex justifyContent={"center"} mt={i === 0 ? "40px" : undefined}
                          mb={theme.spacing.m}>
                        {
                            filteredMenu.slice(i, i + 3).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box ml={index > 0 ? "12px" : 0} mr={index < menus.length -1 ? "12px" : 0} sx={{position: "relative"}}>
                                        <SocialLink item={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                </React.Fragment>
            )
        }
        this.setState({ social: items });
    }

    render(){
        const { menus, route, width, infinityActive, theme } = this.props;
        const { social } = this.state;

        if ( !menus || infinityActive ){
            return null;
        }

        if ( width > 1023 ){

            return (
            <FooterWrapper>
                <Flex justifyContent="center" height={"100%"} py={"23px"} maxWidth={"1440px"} mx={"auto"}>
                    <Box width={2/10} sx={{position: 'relative'}}>
                        <Box width={["70px"]} height={["70px"]} mx={"auto"}>
                            <Link href="/" passHref>
                                <a><Logo width="100%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/></a>
                            </Link>
                        </Box>
                        {social}
                    </Box>
                    <Box width={8/10} pt={"16px"}>
                        <Flex justifyContent={"center"}>
                            {
                                menus.map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box mr={index < menus.length -1 ? theme.spacing.block : 0}
                                             sx={{position: "relative"}}>
                                            <UniversalLink item={item} component={MenuLink} route={route}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                        <FooterText>
                            Городской интернет-журнал «ИЛИ» 2020<br/><br/>
                            Использование материалов Журнала ИЛИ разрешено только с предварительного согласия правообладателей.
                            Мнение редакции может не совпадать с мнением автора.
                        </FooterText>
                    </Box>
                </Flex>
            </FooterWrapper>
            );

        }else{

            let items = [];
            for (let i = 0; i < menus.length; i+= 2) {
                items.push(
                    <React.Fragment key={i}>
                        <Flex justifyContent={"center"}>
                            {
                                menus.slice(i, i+2).map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box mr={index < menus.length -1 ? theme.spacing.block : 0}
                                             sx={{position: "relative"}}>
                                            <UniversalLink item={item} component={MenuLink} route={route}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                    </React.Fragment>
                )
            }

            return (
                <FooterWrapper>
                    <Flex sx={{position: 'relative'}} pt={"23px"}>
                        <Box width={1/2}>
                            <Box width={["70px"]} height={["70px"]} mx={"auto"}>
                                <Link href="/" passHref>
                                    <a><Logo width="100%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/></a>
                                </Link>
                            </Box>
                        </Box>
                        <Box width={1/2}>
                            {social}
                        </Box>
                    </Flex>
                    <Box mx={"auto"} mt={"24px"}>
                        {items}
                    </Box>
                    {/*<Flex justifyContent="center" height={"100%"} py={"23px"} maxWidth={"1440px"} mx={"auto"}>*/}

                    {/*    <Box width={8/10} pt={"16px"}>*/}
                    {/*        <Flex justifyContent={"center"}>*/}

                    {/*        </Flex>*/}
                    {/*        <FooterText>*/}
                    {/*            Городской интернет-журнал «ИЛИ» 2020<br/><br/>*/}
                    {/*            Использование материалов Журнала ИЛИ разрешено только с предварительного согласия правообладателей.*/}
                    {/*            Мнение редакции может не совпадать с мнением автора.*/}
                    {/*        </FooterText>*/}
                    {/*    </Box>*/}
                    {/*</Flex>*/}
                </FooterWrapper>
            );
        }
    }
}


FooterMenu.propTypes = {
    menus: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width,
        infinityActive: state.common.infinityActive,
    }
}


export default connect(mapStateToProps)(withTheme(FooterMenu));