import React from 'react';
import Link from "next/link";

export default function RubricLink ({ Component = React.Fragment, rubricSlug, children, passHref = true, scroll = true }) {
 return (
     <Link href={"/rubric/[rubricSlug]"} as={`/rubric/${rubricSlug}`} passHref={passHref} scroll={scroll}>
        {children}
     </Link>
 );
}