import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/paragraph.module.css';


class Paragraph extends React.Component{
    render(){
        const {data} = this.props;

        if (data == null){
            return null
        }

        return (
            <p className={styles.postParagraph} dangerouslySetInnerHTML={{__html: data.text}}/>
        )
    }
}

Paragraph.propTypes = {
    data: PropTypes.object.isRequired
}

export default Paragraph;