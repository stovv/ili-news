import React from 'react';
import PropTypes from 'prop-types';
import { Authors } from './Typo';
import { Flex, Box } from 'reflexbox';

import styles from './styles/author.module.css';

class AuthorList extends React.Component {

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return false;
    // }

    render(){
        const { authors } = this.props;
        return (
            <div className={styles.authorWrapper}>
                {
                    authors.map((item, index)=>
                        <React.Fragment key={index}>
                            <div style={{margin: "auto 0 auto 40px"}}>
                                <div style={{display: "inline-flex"}}>
                                    {/*<Emoji emoji={{ id: 'lower_left_fountain_pen', skin: 3 }} size={24} />*/}
                                    <Authors>{item.name} {item.secondName}</Authors>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

AuthorList.propsTypes ={
    authors: PropTypes.array.isRequired,
}

export default AuthorList;