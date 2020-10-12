import React from 'react';
import styles from './styles/emojiToast.module.css';


class EmojiToast extends React.Component{
    constructor(props){
        super(props);
        this.onClose = props.onClose;
    }

    render(){
        return(
            <div className={styles.container} onClick={this.onClose}>
                <div className={styles.text}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default EmojiToast;