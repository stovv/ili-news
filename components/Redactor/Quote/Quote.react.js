import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Flex, Box} from "rebass";

import { lightTheme } from "../../../theme/theme.react";
import {CardText, TagLabel} from "../../Typography";


const QuoteBox = styled.div`
  margin: 40px 0;
  padding-left: 37px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-left: solid 5px ${props => props.theme.colors.primary};
`;


class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            reactionShown: false,
            emoji: props.data.emoji || { id: 'ok_hand', skin: 3 },
            text: props.data ? props.data.text: null
        }
    }

    /*
    * data:
    text: "Раз речь зашла о деньгах, давайте посмотрим, какие фильмы, ожидающие выхода на экраны в будущем году, могут собрать приличную кассу. Журнал ИЛИ составил список наиболее интересных «супергеройских» фильмов, на которые стоит сходить в обязательном порядке."
    type: "1"
    __proto__: Object
    type: "quote"
    * */

    render(){
        const { input, data  } = this.props;

        if (input){
            return(
                <></>
            );
        }

        if (data.type === "1"){
            return (
                <QuoteBox>
                    <TagLabel type="large" weight="500" >
                        <em>{data.text}</em>
                    </TagLabel>
                </QuoteBox>
            );
        }else if (data.type === "2"){
            return (
                <Box mt="35px" mb="40px">
                    <CardText type="xlarge" textAlign="center" margin="0 0 23px 0">« »</CardText>
                    <TagLabel type="large" weight="500" textAlign="center" margin="0">
                        <em>{data.text}</em>
                    </TagLabel>
                </Box>
            );
        }

        return(
            <QuoteBox>

            </QuoteBox>
        );
    }
}


Quote.propTypes = {
    input: PropTypes.bool,
    data: PropTypes.object,
}

export default Quote;