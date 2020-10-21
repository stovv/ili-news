import dynamic from "next/dynamic";
import styles from './styles/NewsPostsComps.module.css';
import containers from '../styles/Containers.module.css';

const News = dynamic(() => import("./News"));
const Mini = dynamic(() => import("../components/Cards/Mini"));
const PostCard = dynamic(() => import("../components/Cards/Post"));
const LargePost = dynamic(() => import("../components/Cards/LargePost"));


export default function NewsPostsComps({compilation, news, posts}){
    const { title: theme, posts: themePosts } = compilation;
    const [ first, second, third ] = themePosts;
    const postsCards = posts.map(post => <PostCard post={post}/>);

    return (
        <div className={containers.CommonContainer}>
            <div className={styles.compilationComps}>
                <div className={styles.leftSide}>
                    {postsCards}
                </div>

                <div className={styles.centerSide}>
                    <LargePost maxWidth={"unset"} width={"100%"} theme={theme} post={first}/>
                    <div className={styles.miniSide}>
                        <Mini post={second}/>
                        <Mini post={third}/>
                    </div>
                </div>

                <div className={styles.centerSideMobile}>
                    <PostCard post={first}/>
                    <PostCard post={second}/>
                    <PostCard post={third}/>
                </div>
                <div className={styles.rightSide}>
                    <News news={news}/>
                </div>
            </div>
            <div className={styles.compilationComps}>
                <div className={styles.bottomSide}>
                    {postsCards}
                </div>
            </div>
        </div>
    );
}