import React from 'react';
import Link from "next/link";

export default function CategoryLink ({ categorySlug, children, scroll = true }) {
    return (
        <Link href={"/category/[categorySlug]"} as={`/category/${categorySlug}`} passHref scroll={scroll}>
            {children}
        </Link>
    );
};
