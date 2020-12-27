import styles from './styles/ImageWithButton.module.css'
import AdoptImage from "../Images/AdoptImage";
import CardText from "../Typography/Card";
import Button from "../Forms/Button";
import UniversalLink from "../Links/Universal";
import Skeleton from "react-loading-skeleton";

export default function ImageWithButtonBanner({title, cover, buttonUrl, buttonText}){
    return (
        <div className={styles.bannerRoot}>
            <AdoptImage className={styles.bannerImage} cover={cover} al={title}/>
            <div className={styles.bannerGradient}/>
            <div className={styles.bannerContent}>
                <div className={styles.laptopText}>
                    <CardText type={"xxlarge"} color={"var(--text-onPrimary)"}
                              textAlign={"right"} margin={"0 0 24px 0"} width={"361px"}>
                        {
                            title
                                ? title
                                : <>
                                    <Skeleton width={"8em"}/>
                                    <br/>
                                    <Skeleton width={"7em"}/>
                                    <br/>
                                    <Skeleton width={"6em"}/>
                                </>
                        }
                    </CardText>
                </div>
                <div className={styles.mobileText}>
                    <CardText type={"normal"} color={"var(--text-onPrimary)"}
                              textAlign={"right"} margin={"0 0 24px 0"} maxWidth={"235px"} maxLines={5}>
                        {
                            title
                                ? title
                                : <>
                                    <Skeleton width={"4em"}/>
                                    <br/>
                                    <Skeleton width={"3m"}/>
                                    <br/>
                                    <Skeleton width={"2em"}/>
                                </>
                        }
                    </CardText>
                </div>
                {
                    buttonText &&
                    <UniversalLink item={{url: {link: buttonUrl}}}
                                   Component={({active, ...props})=>
                                       <Button float={"right"} link {...props}>{buttonText}</Button>
                                   }
                    />
                }
            </div>
        </div>
    )
}