import dayjs from "dayjs";
import { Fragment } from 'react';
import dynamic from "next/dynamic";
import styles from './styles/News.module.css';

const Skeleton = dynamic(() => import("react-loading-skeleton"));
const PostLink = dynamic(() => import("../components/Links/Post"));
const TagLabel = dynamic(() => import("../components/Typography/Tag"));
const CardText = dynamic(() => import("../components/Typography/Card"));
const Heading = dynamic(() => import("../components/Typography/Heading"));


const NewsItem = ({title, slug, publish_at}) => (
    <div className={styles.newsItem}>
        <PostLink postSlug={slug} covered>
            <CardText type={"small"} color={"var(--text-primary)"} margin={"20px 0 var(--spacing-xs) 0"}
                     breakWord hover maxLines={2}>
                { title ? title : <Skeleton width={"10em"}/> }
            </CardText>
        </PostLink>
        <TagLabel type={"small"} margin={"0 0 20px 0"} color={"var(--text-secondary)"}>
            { publish_at ? dayjs(publish_at).format("D MMMM YYYY") : <Skeleton width={"10em"}/> }
        </TagLabel>
    </div>
);

export default function News({ news = [{}] }){
    return (
        <div className={styles.NewsContainer}>
            <Heading level={4} textTransform={"uppercase"} margin={"24px 0"}
                     color={"var(--primary)"} userSelect={"none"}>Новости города</Heading>
            {
                news.map((item, index) =>
                        <Fragment key={index}>
                            <NewsItem {...item}/>
                        </Fragment>
                )
            }
        </div>
    );
}