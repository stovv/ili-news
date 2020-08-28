export const TurboHeading = (data) => (`<h${data.level}>${data.text}</h${data.level}>`);
export const TurboParagraph = (data) => (`<p>${data.text}</p>`);
export const TurboQuote = (data) => (`<blockquote><p>${data.text.replace(/\\n/g, '<br/>')}</p></blockquote>`);
export const TurboImage = (data) => ( data.caption ? `<figure><img src="${data.file.url}"/><figcaption>${data.caption}</figcaption></figure>` : `<img src="${data.file.url}"/>`);
export const TurboEmbed = (data) => `
<iframe src="${data.embed}"
        width="560"
        height="315"
        frameborder="0">
</iframe>
`;