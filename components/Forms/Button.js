import styles from './styles/Button.module.css'

export default function Button({children, onClick, float}){
    return (
        <button className={styles.Simple} onClick={onClick} style={{float}}>{children}</button>
    );
}