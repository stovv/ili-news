import styles from './styles/Button.module.css'

export default function Button({link = false, children, onClick, float, href}){
    return (
        link ? <a className={styles.Simple} href={href} style={{float}}>
                {children}
               </a>
             : <button className={styles.Simple} onClick={onClick} style={{float}}>
                {children}
               </button>
    );
}