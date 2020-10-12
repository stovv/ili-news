import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { Action } from '../Layouts';
import Types from './ActionMenuTypes';
import styles from './styles/context.module.css';

const Context = ({children, positionY, positionX, actualWidth}) => (
    <div className={`${styles.menu} ${styles.context}`} style={{
        top: `${positionY}px`,
        right: window.innerWidth < positionX + actualWidth ? "5px" : "unset",
        left: window.innerWidth < positionX + actualWidth ? `${positionX + 5}px` : "unset",
    }}>
        {children}
    </div>
);


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
        const { type, dispatch } = this.props;
        const { opened, hide, clickX, clickY, contextWidth } = this.state;

        return (
            <Context opened={opened} positionY={clickY} positionX={clickX} hide={hide}
                     actualWidth={contextWidth} ref={this.outerRef}>
                {
                    Types(dispatch)[type].map((menuItem, index) => (
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

export default connect()(ContextMenu);