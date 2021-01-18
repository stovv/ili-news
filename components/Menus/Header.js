import Link from "next/link";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Component, Fragment } from "react";

import { setCache } from "../../actions/cache";
import styles from "./styles/SiteHeader.module.css";
import { getHeader } from "../../api/methods/public";

const isEqual = require("react-fast-compare");
const UserIcon = dynamic(() => import("../../assets/user"));
const SearchIcon = dynamic(() => import("../../assets/search"));
const BurgerIcon = dynamic(() => import("../../assets/burger"));
const Skeleton = dynamic(() => import("react-loading-skeleton"));
const UniversalLink = dynamic(() => import("../Links/Universal"));
const Logo = dynamic(() => import("../../assets/logo"), {
  loading: () => (
    <div className={styles.loadingLogo}>
      <Skeleton width={"56px"} height={"56px"} />
    </div>
  ),
});

const LoadingLink = () => (
  <div className={styles.menuLink}>
    <Skeleton width={"5em"} />
  </div>
);

const LinksSkeleton = () =>
  [...Array(4).keys()].map((index) => (
    <Fragment key={index}>
      <LoadingLink />
    </Fragment>
  ));


class Header extends Component {
  componentDidMount() {
    const { dispatch, menus } = this.props;
    getHeader()
      .then((response) =>{
        if (!isEqual(response.data.item, menus)){
          dispatch(setCache('header', response.data.item));
        }
      })
      .catch(e => console.log("Something wrong with getting header menus, try again -> ", e))
  }

  render() {
    const { route, searchActivated, menus } = this.props;

    return (
      <div
        className={searchActivated ? styles.searchActivated : styles.headerRoot}
      >
        <div className={styles.headerWrapper}>
          <div className={styles.leftSide}>
            <div className={styles.iconsLeft}>
              <BurgerIcon />
            </div>
          </div>
          <div className={styles.leftSideLaptop}>
            {route === "/" ? (
              <Logo
                className={styles.logo}
                fill={"var(--primary)"}
                background={"transparent"}
              />
            ) : (
              <Link href="/" passHref>
                <a>
                  <Logo
                    className={styles.logo}
                    fill={"var(--primary)"}
                    background={"transparent"}
                  />
                </a>
              </Link>
            )}
          </div>
          <div className={styles.centerSideLaptop}>
            <nav className={styles.centerSideWrapper}>
              {menus.length > 0 ? (
                menus.map((item, index) => (
                  <Fragment key={index}>
                    <UniversalLink
                      item={item}
                      route={route}
                      componentParams={{ inverted: searchActivated }}
                      Component={({ active, href, children, ...props }) => (
                        <a
                          href={href}
                          {...props}
                          className={
                            active
                              ? styles.active
                              : `${styles.menuLink} ${styles.menuLinkHover}`
                          }
                        >
                          {children}
                        </a>
                      )}
                    />
                  </Fragment>
                ))
              ) : (
                <LinksSkeleton />
              )}
            </nav>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.icons}>
              <SearchIcon />
            </div>
            <UniversalLink
              item={{ url: { link: "login" } }}
              route={route}
              Component={({ href }) => (
                <a className={styles.icons} href={href}>
                  <UserIcon />
                </a>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  route: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    menus: state.cache.header || [],
  }
}

export default connect(mapStateToProps)(Header);
