import React from 'react';
import Link from "next/link";
import styles from './Link.module.css';

export default function PostLink ({postSlug, covered, children, className, passHref = true, scroll = true, ...props}) {
    return (
        postSlug
          ? <Link href={"/[postSlug]"} as={`/${postSlug}`} passHref={passHref} scroll={scroll} prefetch={false}>
                {
                    covered
                      ? <a className={`${styles.noDecoration}${className !== undefined ? ' ' + className : ''}`} style={{...props}}>
                            {children}
                        </a>
                      : children
                }
            </Link>
          : children
    );
}
