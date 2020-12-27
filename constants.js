export const HEADER_IGNORE = ["/login", "/register", "/register/success"];
export const FOOTER_IGNORE = ["/login", "/register", "/register/success"];
export const BUTTON_BANNER_COVER = {
    "width": 5472,
    "height": 3648,
    "formats": {
        "jpeg": {
            "ext": ".jpeg",
            "url": "/uploads/banner_9a41d58810.jpeg",
            "hash": "banner_9a41d58810",
            "mime": "image/jpeg",
            "name": "banner",
            "size": 3059.99,
            "width": 5472,
            "height": 3648
        },
        "large": [
            {
                "ext": ".jpg",
                "url": "/uploads/large_banner_9a41d58810.jpg",
                "hash": "large_banner_9a41d58810",
                "mime": "image/jpg",
                "name": "large_.jpg",
                "path": null,
                "size": 162.15,
                "width": 1000,
                "height": 667
            },
            {
                "ext": ".webp",
                "url": "/uploads/large_banner_9a41d58810.webp",
                "hash": "large_banner_9a41d58810",
                "mime": "image/webp",
                "name": "large_.webp",
                "path": null,
                "size": 141.98,
                "width": 1000,
                "height": 667
            }
        ],
        "small": [
            {
                "ext": ".jpg",
                "url": "/uploads/small_banner_9a41d58810.jpg",
                "hash": "small_banner_9a41d58810",
                "mime": "image/jpg",
                "name": "small_.jpg",
                "path": null,
                "size": 40.19,
                "width": 500,
                "height": 333
            },
            {
                "ext": ".webp",
                "url": "/uploads/small_banner_9a41d58810.webp",
                "hash": "small_banner_9a41d58810",
                "mime": "image/webp",
                "name": "small_.webp",
                "path": null,
                "size": 33.98,
                "width": 500,
                "height": 333
            }
        ],
        "base64": [
            {
                "url": "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGBf/EACgQAAICAQMDAQkAAAAAAAAAAAECAxEABAUSEyExYRQiIzIzQVGhwf/EABYBAQEBAAAAAAAAAAAAAAAAAAQCA//EABcRAQEBAQAAAAAAAAAAAAAAAAAhARH/2gAMAwEAAhEDEQA/AHNh26VEi1fxY9OjmItL7rNY7A+D5rKiCP2htE0U7FIualR3AsCrySbeNXJs8DzOG+aWlUL9NbA/Wa+hmdUiQMQTMyEjtdIlE+tGsHD7q42mKN9O6DnJ0pGS0uvN/n1wxTQavj12jQIHk5EA/fiB/MMvOM6//9k=",
                "width": 20,
                "height": 13
            }
        ],
        "medium": [
            {
                "ext": ".jpg",
                "url": "/uploads/medium_banner_9a41d58810.jpg",
                "hash": "medium_banner_9a41d58810",
                "mime": "image/jpg",
                "name": "medium_.jpg",
                "path": null,
                "size": 94.92,
                "width": 750,
                "height": 500
            },
            {
                "ext": ".webp",
                "url": "/uploads/medium_banner_9a41d58810.webp",
                "hash": "medium_banner_9a41d58810",
                "mime": "image/webp",
                "name": "medium_.webp",
                "path": null,
                "size": 84.73,
                "width": 750,
                "height": 500
            }
        ],
        "thumbnail": [
            {
                "ext": ".jpg",
                "url": "/uploads/thumbnail_banner_9a41d58810.jpg",
                "hash": "thumbnail_banner_9a41d58810",
                "mime": "image/jpeg",
                "name": "thumbnail_banner",
                "path": null,
                "size": 9.87,
                "width": 234,
                "height": 156
            }
        ]
    },
    "url": "/uploads/banner_9a41d58810.webp",
    "mime": "image/webp"
}

export const DEFAULT_SITE_OG_IMAGES = (backendHost, alt) => [
    {
        url: `${backendHost}/uploads/small_site_cover_96287befcf.webp`,
        width: 500,
        height: 271,
        alt,
    },
    {
        url: `${backendHost}/uploads/thumbnail_site_cover_96287befcf.jpg`,
        width: 245,
        height: 133,
        alt,
    },
];