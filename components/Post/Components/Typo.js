import React from "react";
import styles from '../styles/typography.module.css';
// Typography for post components and cards

export const Heading = ({children, ...props}) => <h1 className={styles.heading} {...props}>{children}</h1>;

export const Rubric = ({children, ...props}) => <p className={styles.rubric} {...props}>{children}</p>

export const PublishDate = ({children, ...props}) => <span className={styles.publishDate} {...props}>{children}</span>

export const Authors = ({children, ...props}) => <span className={styles.authors} {...props}>{children}</span>

export const EventDateDay = ({children, ...props}) => <p className={styles.eventDateDay} {...props}>{children}</p>

export const EventDateMouth = ({children, ...props}) => <p className={styles.eventDateMouth} {...props}>{children}</p>

export const RatingCounter = ({children, ...props}) => <span className={styles.ratingCount} {...props}>{children}</span>