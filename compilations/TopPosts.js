import { Component } from 'react';
import dynamic from "next/dynamic";
import { arrayOf, object } from 'prop-types';

import styles from './styles/TopPosts.module.css';
import containers from '../styles/Containers.module.css';

const Skeleton = dynamic(() => import("react-loading-skeleton"));
const PostCard = dynamic(() => import("../components/Cards/Post"));
const TagText = dynamic(() => import("../components/Typography/Tag"));
const LargePost = dynamic(() => import("../components/Cards/LargePost"));
const Heading = dynamic(() => import("../components/Typography/Heading"));
const LazyImage = dynamic(() => import("../components/Images/LazyImage"));


class TopPosts extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        const { posts = [] } = this.props;
        const [ first = {}, second = {}, third = {} ] = posts;
        return (<>
            <div className={`${styles.topPostBgRoot}`}>
                <LazyImage cover={first.cover} typeFull={"full"} skeleton>
                    {({children, url}) =>
                        <div style={{
                            backgroundImage: url !== undefined ? `url("${url}")` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} className={styles.bgImage}>
                            {children}
                        </div>
                    }
                </LazyImage>
                <div className={styles.overlay}>
                    <div className={containers.CommonContainer}>
                        <TagText color={"var(--text-onPrimary)"} textTransform={"lowercase"} margin={"48px 0 13px 0"}>
                            { first.rubric ? first.rubric.title : <Skeleton width={"5em"}/>}
                        </TagText>
                        <Heading color={"var(--text-onPrimary)"} margin={0} level={1} breakWord maxWidth={"900px"}>
                            {
                                first.title
                                    ? first.title
                                    : <>
                                        <Skeleton width={"12em"}/>
                                        <br/>
                                        <Skeleton width={"10em"}/>
                                    </>
                            }
                        </Heading>
                    </div>
                </div>
            </div>
            <div className={`${styles.topPostContainer} ${styles.hideLaptop}`}>
                <Heading level={5} color={"var(--primary)"} margin={"var(--spacing-block) 0 0 0"} userSelect={"none"}>
                    Популярное
                </Heading>
            </div>
            <div className={styles.topPostContainer}>
                <div className={containers.SimpleFlex}>
                    <div className={styles.hideMobile}>
                        <LargePost margin={"-146px 0 0 0"} post={first}/>
                    </div>
                    <div className={styles.hideLaptop}>
                        <PostCard post={first}/>
                    </div>
                    <PostCard post={second}/>
                    <PostCard post={third}/>
                </div>
            </div>
        </>);
    }
}

TopPosts.propTypes = {
    posts: arrayOf(object).isRequired
}

export default TopPosts;