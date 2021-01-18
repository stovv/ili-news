import styles from './styles/postHeadings.module.css';

const tags = {
    1: (props) => <h2 {...props} className={styles.one}/>,
    2: (props) => <h3 {...props} className={styles.two}/>,
    3: (props) => <h4 {...props} className={styles.three}/>,
    4: (props) => <h4 {...props} className={styles.four}/>,
    5: (props) => <h4 {...props} className={styles.four}/>,
}

export default function Heading({type, data}){
    const HeadingBlock = tags[data.level];
    return (
        <HeadingBlock dangerouslySetInnerHTML={{__html:data.text}}/>
    );
}