import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import { DEFAULT_SITE_OG_IMAGES } from '../../constants';

export default function RubricSeo ({slug, title, subtitle, category: {title: catTitle, slug: catSlug}}){
    return (
        <>
            <NextSeo
                // maximum 45 symbols
                title={`${title} | ИЛИ Нижний Новгород`}

                // maximum 153 symbols
                description={subtitle}
                canonical={`${process.env.NEXT_PUBLIC_HOST}/rubric/${slug}`}
                openGraph={{
                    type: 'website',
                    url: `${process.env.NEXT_PUBLIC_HOST}/rubric/${slug}`,
                    title: `${title} | ИЛИ Нижний Новгород`,
                    subtitle,
                    images: DEFAULT_SITE_OG_IMAGES(process.env.NEXT_PUBLIC_BACKEND, process.env.NEXT_PUBLIC_DESCRIPTION)
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
            />
            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        position: 1,
                        name: catTitle,
                        item: `${process.env.NEXT_PUBLIC_HOST}/category/${catSlug}`,
                    },
                    {
                        position: 2,
                        name: title,
                        item: `${process.env.NEXT_PUBLIC_HOST}/rubric/${slug}`,
                    }
                ]}
            />
        </>
    );
}