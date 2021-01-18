import dynamic from "next/dynamic";
import styles from './styles/postImages.module.css';

const AdoptImage = dynamic(() => import("../../Images/AdoptImage"));


export default function Image({data, type}){
    return <>
        <AdoptImage cover={data.file} className={styles.simpleImage}/>
        {
            data.caption.length > 0 &&
            <figcaption className={styles.simpleImageCaption}>
                {data.caption}
            </figcaption>
        }
    </>;
}