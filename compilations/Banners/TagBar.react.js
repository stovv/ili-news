import React from 'react';
import PropTypes from 'prop-types';
import Ticker from 'react-ticker';
import styled, { withTheme } from "styled-components";
import {TagLabel} from "../../components/Typography";
import {connect} from "react-redux";


const TagWrap = styled.div`
    border-radius: ${props => props.mini ? '10px' : '40px'};
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);
    background-color: ${props => props.theme.colors.primary};
    margin: 10px ${props=> props.theme.spacing.m} 10px 0;
    padding:  ${props => props.theme.spacing.xs} 32px;
    transition: all 0.4s ease-in-out;
    &:hover{
        background-color: ${props => props.theme.colors.hover};
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.80);
        transform: scale(1.005);
    }
`;

const Tag = ({children, theme, mini}) =>(
    <TagWrap min={mini}>
        {
            mini
                ? <TagLabel type="normal" color={theme.text.onPrimary} margin={0}>{children}</TagLabel>
                : <TagLabel type="large" color={theme.text.onPrimary} margin={0}>{children}</TagLabel>
        }
    </TagWrap>
);


class TagBar extends React.Component {

    constructor(props) {//width
        super(props);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
    }

    state = {
        tagIndex: -1,
        hover: false,
        speed: 10
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.hover !== this.state.hover || nextProps.speed !== this.state.speed || nextProps.tagIndex !== this.state.tagIndex;
    }

    stop(){
        let timeout = 200;
        let timerId = setTimeout(function speedDown() {
            if (this.state === undefined){
                timerId = setTimeout(speedDown.bind(this), timeout); // (*)
            }
            else if (this.state.speed > 0 && this.state.hover){
                this.setState({speed: this.state.speed - 1})
                if (timeout > 20){
                    timeout -= 5;
                }
                timerId = setTimeout(speedDown.bind(this), timeout); // (*)
            }
        }.bind(this), timeout);
    }

    start(){
        let timeout = 100;
        let timerId = setTimeout(function speedUp() {
            if (this.state === undefined){
                timerId = setTimeout(speedUp.bind(this), timeout); // (*)
            }
            else if (this.state.speed < 10 && ! this.state.hover){
                this.setState({speed: this.state.speed + 1})
                if (timeout > 20){
                    timeout -= 10;
                }
                timerId = setTimeout(speedUp.bind(this), timeout); // (*)
            }
        }.bind(this), timeout);
    }

    render(){
        const { theme, tags, width } = this.props;
        return(
            <div style={{margin: "64px 0 52px 0"}}
                onMouseOver={()=>{
                this.setState({hover: true});
                this.stop();
            }} onMouseLeave={()=>{
                this.setState({hover: false});
                this.start();
            }}>
                <Ticker move={this.state.speed > 0} speed={this.state.speed}>
                    {({ index }) => {
                        this.state.tagIndex += 1;
                        if (tags[this.state.tagIndex] === undefined){
                            this.state.tagIndex = 0;
                        }
                        const Link = tags[this.state.tagIndex].link;
                        const props = tags[this.state.tagIndex].linkProps;
                        return(
                            <Link {...props}>
                                <Tag theme={theme} mini={width <= 1023}>{tags[this.state.tagIndex].text}</Tag>
                            </Link>
                        )
                    }}
                </Ticker>
            </div>
        );
    }
}

TagBar.propTypes = {
    tags: PropTypes.object.isRequired
}



function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(withTheme(TagBar));