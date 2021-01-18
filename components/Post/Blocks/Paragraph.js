import styles from './styles/postParagraph.module.css';

export default function Paragraph({type, data}){
    return (
        <p className={styles.textStyle}
           dangerouslySetInnerHTML={{__html:data.text}}/>
    );
}