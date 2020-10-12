import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles/quote.module.css';



class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            text: props.data ? props.data.text: null
        }
    }

    render(){
        const { data, width } = this.props;

        if (data.type === "1"){
            return (
                <div className={styles.quoteBox}>
                    <div className={styles.quoteTypeOne}>
                        <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                    </div>
                </div>
            );
        }else if (data.type === "2"){
            return (
                <div className={styles.quoteBoxTwo}>
                    <p className={styles.quoteBoxHeading}>« »</p>
                    <div className={styles.quoteTypeTwo}>
                        <em dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/>
                    </div>
                </div>
            );
        }else if (data.type === "3"){
            return null
        }

        return(
            <div className={styles.quoteBox}>

            </div>
        );
    }
}


Quote.propTypes = {
    input: PropTypes.bool,
    data: PropTypes.object,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(Quote);