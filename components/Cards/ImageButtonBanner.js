import styles from './styles/ImageWithButton.module.css'
import LazyImage from "../Images/LazyImage";
import CardText from "../Typography/Card";
import Button from "../Forms/Button";
import UniversalLink from "../Links/Universal";
import Skeleton from "react-loading-skeleton";

export default function ImageWithButtonBanner({title, cover, buttonUrl, buttonText}){
    return (
        <div className={styles.bannerRoot}>
            <LazyImage cover={cover} typeFull={"medium"} skeleton>
                {({children, url}) =>
                    <div className={styles.bannerImage}
                         style={{
                             backgroundImage: `url("${url}")`,
                             backgroundSize: "cover",
                             backgroundPosition: "center"
                         }}>
                        {children}
                    </div>
                }
            </LazyImage>
            <div className={styles.bannerGradient}/>
            <div className={styles.bannerContent}>
                <CardText type={"xxlarge"} color={"var(--text-onPrimary)"}
                          textAlign={"right"} margin={"0 0 24px 0"} width={"361px"}>
                    {
                        title
                            ? title
                            : <>
                                <Skeleton width={"8em"}/>
                                <br/>
                                <Skeleton width={"7"}/>
                                <br/>
                                <Skeleton width={"6"}/>
                            </>
                    }
                </CardText>
                {
                    buttonText &&
                    <UniversalLink item={{url: {link: buttonUrl}}}
                                   Component={({active, ...props})=>
                                       <a {...props}><Button float={"right"}>{buttonText}</Button></a>
                                   }
                    />
                }
            </div>
        </div>
    )
}