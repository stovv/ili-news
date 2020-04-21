import React from 'react';
import styled, {keyframes} from 'styled-components';

const blink = keyframes`
    0% {
      opacity: .2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: .2;
    }
`;


const Dot = styled.span`
    animation-name: ${blink};
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    
    :nth-child(2) {
        animation-delay: .2s;
    }
    :nth-child(3) {
        animation-delay: .4s;
    }
`;

const StatusText = styled.h5`
    color: ${props=> props.theme.text.quarternary} !important;
    padding: 10px 10px 0 0;
`

class DotLoader extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text ? props.text : "Загрузка";
    }
    render() { 
        return ( 
            <>
                {this.props.trigered && <StatusText>this.text<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot></StatusText>}
            </>
        );
    }
}
 
export default DotLoader;