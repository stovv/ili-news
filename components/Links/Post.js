import React from 'react';
import Link from "next/link";
import styles from './Link.module.css';

export default function PostLink ({postSlug, covered, children, passHref = true, scroll = true}) {
    return (
        postSlug
          ? <Link href={"/[postSlug]"} as={`/${postSlug}`} passHref={passHref} scroll={scroll} prefetch={false}>
                {
                    covered
                      ? <a className={styles.noDecoration}>
                            {children}
                        </a>
                      : children
                }
            </Link>
          : children
    );
}
