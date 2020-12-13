export default function AdBanner({ horizontal, vertical, mobile, maxWidth, maxHeight }){
    if(horizontal){
        return (
            <div style={{
                width: "952px",
                height: "320px",
                maxWidth, maxHeight,
                background: "var(--backgroundInvert)"
            }}>

            </div>
        );
    }else if (vertical) {
        return (
            <div style={{
                width: "296px",
                height: "672px",
                maxWidth, maxHeight,
                background: "var(--backgroundInvert)"
            }}>

            </div>
        );
    }else if (mobile) {
        return (
            <div style={{width: "100%", height: "100%", background: "var(--backgroundInvert)"}}>

            </div>
        );
    }
    return (
        <div style={{width: "100%", height: "100%", background: "var(--backgroundInvert)"}}>

        </div>
    );
}