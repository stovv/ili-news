import dynamic from "next/dynamic";

import {BUTTON_BANNER_COVER} from "../constants";
import styles from './styles/CompsBannerAd.module.css';
import containers from "../styles/Containers.module.css";

const AdBanner = dynamic(() => import("./Ad"));
const MiniCard = dynamic(() => import("../components/Cards/Mini"));
const LargeCard = dynamic(() => import("../components/Cards/LargePost"));
const ImageWithButtonBanner = dynamic(() => import("../components/Cards/ImageButtonBanner"));


export default function CompsBannerAd() {
    return (
        <div className={containers.CommonContainer}>
            {/*<ImageWithButtonBanner cover={BUTTON_BANNER_COVER}*/}
            {/*                       title={"Стань членом клуба «ИЛИ Премиум» и получай подарки за чтение новостей"}*/}
            {/*                       buttonText={"Присоедениться"}*/}
            {/*                       buttonUrl={"hello"}*/}
            {/*/>*/}
            <div className={styles.bannerRoot}>
                <div className={styles.leftSide}>
                    <div className={styles.topSide}>
                        <LargeCard height={"304px"}/>
                        <div className={styles.miniSide}>
                            <MiniCard/>
                            <MiniCard/>
                        </div>
                    </div>
                    <ImageWithButtonBanner/>
                </div>
                <div className={styles.rightSide}>
                    <AdBanner/>
                </div>
            </div>
        </div>
    );
}