export function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle(arr) {
    let array = new Array(...arr);
    let copy = [], n = array.length, i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * n--);

        // And move it to the new array.
        copy.push(array.splice(i, 1)[0]);
    }

    return copy;
}


export function shuffleChoice(arr, prevBlocks, uniqLength){
    let choice = randomChoice(arr);
    if (prevBlocks.length < uniqLength - 1) return choice;

    while (prevBlocks.slice(prevBlocks.length - (uniqLength - 1 - (choice.lambda ? choice.lambda : 0) )).includes(choice.id) ){
        choice = randomChoice(arr);
    }
    return choice;
}

export function getImageLink(cover, type){
    if ( cover.formats == null || type === "full" ){
        return {
            url: `${process.env.NEXT_PUBLIC_BACKEND}${cover.url}`,
            width: cover.width,
            height: cover.height,
            mime: cover.mime
        };
    }

    let types;
    switch (type){
        case('min'):{
            types = ['thumbnail', 'small', 'medium'];
            break;
        }
        case('medium'):{
            types = ['medium'];
            break;
        }
        default:{
            types = [];
            break;
        }
    }

    for (const typeName of types){
        if ( cover.formats[typeName] !== undefined ){
            return {
                url: `${process.env.NEXT_PUBLIC_BACKEND}${cover.formats[typeName].url}`,
                width: cover.formats[typeName].width,
                height: cover.formats[typeName].height,
                mime: cover.formats[typeName].mime
            };
        }
    }

    return {
        url: `${process.env.NEXT_PUBLIC_BACKEND}${cover.url}`,
        width: cover.width,
        height: cover.height,
        mime: cover.mime
    };
}
