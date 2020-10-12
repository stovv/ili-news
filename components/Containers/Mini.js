import React from 'react';
import Common from "./Common";

const Mini = ({children, mt, mb})=>(
    <Common mt={mt} mb={mb}>
        <div style={{ margin: "0 var(--spacing-m)" }}>
            {children}
        </div>
    </Common>
);

export default Mini;