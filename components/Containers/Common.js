import React from "react";

const Common = ({mt, mb, children}) => (
    <div style={{
        maxWidth: "1440px",
        margin: `${mt !== undefined ? mt : "0"} auto ${mb !== undefined ? mb : "0"} auto`
    }}>
        {children}
    </div>
);

export default Common