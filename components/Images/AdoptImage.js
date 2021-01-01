import { Fragment } from 'react';
import { string, object } from 'prop-types';

const mediaMapping = {
    medium: "(min-width: 750px)",
    small: "(min-width: 320px)",
    thumbnail: "(min-width: 100px)"
}

export default function AdoptImage({ cover, style, className, alt }){
    if (cover === undefined) return null
    const { formats:{ jpg: defaultImage = {}, ...formats }, ...sourceImage} = cover;

    return (
        <picture>
            {
                Object.keys(formats).map((formatType, index) =>{
                    if (mediaMapping[formatType] === undefined) return null;
                    return Object.values(formats[formatType]).map(format => {
                        return (
                            <Fragment key={index}>
                                <source media={mediaMapping[formatType]} type={format.mime}
                                        srcSet={`${process.env.NEXT_PUBLIC_BACKEND}${format.url}`}/>
                            </Fragment>
                        );
                    });
                })
            }
            <source media="(min-width: 689px)"
                    type={sourceImage.mime}
                    srcSet={`${process.env.NEXT_PUBLIC_BACKEND}${sourceImage.url}`}
            />
            <img className={className}
                 src={`${process.env.NEXT_PUBLIC_BACKEND}${defaultImage.url}`}
                 alt={alt} style={style}
            />
        </picture>
    );
}

AdoptImage.propTypes = {
    cover: object.isRequired,
    style: object,
    className: string,
    alt: string.isRequired
};
