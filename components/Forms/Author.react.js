import React from 'react';
import {Flex, Box} from 'rebass';
import PropTypes from 'prop-types';
import styled, {withTheme} from 'styled-components';
import {Emoji} from "emoji-mart";
import { connect } from 'react-redux';

import { Heading } from '../Typography';



class AuthorList extends React.Component {

    shouldComponentUpdate(){
        return false
    }

    render(){
        const {authors, theme, width} = this.props;

        const borderStyle = {
            borderLeft: `2px solid ${theme.colors.primary}`
        };

        if (width > 462){
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
        }else{
            return (
                <Flex height="fit-content" mb={"16px"}>
                    {
                        authors.map((item, index)=>
                            <React.Fragment key={index}>
                                <Box ml={index === 0 ? "0" : "10px"} my="auto">
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
}

AuthorList.propsTypes ={
    authors: PropTypes.array.isRequired,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width,
    }
}


export default connect(mapStateToProps)(withTheme(AuthorList));