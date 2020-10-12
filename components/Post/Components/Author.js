import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/author.module.css';
import { Authors } from './Typo';
import { Flex, Box } from 'reflexbox';


class AuthorList extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render(){
        const { authors } = this.props;
        return (
            <div className={styles.border}>
                {
                    authors.map((item, index)=>
                        <React.Fragment key={index}>
                            <Box mr={"40px"} my="auto">
                                <Flex>
                                    {/*<Emoji emoji={{ id: 'lower_left_fountain_pen', skin: 3 }} size={24} />*/}
                                    <Authors>{item.name} {item.secondName}</Authors>
                                </Flex>
                            </Box>
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