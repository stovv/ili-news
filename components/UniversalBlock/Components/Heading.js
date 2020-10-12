import React from 'react';

import styles from './styles/heading.module.css'


const headings = {
    1: styles.one,
    2: styles.two,
    3: styles.three,
    4: styles.four,
    5: styles.five,
    6: styles.six,
    7: styles.six
};

class Heading extends React.Component{
    render(){
        const  { data } = this.props;
        if (typeof data !== 'undefined'){
            const headingClass = headings[data.level + 1];
            const HeadingTag = `h${data.level + 1}`;
            return(
                <HeadingTag className={`${headingClass}`}
                            dangerouslySetInnerHTML={{__html: data.text}}
                />
            );
        }
        return null;
    }

}

export default Heading;