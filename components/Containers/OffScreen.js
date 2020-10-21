import dynamic from "next/dynamic";
const TrackVisibility = dynamic(import("react-on-screen"));

export default function Offscreen ({children}){
    return (
        <>
            {
                typeof window !== "undefined"
                    ? <TrackVisibility partialVisibility once>
                        {({ isVisible }) => isVisible && children}
                    </TrackVisibility>
                    : children
            }
        </>
    );
};