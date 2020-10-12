import React from 'react';
import dynamic from "next/dynamic";
//const TrackVisibility = dynamic(import("react-on-screen"));

const Offscreen = ({children}) => {
    return children;
    // return (
    //     <>
    //         {
    //             typeof window === "undefined"
    //                 ? <TrackVisibility partialVisibility once>
    //                     {({ isVisible }) => isVisible && children}
    //                 </TrackVisibility>
    //                 : children
    //         }
    //     </>
    // );
};

export default Offscreen;