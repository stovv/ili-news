import styles from './styles/cardText.module.css';


export default function CardText({ type, children, maxLines, wrap, maxHeight, maxWidth, hover, ...props}){
    const textStyle = typeof styles[type] !== "undefined" ? styles[type] : styles.normal;
    return (
        <p className={`${textStyle}${maxLines !== undefined ? ` ${styles.hiddenOverflow}` : '' }${wrap !== undefined ? ` ${styles.wrapped}` : ''}${hover ? ` ${styles.hoverable}` : ''}`}
           style={{
               ...props,
               WebkitLineClamp: maxLines !== undefined ? `${maxLines}` : "unset",
               maxWidth, maxHeight: maxLines !== undefined ? `${maxLines}.8em` : maxHeight,
           }}>
            {children}
        </p>
    );
}