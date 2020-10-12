import React from "react";
import styles from "./styles/click.module.css";

export const SimpleClick = ({children, ...props}) => <div className={styles.simpleClick} {...props}>{children}</div>;