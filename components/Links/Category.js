import React from 'react';
import Link from "next/link";
import styles from "./Link.module.css";

export default function CategoryLink ({ categorySlug, children, covered, scroll = true, ...props }) {
    return (
        <Link href={"/category/[categorySlug]"} as={`/category/${categorySlug}`} passHref scroll={scroll}>
            {
                covered
                    ? <a className={styles.noDecoration} style={{...props}}>
                        {children}
                    </a>
                    : children
            }
        </Link>
    );
};
