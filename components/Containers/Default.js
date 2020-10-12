import React from 'react';
import Common from './Common';

import styles from './styles/containers.module.css';

const Default = ({children, mt, mb})=>(
    <Common mt={mt} mb={mb}>
        <div className={styles.def}>
            {children}
        </div>
    </Common>
);

export default Default;