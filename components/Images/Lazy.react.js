import React from 'react';
import styled from 'styled-components';

const ImageStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: ${props => props.borderRadius};
  background: url("${props => props.error ? props.errorSrc : (props.loading ? props.loadingSrc : props.actualSrc)}") center;
  filter: ${props => props.error || props.loading ? "blur(24px)" : "unset"};
  display: ${props=> props.visible ? 'block' : 'none'};
`;


const Lazy = ({ StyledImage=ImageStyle, src, ...props }) => {
    const [isImageLoaded, setImageLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const Thumb = src.replace('large', 'thumb');

    React.useEffect(() => {
        const img = new Image();

        img.onload = () => setImageLoaded(true);
        img.onerror = () => setHasError(true);

        img.src = src;
    }, [src])

    return (
        <StyledImage
            loadingSrc={Thumb}
            actualSrc={src}
            errorSrc={Thumb}
            loading={!isImageLoaded}
            error={hasError}
            {...props}
        />
    )
};

export default Lazy;