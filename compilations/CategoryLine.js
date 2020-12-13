import dynamic from "next/dynamic";

import styles from './styles/CategoryLine.module.css'

const Skeleton = dynamic(() => import("react-loading-skeleton"));
const PostsLine = dynamic(() => import("./PostsLine"));
const CardText = dynamic(() => import("../components/Typography/Card"));


export default function CategoryLine({posts = [{}, {}, {}, {}], category}){
    return (
        <div className={styles.categoryRoot}>
            <CardText type={"large"} margin={"0 0 24px 0"}>
                {category ? category.title : <Skeleton width={"8em"}/> }
            </CardText>
            <PostsLine posts={posts}/>
        </div>
    );
}