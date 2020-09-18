import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styled, { withTheme } from 'styled-components';

import { Action } from '../Layouts';
import Types from './ActionMenuTypes';

const DropDown = styled(Action.Menu)`
    z-index: 99;
    position: fixed;
    ${({opened}) => opened ? `height: max-content;` : `height: 0;`};
    transition: height 120ms ease-in-out 0s;
`;


class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.outerRef = React.createRef(null);
        this.state = {
            opened: false,
        }
        this.close = this.close.bind(this);
    }

    waitRefAvailable(type){
        setTimeout(()=>{
            if ( this.outerRef.current === null ){
                this.waitRefAvailable(type);
            }else{
                if (type === 'add'){
                    this.outerRef.current.addEventListener('click', this.close);
                }else if ('remove'){
                    this.outerRef.current.removeEventListener('click', this.close);
                }
            }
        }, 10);
    }

    close(event){
        this.setState({
            opened: false
        });
    }

    // componentDidMount() {
    //     if (typeof window === "undefined") return;
    //     this.waitRefAvailable('add');
    // }
    //
    // componentWillUnmount() {
    //     if (typeof window === "undefined") return;
    //     this.waitRefAvailable('remove');
    // }

    render(){
        const { type, theme, button, dispatch } = this.props;
        const { opened } = this.state;

        const Button = button;
        console.log(opened);
        return (
            <>
                <Button onClick={()=>this.setState({opened: true})}/>
                <DropDown opened={opened} ref={this.outerRef}>
                    {
                        Types(theme, dispatch)[type].map((menuItem, index) => (
                            <React.Fragment key={index}>
                                <Action.Item opened={opened} onClick={()=>{
                                    if (menuItem.onClick){
                                        menuItem.onClick();
                                    }
                                    this.close();
                                }}>{menuItem.text}</Action.Item>
                            </React.Fragment>
                        ))
                    }
                </DropDown>
            </>
        );
    }
}


DropDownMenu.propTypes = {
    type: PropTypes.oneOf([
        "user"
    ]).isRequired,
    button: PropTypes.node.isRequired
}

export default connect()(withTheme(DropDownMenu));