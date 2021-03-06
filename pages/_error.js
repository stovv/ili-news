import { connect } from 'react-redux';

import styles from "../styles/NotFound.module.css";
import { changeInfinityState } from "../actions/common";

function Error({ dispatch, statusCode }) {
    dispatch(changeInfinityState(false));

    return (
        <>
            <h1 className={styles.code}>{statusCode}</h1>
            <h2 className={styles.textCode}>{statusCode === 404 ? "страница не найдена" : "что то не так"}</h2>
        </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default connect()(Error);