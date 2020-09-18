import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styled, { withTheme } from 'styled-components';

import { Action } from '../Layouts';
import Types from './ActionMenuTypes';

const Context = styled(Action.Menu)`
    z-index: 99;
    position: absolute;
    top: ${props=>props.positionY}px;
    ${({positionX, actualWidth}) => window.innerWidth < positionX+actualWidth
        ? `right: 5px;`
        : `left: ${positionX + 5}px;`
    };
    ${({hide, opened}) => (hide && !opened) && `display: none;`};
    transition: opacity 120ms ease-in-out 0s, height 120ms ease-in-out 0s;
    opacity: ${props => props.opened ? 1 : 0};
`;


class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.outerRef = React.createRef(null);
        this.state = {
            clickX: 0,
            clickY: 0,
            opened: false,
            hide: true,
            contextWidth: 0
        }
        this.waitRefAvailable = this.waitRefAvailable.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    waitRefAvailable(){
        setTimeout(()=>{
            if ( this.outerRef.current === null ){
                this.waitRefAvailable();
            }else{
                this.setState({
                    contextWidth: this.outerRef.current.clientWidth
                })
            }
        }, 10);
    }

    close(event){
        this.setState({ opened: false });
        setTimeout(()=>{
            if (!this.state.opened){
                this.setState({hide: true});
            }
        }, 410);
    }

    open(event){
        event.preventDefault();
        const { opened, contextWidth } = this.state;
        if ( opened ){
            this.close();
            setTimeout(()=>{
                this.setState({
                    opened: true,
                    hide: false,
                    clickX: event.clientX,
                    clickY: event.clientY
                });
            },400);
        }else{
            this.setState({hide: false});
            setTimeout(()=>this.setState({
                    opened: true,
                    clickX: event.clientX,
                    clickY: event.clientY,
                }), 200);
            if (contextWidth === 0){
                this.waitRefAvailable();
            }
        }
    }

    componentDidMount() {
        if (typeof window === "undefined") return;
        window.addEventListener('contextmenu', this.open);
        document.addEventListener('click', this.close);
    }

    componentWillUnmount() {
        if (typeof window === "undefined") return;
        window.removeEventListener('contextmenu', this.open);
        document.removeEventListener('click', this.close);
    }

    render(){
        const { type, theme, dispatch } = this.props;
        const { opened, hide, clickX, clickY, contextWidth } = this.state;

        return (
            <Context opened={opened} positionY={clickY} positionX={clickX} hide={hide}
                     actualWidth={contextWidth} ref={this.outerRef}>
                {
                    Types(theme, dispatch)[type].map((menuItem, index) => (
                        <React.Fragment key={index}>
                            <Action.Item opened={true} onClick={menuItem.onClick}>{menuItem.text}</Action.Item>
                        </React.Fragment>
                    ))
                }
            </Context>
        );
    }
}


ContextMenu.propTypes = {
    type: PropTypes.oneOf([
        "user"
    ]).isRequired
}

export default connect()(withTheme(ContextMenu));