import dynamic from "next/dynamic";
import styles from "./styles/miniCard.module.css";

const PostLink = dynamic(() => import("../Links/Post"));
const TagLabel = dynamic(() => import("../Typography/Tag"));
const CardText = dynamic(() => import("../Typography/Card"));
const Skeleton = dynamic(() => import("react-loading-skeleton"));
const AdoptImage = dynamic(() => import("../Images/AdoptImage"));


export default function MiniCard({post: {slug, title, cover, rubric} = {}, themeTitle}){
    return (
        <PostLink postSlug={slug} covered>
            <div className={styles.miniCardRoot}>
                <AdoptImage cover={cover} className={styles.miniCardImage} alt={title} />
                <div className={styles.miniCardText}>
                    <TagLabel type={"small"} color={"var(--primary)"} textTransform={"lowercase"} margin={"0"}>
                        {
                            themeTitle
                                ? themeTitle
                                : (rubric ? rubric.title : <Skeleton width={"5em"}/>)
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