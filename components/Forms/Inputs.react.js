import React from 'react';
import styles from './styles/inputs.module.css';


export const SearchInput = (props) => <input className={styles.search} {...props}/>;

const LoginLabel = ({children, ...props}) => <span className={styles.loginLabel} {...props}>{children}</span>;

const LoginInp = ({error, ...props}) => <input className={`${styles.search}${ error ? ` ${styles.error}` : '' }`} {...props}/>;

// TODO: Add Error label
export const LoginInput = (props) => (
    <>
        {/*{*/}
        {/* props.error && <LoginLabel>{props.label}</LoginLabel>*/}
        {/*}*/}
        <LoginInp {...props}/>
    </>
);