export function getFormatedDate(date) {
    let mainDate = new Date(date) || new Date();
    return mainDate.toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' }).replace('г.', '');
}

export function HEX2RGB(hex){
    const aRgbHex = hex.match(/.{1,2}/g);
    return [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
}