import { NextSeo, SiteLinksSearchBoxJsonLd, LogoJsonLd, SocialProfileJsonLd } from "next-seo";
import { DEFAULT_SITE_OG_IMAGES } from '../../constants';

export default function IndexSeo (){
    return (
        <>
            <NextSeo
                // maximum 45 symbols
                title={process.env.NEXT_PUBLIC_SITE_TITLE}

                // maximum 153 symbols
                description={process.env.NEXT_PUBLIC_DESCRIPTION}
                canonical={process.env.NEXT_PUBLIC_HOST}
                openGraph={{
                    type: 'website',
                    url: process.env.NEXT_PUBLIC_HOST,
                    title: process.env.NEXT_PUBLIC_SITE_TITLE,
                    description: process.env.NEXT_PUBLIC_DESCRIPTION,
                    images: DEFAULT_SITE_OG_IMAGES(process.env.NEXT_PUBLIC_BACKEND, process.env.NEXT_PUBLIC_DESCRIPTION)
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
            />
            <LogoJsonLd
                url={process.env.NEXT_PUBLIC_HOST}
                logo={process.env.NEXT_PUBLIC_LOGO}
            />
            <SiteLinksSearchBoxJsonLd
                url={process.env.NEXT_PUBLIC_HOST}
                potentialActions={[
                    {
                        target: `${process.env.NEXT_PUBLIC_HOST}/search/?q`,
                        queryInput: 'search_term_string',
                    }
                ]}
            />
            <SocialProfileJsonLd
                type="Organization"
                name="ИЛИ Медиа"
                url={process.env.NEXT_PUBLIC_HOST}
                sameAs={[
                    'https://vk.com/ili_media',
                    'https://zen.yandex.ru/ilinnov',
                    'https://www.instagram.com/instannov'
                ]}
            />
        </>
    );
}