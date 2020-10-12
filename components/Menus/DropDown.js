import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { Action } from '../Layouts';
import Types from './ActionMenuTypes';
import styles from './styles/dropdown.module.css'

class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.outerRef = React.createRef(null);
        this.state = {
            opened: false,
            //hide: true
        }
        this.close = this.close.bind(this);
        this.clickOutside = this.clickOutside.bind(this);
    }

    waitRefAvailable(type){
        setTimeout(()=>{
            if ( this.outerRef.current === null ){
                this.waitRefAvailable(type);
                return;
            }

            if ( type === 'remove' ) document.removeEventListener('click', this.clickOutside);
            else if ( type === 'add' ) document.addEventListener('click', this.clickOutside);
        }, 10);
    }


    close(event){
        this.waitRefAvailable('remove');
        this.setState({ opened: false });
        //setTimeout(()=> this.setState({hide: true}), 410);
    }

    clickOutside(event){
        if ( this.outerRef.current && !this.outerRef.current.contains(event.target) && this.state.opened ) {
            this.close();
        }
    }

    componentWillUnmount() {
        if (typeof window === "undefined") return;
        this.waitRefAvailable('remove');
    }

    render(){
        const { type, button, dropMargin, dispatch } = this.props;
        const { opened } = this.state;
        const Button = button;

        return (
            <>
                <Button onClick={()=>{
                    this.waitRefAvailable("add");
                    this.setState({opened: true, hide: false})
                }}/>

                <div className={`${styles.dropDown}${opened ? ` ${styles.opened}` : ''}`} ref={this.outerRef}
                     style={{
                       margin: dropMargin
                     }}>
                    {
                        Types(dispatch)[type].map((menuItem, index) => (
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
                </div>
            </>
        );
    }
}


DropDownMenu.propTypes = {
    type: PropTypes.oneOf([
        "user"
    ]).isRequired,
    button: PropTypes.node.isRequired,
    dropMargin: PropTypes.string
}

export default connect()(DropDownMenu);