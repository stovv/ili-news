import React from 'react';
import styles from './Link.module.css';


export default function SocialLink({ item  }) {
    return (
        <a className={styles.noDecoration} href={item.socialUrl}>
            <img src={`${process.env.NEXT_PUBLIC_BACKEND}${item.icon.url}`}
                 alt={"social"} className={styles.socialLinkHover}
                 style={{
                    width: "24px",
                    height: "24px"
                }}/>
        </a>
    );
}
