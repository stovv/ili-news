export const HEADER_IGNORE = ["/login", "/register", "/register/success"];
export const FOOTER_IGNORE = ["/login", "/register", "/register/success"];
export const BUTTON_BANNER_COVER = {
    "formats": {
        "large": {
            "ext": "",
            "url": "/uploads/large_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "hash": "large_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "mime": "image/jpeg",
            "name": "large_photo-1457369804613-52c61a468e7d",
            "path": null,
            "size": 162.26,
            "width": 1000,
            "height": 667
        },
        "small": {
            "ext": "",
            "url": "/uploads/small_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "hash": "small_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "mime": "image/jpeg",
            "name": "small_photo-1457369804613-52c61a468e7d",
            "path": null,
            "size": 40.13,
            "width": 500,
            "height": 333
        },
        "medium": {
            "ext": "",
            "url": "/uploads/medium_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "hash": "medium_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "mime": "image/jpeg",
            "name": "medium_photo-1457369804613-52c61a468e7d",
            "path": null,
            "size": 95.06,
            "width": 750,
            "height": 500
        },
        "thumbnail": {
            "ext": "",
            "url": "/uploads/thumbnail_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "hash": "thumbnail_photo_1457369804613_52c61a468e7d_ba8e57c3dc",
            "mime": "image/jpeg",
            "name": "thumbnail_photo-1457369804613-52c61a468e7d",
            "path": null,
            "size": 9.89,
            "width": 234,
            "height": 156
        }
    },
    "url": "/uploads/photo_1457369804613_52c61a468e7d_ba8e57c3dc"
}
export const DEFAULT_SITE_OG_IMAGES = (backendHost, alt) => [
    {
        url: `${backendHost}/uploads/small_site_cover_9fa00748ea.jpg`,
        width: 500,
        height: 271,
        alt,
    },
    {
        url: `${backendHost}/uploads/thumbnail_site_cover_9fa00748ea.jpg`,
        width: 245,
        height: 133,
        alt,
    },
];