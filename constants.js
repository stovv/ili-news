export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND;
export const SITE_URL = process.env.NEXT_PUBLIC_HOST;
export const OLD_SITE_URL = process.env.NEXT_PUBLIC_OLD_SITE_NAME;
export const YANDEX_VERIFICATION = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
export const YANDEX_METRIKA = { accounts: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ACCOUNTS.split(','), options: { webvisor: process.env.NEXT_PUBLIC_YANDEX_METRIKA_WEBVISOR }};

export const SITE_INFO = {
    TITLE: process.env.NEXT_PUBLIC_SITE_TITLE,
    DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    IMAGE: {
        url: process.env.NEXT_PUBLIC_SITE_DEFAULT_IMAGE,
        width: 112,
        height: 112
    }
}
