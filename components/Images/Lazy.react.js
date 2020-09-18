import React from 'react';
import { Simple } from '../Images';
import { getImageLink } from './tools';


const Lazy = ({cover, component, ...props }) => {
    const [isImageLoaded, setImageLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    let Thumb = ``;
    let Cover = ``;
    if (typeof cover === "object"){
        Thumb = getImageLink(cover, 'min')['url'];
        Cover = getImageLink(cover)['url'];
    }else{
        Thumb = cover;
        Cover = cover;
    }

    React.useEffect(() => {
        const img = new Image();

        img.onload = () => setImageLoaded(true);
        img.onerror = () => setHasError(true);

        img.src = Cover;
    }, [Cover])

    const ImageComponent = (component === undefined) ? Simple : component;

    return (
        <ImageComponent
            external
            withLoading
            loadingSrc={Thumb}
            actualSrc={Cover}
            errorSrc={Thumb}
            loading={!isImageLoaded}
            error={hasError}
            {...props}
        />
    )
};

export default Lazy;