import Link from "next/link";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { Component, Fragment } from "react";

import { setCache } from "../../actions/cache";
import styles from "./styles/SiteFooter.module.css";
import { getFooter } from "../../api/methods/public";

const isEqual = require("react-fast-compare");
const Skeleton = dynamic(() => import("react-loading-skeleton"));
const Logo = dynamic(() => import("../../assets/logo"), {
  loading: () => <Skeleton width={"104px"} height={"104px"} />,
});
const UniversalLink = dynamic(() => import("../Links/Universal"));

const LoadingLink = () => (
  <li className={styles.menuLinksItem}>
    <div className={styles.siteLink}>
      <Skeleton width={"120px"} />
    </div>
  </li>
);

const LinksSkeleton = () =>
  [...Array(5).keys()].map((index) => (
    <Fragment key={index}>
      <LoadingLink />
    </Fragment>
  ));

const SocialLinksSkeleton = () =>
  [...Array(6).keys()].map((index) => (
    <Fragment key={index}>
      <Skeleton width="24px" height="24px" />
    </Fragment>
  ));

class Footer extends Component {
  componentDidMount() {
    const { dispatch, siteMenus, socialMenus } = this.props;
    getFooter()
      .then((response) =>{
        if (!isEqual(response.data.item, siteMenus)){
          dispatch(setCache('siteMenus', response.data.item));
        }
        if (!isEqual(response.data.social_item, socialMenus)){
          dispatch(setCache('socialMenus', response.data.social_item));
        }
      })
      .catch(e => console.log("Something wrong with getting footer menus, try again -> ", e))
  }

  render() {
    const { route, active, socialMenus, siteMenus } = this.props;

    return (
      <footer
        className={styles.footerRoot}
        style={{ display: active ? undefined : "none" }}
      >
        <div className={styles.footerWrapper}>
          <div className={styles.logoWithSocial}>
            <Link href="/" passHref>
              <a className={styles.centerizeContent}>
                <Logo
                  className={styles.logo}
                  primary={"var(--primary)"}
                  background={"transparent"}
                />
              </a>
            </Link>
            <div className={styles.centerizeContent}>
              <div className={styles.socialLinks}>
                {socialMenus.length > 0 ? (
                  socialMenus.map((item, index) => (
                    <Fragment key={index}>
                      <UniversalLink item={item} route={route} />
                    </Fragment>
                  ))
                ) : (
                  <SocialLinksSkeleton />
                )}
              </div>
            </div>
          </div>
          <div className={styles.linksWithText}>
            <div className={styles.centerizeContent}>
              <ul className={styles.menuLinks}>
                {siteMenus.length > 0 ? (
                  siteMenus.map((item, index) => (
                    <Fragment key={index}>
                      <li className={styles.menuLinksItem}>
                        <UniversalLink
                          item={item}
                          route={route}
                          Component={({ href, children, active, ...props }) => (
                            <a
                              href={href}
                              className={styles.siteLink}
                              {...props}
                            >
                              {children}
                            </a>
                          )}
                        />
                      </li>
                    </Fragment>
                  ))
                ) : (
                  <LinksSkeleton />
                )}
              </ul>
            </div>
            <div className={styles.centerizeContent}>
              <div>
                <p className={styles.footerText}>
                  Городской интернет-журнал «ИЛИ» 2020
                </p>
                <p className={styles.footerTextSecond}>
                  Использование материалов Журнала ИЛИ разрешено только с
                  предварительного согласия правообладателей. Мнение редакции
                  может не совпадать с мнением автора.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    active: !state.common.infinityActive,
    siteMenus: state.cache.siteMenus || [],
    socialMenus: state.cache.socialMenus || []
  }
}

export default connect(mapStateToProps)(Footer);
