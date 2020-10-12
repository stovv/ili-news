import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {connect} from 'react-redux';

import {
    Logo,
    Icons
} from '../../assets';
import { Flex, Box } from 'reflexbox';
import { UniversalLink, SocialLink } from '../Links.react';

import styles from './styles/footer.module.css';

const MenuLink = ({children, ...props})=>(
    <a className={styles.menuLink} {...props}>
        {children}
    </a>
);


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
        const { menus } = this.props;
        let items = [];
        let filteredMenu = menus.filter(item=>item.socialUrl != null && item.icon != null);
        for (let i = 0; i < filteredMenu.length; i+= 3) {
            items.push(
                <React.Fragment key={i}>
                    <Flex justifyContent={"center"} mt={i === 0 ? "40px" : undefined}
                          mb={"var(--spacing-m)"}>
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
        const { menus, route, width, infinityActive } = this.props;
        const { social } = this.state;

        if ( !menus || infinityActive ){
            return null;
        }

        if ( width > 1023 ){
            return (
            <div className={styles.footerWrapper}>
                <Flex justifyContent="center" height={"100%"} py={"23px"} maxWidth={"1440px"} mx={"auto"}>
                    <Box width={2/10} sx={{position: 'relative'}}>
                        <Box width={"70px"} height={"70px"} mx={"auto"}>
                            <Link href="/" passHref prefetch={false}>
                                <a><Logo width="100%" primary={"var(--primary)"} background={"var(--backgroundInverted)"}/></a>
                            </Link>
                        </Box>
                        {social}
                    </Box>
                    <Box width={8/10} pt={"16px"}>
                        <Flex justifyContent={"center"}>
                            {
                                menus.map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box mr={index < menus.length -1 ? "var(--spacing-block)" : 0}
                                             sx={{position: "relative"}}>
                                            <UniversalLink item={item} component={MenuLink} route={route}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                        <p className={styles.footerText}>
                            Городской интернет-журнал «ИЛИ» 2020<br/><br/>
                            Использование материалов Журнала ИЛИ разрешено только с предварительного согласия правообладателей.
                            Мнение редакции может не совпадать с мнением автора.
                        </p>
                    </Box>
                </Flex>
            </div>
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
                                        <Box mr={index < menus.length -1 ? "var(--spacing-block)" : 0}
                                             sx={{position: "relative"}}>
                                            <UniversalLink item={item} route={route} component={MenuLink}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                    </React.Fragment>
                )
            }

            return (
                <div className={styles.footerWrapper} style={{marginTop: "20px"}}>
                    <Flex sx={{position: 'relative'}} pt={"23px"}>
                        <Box width={1/2}>
                            <Box width={"70px"} height={"70px"} mx={"auto"}>
                                <Link href="/" passHref prefetch={false}>
                                    <a>
                                        <Logo width="100%" primary={"var(--primary)"} background={"var(--backgroundInverted)"}/>
                                    </a>
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
                    {/*        <p className={styles.footerText}>*/}
                    {/*            Городской интернет-журнал «ИЛИ» 2020<br/><br/>*/}
                    {/*            Использование материалов Журнала ИЛИ разрешено только с предварительного согласия правообладателей.*/}
                    {/*            Мнение редакции может не совпадать с мнением автора.*/}
                    {/*        </p>*/}
                    {/*    </Box>*/}
                    {/*</Flex>*/}
                </div>
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


export default connect(mapStateToProps)(FooterMenu);