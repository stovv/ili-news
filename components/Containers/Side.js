import dynamic from "next/dynamic";
import styles from './ContainersComp.module.css';

export default function SideContainer ({children, type = 'right', sideChildren, style}){
    return (
        <div className={styles.sideRootContainer} style={style}>
            <div className={styles.sideRootLeft} style={{order : type === 'left' ? 1 : 0}}>
                {children}
            </div>
            <div className={styles.sideRootRight} style={{order : type === 'left' ? 0 : 1}}>
                {sideChildren}
            </div>
        </div>
    );
};