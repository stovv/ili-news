import styles from './styles/tag.module.css';


export default function TagLabel({ type, color, margin, textTransform, textAlign, weight,
                                     width, height, maxWidth, maxHeight, children, ...props}){
    let tagClass = typeof styles[type] === "undefined" ? styles.large : styles[type];
    return (
        <p className={tagClass} style={{
            color, margin, textTransform, textAlign, weight,
            width, height, maxWidth, maxHeight}} {...props}>
            {children}
        </p>
    )
}
