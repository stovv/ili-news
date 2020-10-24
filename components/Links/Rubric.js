import React from 'react';
import Link from "next/link";
import styles from "./Link.module.css";

export default function RubricLink ({ rubricSlug, children,covered, passHref = true, scroll = true, ...props }) {
 return (
     <Link href={"/rubric/[rubricSlug]"} as={`/rubric/${rubricSlug}`} passHref={passHref} scroll={scroll}>
         {
             covered
                 ? <a className={styles.noDecoration} style={{...props}}>
                     {children}
                 </a>
                 : children
         }
     </Link>
 );
}