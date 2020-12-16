import { NextSeo, BreadcrumbJsonLd } from "next-seo";
import { DEFAULT_SITE_OG_IMAGES } from '../../constants';

export default function ArchiveSeo (){
    const title = "Статьи";
    const description = "Все статьи и рубрики молодежного журнала";
    return (
        <>
            <NextSeo
                // maximum 45 symbols
                title={`${title} | ИЛИ Нижний Новгород`}

                // maximum 153 symbols
                description={description}
                canonical={`${process.env.NEXT_PUBLIC_HOST}/archive`}
                openGraph={{
                    type: 'website',
                    url: `${process.env.NEXT_PUBLIC_HOST}/archive`,
                    title: `${title} | ИЛИ Нижний Новгород`,
                    description,
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
                        name: title,
                        item: `${process.env.NEXT_PUBLIC_HOST}/archive`,
                    }
                ]}
            />
        </>
    );
}