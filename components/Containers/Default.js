import React from 'react';
import styles from './ContainersComp.module.css';

export default function DefaultContainer({children}){
    return (
        <div className={styles.commonContainer}>
            <div>
                {children}
            </div>
        </div>
    );
};