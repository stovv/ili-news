import styles from "./styles/miniCard.module.css";
import Heading from "../Typography/Heading";
import TagLabel from "../Typography/Tag";
import CardText from "../Typography/Card";
import PostLink from "../Links/Post";
import Skeleton from "react-loading-skeleton";
import LazyImage from "../Images/LazyImage";

export default function MiniCard({post: {slug, title, cover, rubric} = {}}){
    return (
        <PostLink postSlug={slug} covered>
            <div className={styles.miniCardRoot}>
                <LazyImage cover={cover} typeFull={"min"} skeleton>
                    {({children, url}) => (
                        <div className={styles.miniCardImage} style={{
                            backgroundImage: url !== undefined ? `url("${url}")` : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}>
                            {children}
                        </div>
                    )}
                </LazyImage>
                <div className={styles.miniCardText}>
                    <TagLabel type={"small"} color={"var(--primary)"} textTransform={"lowercase"} margin={"0"}>
                        {
                            rubric
                                ? rubric.title
                                : <Skeleton width={"5em"}/>
                        }
                    </TagLabel>
                    <CardText type={"small"} margin={"var(--spacing-xs) 0 0 0"} maxLines={4}>
                        {
                            title
                                ? title
                                : <>
                                    <Skeleton width={"8em"}/>
                                    <br/>
                                    <Skeleton width={"7em"}/>
                                    <br/>
                                    <Skeleton width={"7em"}/>
                                    <br/>
                                    <Skeleton width={"4em"}/>
                                </>
                        }
                    </CardText>
                </div>
            </div>
        </PostLink>
    );
}