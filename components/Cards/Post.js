import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { randomChoice } from '../../tools';
import styles from './styles/postCard.module.css'

const PostLink = dynamic(() => import("../Links/Post"));
const TagLabel = dynamic(() => import("../Typography/Tag"));
const CardText = dynamic(() => import("../Typography/Card"));
const LazyImage = dynamic(() => import("../Images/LazyImage"));
const Skeleton = dynamic(() => import("react-loading-skeleton"));


export default function PostCard({post: {slug, title, cover, publish_at, rubric, eventDate} = {} }){
    return (
        <PostLink postSlug={slug} covered>
            <div className={styles.postRoot}>
                <LazyImage cover={cover} typeFull={"medium"} skeleton>
                    {({children, url}) =>
                        <div className={styles.postImage}
                             style={{
                                 backgroundImage: url !== undefined ? `url("${url}")` : undefined,
                                 backgroundSize: "cover",
                                 backgroundPosition: "center"
                             }}>
                            {children}
                        </div>
                    }
                </LazyImage>
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
                            publish_at
                                ? dayjs(publish_at).format("D MMMM YYYY")
                                : <Skeleton width={"8em"} />
                        }
                    </TagLabel>
                </div>
            </div>
        </PostLink>
    );
}