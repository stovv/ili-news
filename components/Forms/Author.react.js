import React from 'react';
import {Flex, Box} from 'rebass';
import PropTypes from 'prop-types';
import styled, {withTheme} from 'styled-components';
import {Emoji} from "emoji-mart";

import { Heading } from '../Typography';



class AuthorList extends React.Component {

    shouldComponentUpdate(){
        return false
    }

    render(){
        const {authors, theme} = this.props;

        const borderStyle = {
            borderLeft: `2px solid ${theme.colors.primary}`
        };

        return (
                <Flex height="fit-content" sx={borderStyle} ml={["40px"]}>
                    {
                        authors.map((item, index)=>
                            <React.Fragment key={index}>
                                <Box ml={["40px"]} my="auto">
                                    <Flex>
                                        <Emoji emoji={{ id: 'lower_left_fountain_pen', skin: 3 }} size={24} />
                                        <Heading margin="0 0 0 5px" color={theme.text.hover} level={4}>{item.name} {item.secondName}</Heading>
                                    </Flex>
                                </Box>
                            </React.Fragment>
                        )
                    }
                </Flex>
        );
    }
}

AuthorList.propsTypes ={
    authors: PropTypes.array.isRequired,
}

export default withTheme(AuthorList);