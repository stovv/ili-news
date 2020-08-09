import React from 'react';
import { Box } from "rebass";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { CardText, TagLabel } from "../../Typography";


const QuoteBox = styled.div`
  margin: ${props => (props.screenWidth && props.screenWidth > 1023) ? '40px 0' : '20px 0'};
  padding-left: ${props => (props.screenWidth && props.screenWidth > 1023) ? '37px' : '15px'};
  padding-top: 10px;
  padding-bottom: 10px;
  border-left: solid 5px ${props => props.theme.colors.primary};
`;


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
                <QuoteBox screenWidth={width}>
                    {
                        width > 1023
                            ?
                            <TagLabel type="large" weight="500" margin={0}>
                                <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                            </TagLabel>
                            :
                            <CardText type="normal" weight="500"  margin={0}>
                                <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                            </CardText>
                    }
                </QuoteBox>
            );
        }else if (data.type === "2"){
            return (
                    width > 1023
                    ?
                    <Box mt="35px" mb="40px">
                        <CardText type="xxlarge" textAlign="center" margin="0 0 23px 0">« »</CardText>
                        <TagLabel type="large" weight="500" textAlign="center" margin="0">
                            <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                        </TagLabel>
                    </Box>
                    :
                    <Box mt="50px" mb="50px">
                        <CardText type="large" textAlign="center" margin="0 0 5px 0">« »</CardText>
                        <CardText type="normal" weight="500" textAlign="center" margin="0">
                            <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                        </CardText>
                    </Box>
            );
        }else if (data.type === "3"){
            return null
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