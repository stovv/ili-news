

export function getFormatedDate(date) {
    let mainDate = new Date(date) || new Date();
    return mainDate.toLocaleString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' }).replace('г.', '');
}