import dynamic from "next/dynamic";
import styles from './styles/largePostCard.module.css';
import PostLink from "../Links/Post";
import TagLabel from "../Typography/Tag";


const CardText = dynamic(() => import("../Typography/Card"));
const LazyImage = dynamic(() => import("../Images/LazyImage"));
const Skeleton = dynamic(() => import("react-loading-skeleton"));


const Content = ({theme, description, title, type = "large", style}) => (
    <>
        {
            theme
                ? <div className={styles.themeText} style={style}>
                    <TagLabel type={type} color={"var(--text-onPrimary)"} textTransform={"lowercase"}
                              margin={"0"} textAlign={"right"}>
                        { theme.length > 0 ? theme : <Skeleton width={"5em"}/> }
                    </TagLabel>
                    <CardText type={type} color={"var(--text-onPrimary)"}
                              margin={"11px 0 0 0"} maxWidth={"576px"} textAlign={"right"}>
                        {
                            title
                                ? title
                                : <>
                                    <Skeleton width={"10em"}/>
                                    <br/>
                                    <Skeleton width={"8em"}/>
                                    <br/>
                                    <Skeleton width={"5em"}/>
                                </>
                        }
                    </CardText>
                </div>
                : <div className={styles.description} style={style}>
                    <CardText type={type} color={"var(--text-onPrimary)"}
                              margin={"0"} maxWidth={"576px"}>
                        {
                            description
                                ? description
                                : <>
                                    <Skeleton width={"10em"}/>
                                    <br/>
                                    <Skeleton width={"8em"}/>
                                    <br/>
                                    <Skeleton width={"5em"}/>
                                </>
                        }
                    </CardText>
                </div>
        }
    </>
)


export default function LargeCard ({theme, post: {slug, title, cover, rubric, description, eventDate} = {},
                                       margin="0", maxWidth, height, width, minWidth}) {
    return (
        <PostLink postSlug={slug} covered width={"100%"}>
            <div className={styles.cardContainer} style={{margin, maxWidth, width, height, minWidth}}>
                <LazyImage cover={cover} typeFull={"full"} skeleton>
                    {({children, url}) =>
                        <div className={styles.imageCard} style={{
                            backgroundImage: url !== undefined ? `url("${url}")` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>{children}</div>
                    }
                </LazyImage>
                <div className={styles.overlay}>
                    <Content title={title} theme={theme} description={description} type={"large"}/>
                </div>
            </div>
        </PostLink>
    );

}