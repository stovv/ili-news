import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { randomChoice } from '../../tools';
import styles from './styles/postCard.module.css'

const PostLink = dynamic(() => import("../Links/Post"));
const TagLabel = dynamic(() => import("../Typography/Tag"));
const CardText = dynamic(() => import("../Typography/Card"));
const AdoptImage = dynamic(() => import("../Images/AdoptImage"));
const Skeleton = dynamic(() => import("react-loading-skeleton"));


export default function PostCard({post: {slug, title, cover, published_at, rubric, event} = {}, style }){
    return (
        <PostLink postSlug={slug} covered>
            <div className={styles.postRoot} style={style}>
                <AdoptImage cover={cover} className={styles.postImage} alt={title}/>
                <div className={styles.postTextCard}>
                    <TagLabel type={"normal"} color={"var(--primary)"}
                              textTransform={"lowercase"} margin={"0"}>
                        {
                            rubric
                                ? rubric.title
                                : <Skeleton width={`${randomChoice([3, 4, 5])}em`} />
                        }
                    </TagLabel>
                    <CardText type={"normal"} margin={"var(--spacing-xs) 0"}>
                        {
                            title
                                ? title
                                : <>
                                    <Skeleton width={`${randomChoice([7, 8, 9, 10])}em`} />
                                    <br/>
                                    <Skeleton width={`${randomChoice([8, 10, 11, 12])}em`} />
                                </>
                        }
                    </CardText>
                    <TagLabel type={"small"} color={"var(--backgroundInvert)"} margin={"0"}>
                        {
                            published_at
                                ? dayjs(published_at).format("D MMMM YYYY")
                                : <Skeleton width={"8em"} />
                        }
                    </TagLabel>
                </div>
            </div>
        </PostLink>
    );
}