export default {

    time: 1556098174501,
    blocks: [
    {
        type: "header",
        data: {
        text: "Заголовок",
        level: 2
        }
    },
    {
        type: "paragraph",
        data: {
        text:
            "Очень интересный текст статьи...."
        }
    },
    {
        type: "header",
        data: {
        text: "Заголовок списка",
        level: 3
        }
    },
    {
        type: "list",
        data: {
        style: "unordered",
        items: [
            "Первое",
            "Второе",
            'И главное, <code class="inline-code">третье</code>'
        ]
        }
    },
    /*{
        type: "delimiter",
        data: {}
    },*/
    ],
    version: "2.16.1"
}