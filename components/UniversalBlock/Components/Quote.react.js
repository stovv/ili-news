import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ComposeFont } from "../../Typography";


const QuoteT1 = styled.p`   
    ${props => ComposeFont(props.theme.post.typo.quote.t1, {
    fontFamily: props.theme.fontFamily,
    lineHeight: 1.33,
    fontWeight: 500,
    fontSize: {
        s: "18px",
        m: "19px",
        l: "20px",
        tablet: "22px",
        laptop: "24px",
    },
    margin: {
        s: 0,
        m: 0,
        l: 0,
        tablet: 0,
        laptop: 0
    },
    color: props.theme.text.primary
   })};
`;

const QuoteT2 = styled.p`
    ${props => ComposeFont(props.theme.post.typo.quote.t2, {
        fontFamily: props.theme.fontFamily,
        lineHeight: 1.33,
        fontWeight: 500,
        fontSize: {
            s: "18px",
            m: "19px",
            l: "20px",
            tablet: "22px",
            laptop: "24px",
        },
        margin: {
            s: 0,
            m: 0,
            l: 0,
            tablet: 0,
            laptop: 0
        },
        color: props.theme.text.primary
    })};
    text-align: center;
`;

const QuoteBox = styled.div`
  margin: 20px 0;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-left: solid 5px ${props => props.theme.colors.primary};
  
  @media screen and (min-width: 1024px){
      margin: 40px 0;
      padding-left: 37px;
  }
`;

const QuoteBox2 = styled.div`
   margin: 50px 0;
   @media screen and (min-width: 1024px){
       margin-top: 35px;
       margin-bottom: 40px;   
   } 
`;


const QuoteHeading = styled.p`
  font-family: ${props => props.theme.fontFamily};
  font-size: 28px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  text-align: center;
  margin: 0 0 5px 0;
  
  @media screen and (min-width: 1024px ){
      margin: 0 0 23px 0;
      font-size: 36px;
  }
  
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
                <QuoteBox>
                    <QuoteT1>
                        <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                    </QuoteT1>
                </QuoteBox>
            );
        }else if (data.type === "2"){
            return (
                <QuoteBox2>
                    <QuoteHeading>« »</QuoteHeading>
                    <QuoteT2>
                        <em><div dangerouslySetInnerHTML={{__html: data.text.replace(/\n/g, '<br/>')}}/></em>
                    </QuoteT2>
                </QuoteBox2>
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