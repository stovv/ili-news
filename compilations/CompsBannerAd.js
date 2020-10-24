import dynamic from "next/dynamic";

import {BUTTON_BANNER_COVER} from "../constants";
import styles from './styles/CompsBannerAd.module.css';
import containers from "../styles/Containers.module.css";
import PostCard from "../components/Cards/Post";

const AdBanner = dynamic(() => import("./Ad"));
const MiniCard = dynamic(() => import("../components/Cards/Mini"));
const LargeCard = dynamic(() => import("../components/Cards/LargePost"));
const ImageWithButtonBanner = dynamic(() => import("../components/Cards/ImageButtonBanner"));


export default function CompsBannerAd({compilation: { title, posts }}) {

    const [ first, second, third ] = posts;
    return (
        <div className={containers.CommonContainer}>
            <div className={styles.bannerRoot}>
                <div className={styles.leftSide}>
                    <div className={styles.topSide}>
                        <LargeCard height={"304px"} width={"100%"}
                                   minWidth={"20px"} theme={title} post={first}/>
                        <div className={styles.miniSide}>
                            <MiniCard post={second}/>
                            <MiniCard post={third}/>
                        </div>
                    </div>
                    <div className={styles.topSideMini}>
                        <PostCard post={first}/>
                        <PostCard post={second}/>
                        <PostCard post={third}/>
                    </div>
                    <ImageWithButtonBanner cover={BUTTON_BANNER_COVER} buttonText={"Присоедениться"} buttonUrl={"hello"}
                                       title={"Стань членом клуба «ИЛИ Премиум» и получай подарки за чтение новостей"}/>
                </div>
                <div className={styles.rightSide}>
                    <AdBanner/>
                </div>
            </div>
        </div>
    );
}