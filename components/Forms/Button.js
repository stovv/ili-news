import styles from './styles/Button.module.css'

export default function Button({link = false, children, onClick, float, style, className, href, type = "Simple"}){
    return (
        link ? <a className={`${styles[type]} ${className}`} href={href} style={{float, ...style}}>
                {children}
               </a>
             : <button className={`${styles[type]} ${className}`} onClick={onClick} style={{float, ...style}}>
                {children}
               </button>
    );
}