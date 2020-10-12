import React from "react";
import styles from "./styles/buttons.module.css";


export const SimpleButton = ({children, outline, ...props}) => (
    <button className={`${styles.simple}${outline ? ` ${styles.outline}` : ''}`} {...props}>{children}</button>
);

export const LoginButton = ({children, outline, stuck, ...props}) => (
    <button disabled={stuck} className={`${styles.login}${outline ? ` ${styles.outline}` : ''}`} {...props}>{children}</button>
);