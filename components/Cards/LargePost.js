import dynamic from "next/dynamic";
import styles from './styles/largePostCard.module.css';
import PostLink from "../Links/Post";
import TagLabel from "../Typography/Tag";


const CardText = dynamic(() => import("../Typography/Card"));
const LazyImage = dynamic(() => import("../Images/LazyImage"));
const Skeleton = dynamic(() => import("react-loading-skeleton"));


export default function LargeCard ({theme, post: {slug, title, cover, rubric, description, eventDate} = {},
                                       margin="0", maxWidth, height, width}) {
    return (
        <PostLink postSlug={slug} covered>
            <div className={styles.cardContainer} style={{margin, maxWidth, width, height}}>
                <LazyImage cover={cover} typeFull={"full"} skeleton>
                    {({children, url}) =>
                        <div className={styles.imageCard} style={{
                            backgroundImage: `url("${url}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>{children}</div>
                    }
                </LazyImage>
                <div className={styles.overlay}>
                    {
                        theme
                            ? <div className={styles.themeText}>
                                <TagLabel type={"large"} color={"var(--text-onPrimary)"} textTransform={"lowercase"}
                                          margin={"0"} textAlign={"right"}>
                                    { theme.length > 0 ? theme : <Skeleton width={"5em"}/> }
                                </TagLabel>
                                <CardText type={"large"} color={"var(--text-onPrimary)"}
                                          margin={"11px 0 0 0"} maxWidth={"576px"} textAlign={"right"}>
                                    {
                                        title
                                            ? title
                                            : <>
                                                <Skeleton width={"20em"}/>
                                                <br/>
                                                <Skeleton width={"15em"}/>
                                                <br/>
                                                <Skeleton width={"10em"}/>
                                            </>
                                    }
                                </CardText>
                            </div>
                            : <div className={styles.description}>
                                <CardText type={"large"} color={"var(--text-onPrimary)"}
                                          margin={"0"} maxWidth={"576px"}>
                                    {
                                        description
                                            ? description
                                            : <>
                                                <Skeleton width={"20em"}/>
                                                <br/>
                                                <Skeleton width={"15em"}/>
                                                <br/>
                                                <Skeleton width={"10em"}/>
                                            </>
                                    }
                                </CardText>
                            </div>
                    }
                </div>
            </div>
        </PostLink>
    );

}