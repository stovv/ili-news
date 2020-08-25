import React from 'react';
import {Flex, Box} from 'rebass';
import PropTypes from 'prop-types';
import { Emoji } from "emoji-mart";
import styled from 'styled-components';

import { Authors } from './Typo';


const AuthorsBorder = styled.div`
  display: flex;
  height: fit-content;

  @media screen and (min-width: 600px){
    border-left: 2px solid ${props=>props.theme.colors.primary};
    margin-left: 40px;
    padding-left: 40px;
  }
  
  @media screen and (max-width: 600px){
    margin: 0 0 20px 0;
  }
`;


class AuthorList extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render(){
        const { authors } = this.props;
        return (
            <AuthorsBorder>
                {
                    authors.map((item, index)=>
                        <React.Fragment key={index}>
                            <Box mr={"40px"} my="auto">
                                <Flex>
                                    <Emoji emoji={{ id: 'lower_left_fountain_pen', skin: 3 }} size={24} />
                                    <Authors>{item.name} {item.secondName}</Authors>
                                </Flex>
                            </Box>
                        </React.Fragment>
                    )
                }
            </AuthorsBorder>
        );
    }
}

AuthorList.propsTypes ={
    authors: PropTypes.array.isRequired,
}

export default AuthorList;