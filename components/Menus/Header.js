import Link from 'next/link';
import dynamic from "next/dynamic";
import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';

import { getMenu } from "../../api/methods/public.react";
import styles from "./styles/SiteHeader.module.css";
import UniversalLink from "../Links/Universal";

const Skeleton = dynamic(() => import("react-loading-skeleton"));
const Logo = dynamic(() => import("../../assets/logo"), {
        loading: () => (
            <div className={styles.loadingLogo}>
                <Skeleton width={"56px"} height={"56px"}/>
            </div>
        )
    }
);
const UserIcon = dynamic(() => import("../../assets/user"));
const SearchIcon = dynamic( () => import("../../assets/search"));
const BurgerIcon = dynamic(() => import("../../assets/burger"));


const LoadingLink = () => (
    <div className={styles.menuLink}>
        <Skeleton width={"5em"}/>
    </div>
);

const LinksSkeleton = () => [...Array(4).keys()]
    .map(index=>(
        <Fragment key={index}>
            <LoadingLink/>
        </Fragment>
    )
);


class Header extends Component {
    state = {
        menus: []
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextState.menus.length > 0;
    }

    componentDidMount() {
        this.getMenus();
    }

    getMenus(){
        setTimeout(()=>{
            try {
                getMenu('header').then(response => this.setState({
                    menus: [
                        ...response.data.menus[0].item,
                        {
                            url: {
                                link: "archive",
                                title: "Статьи"
                            }
                        },
                    ]
                }));
            }catch (e){
                console.log("Something wrong with getting header menus, try again -> ", e);
                this.getMenus();
            }
        }, 100);
    }

    render(){
        const { route, searchActivated } = this.props;
        const { menus } = this.state;

        return (
            <div className={searchActivated ? styles.searchActivated : styles.headerRoot}>
                <div className={styles.headerWrapper}>
                    <div className={styles.leftSide}>
                        <div className={styles.iconsLeft}>
                            <BurgerIcon/>
                        </div>
                    </div>
                    <div className={styles.leftSideLaptop}>
                        <Link href="/" passHref>
                            <a>
                                <Logo className={styles.logo} primary={"var(--primary)"} background={"transparent"}/>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.centerSideLaptop}>
                        <div className={styles.centerSideWrapper}>
                            {
                                menus.length > 0
                                    ? menus.map((item, index)=>(
                                        <Fragment key={index}>
                                            <UniversalLink item={item} route={route}
                                                           componentParams={{ inverted: searchActivated }}
                                                           Component={
                                                               ({active, href, children, ...props})=>(
                                                                   <a href={href} {...props}
                                                                      className={active
                                                                          ? styles.active
                                                                          : `${styles.menuLink} ${styles.menuLinkHover}`}>
                                                                       {children}
                                                                   </a>
                                                               )
                                                           }
                                            />
                                        </Fragment>
                                    ))
                                    : <LinksSkeleton/>
                            }
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <div className={styles.icons}>
                            <SearchIcon />
                        </div>
                        <UniversalLink item={{url:{link: "login"} }} route={route} Component={
                            ({href})=>(
                                 <a className={styles.icons} href={href}>
                                     <UserIcon/>
                                 </a>
                            )
                        }/>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    route: PropTypes.string.isRequired
}

export default Header;




