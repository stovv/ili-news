import dynamic from "next/dynamic";
import styles from './styles/KudaGo.module.css';

const TagBar = dynamic(() => import("./TagBar"));
const CardText = dynamic(() => import("../Typography/Card"));


export default function KudaGoBar({dateName = "когда-нибудь", posts = []}){
    return (
        <div className={styles.kudaGoWrapper} id={"skip-app-container"}>
            <div className={styles.kudaGoText}>
                <CardText type={"large"} fontWeight={"bold"} margin={"0"}>Куда пойти на {dateName}?</CardText>
            </div>
            <div className={styles.kudaGoTextMini}>
                <CardText type={"normal"} fontWeight={"bold"} margin={"0"}>Куда пойти на {dateName}?</CardText>
            </div>
            <TagBar tags={posts.map(post => ({
                text: post.title,
                link: { post }
            }))}/>
        </div>
    );
}