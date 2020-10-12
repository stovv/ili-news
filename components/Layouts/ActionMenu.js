import React from 'react';
import styles from './styles/actionMenu.module.css';


export const Menu = ({children}) => <div className={styles.menu}>{children}</div>

export const Item = ({icon, opened, children, ...props}) => (
    <div className={`${styles.itemHover}${icon !== undefined ? styles.itemHoverIcon : ''}`} {...props}>
        <div className={styles.itemWrap} opened={opened}>
            {children}
            {icon}
        </div>
    </div>
);