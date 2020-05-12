import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Flex, Box} from "rebass";
import { connect } from 'react-redux';

import { lightTheme } from "../../../theme/theme.react";
import {CardText, TagLabel} from "../../Typography";


const QuoteBox = styled.div`
  margin: ${props => props.screenWidth > 1023 ? '40px 0' : '20px 0'};
  padding-left: ${props => props.screenWidth > 1023 ? '37px' : '15px'};
  padding-top: 10px;
  padding-bottom: 10px;
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
        const { input, data, width } = this.props;

        if (input){
            return(
                <></>
            );
        }

        if (data.type === "2"){
            return (
                <QuoteBox screenWidth={width}>
                    {
                        width > 1023
                            ?
                            <TagLabel type="large" weight="500" margin={0}>
                                <em><div dangerouslySetInnerHTML={data.text}/></em>
                            </TagLabel>
                            :
                            <CardText type="normal" weight="500"  margin={0}>
                                <em><div dangerouslySetInnerHTML={data.text}/></em>
                            </CardText>
                    }
                </QuoteBox>
            );
        }else if (data.type === "1"){
            return (
                    width > 1023
                    ?
                    <Box mt="35px" mb="40px">
                        <CardText type="xlarge" textAlign="center" margin="0 0 23px 0">« »</CardText>
                        <TagLabel type="large" weight="500" textAlign="center" margin="0">
                            <em><div dangerouslySetInnerHTML={data.text}/></em>
                        </TagLabel>
                    </Box>
                    :
                    <Box mt="50px" mb="50px">
                        <CardText type="large" textAlign="center" margin="0 0 5px 0">« »</CardText>
                        <CardText type="normal" weight="500" textAlign="center" margin="0">
                            <em><div dangerouslySetInnerHTML={data.text}/></em>
                        </CardText>
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

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(Quote);