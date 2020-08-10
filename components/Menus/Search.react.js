import React from "react";
import { Flex, Box } from 'rebass';
import { connect } from "react-redux";
import { withTheme } from 'styled-components';

import { Icons } from "../../assets";
import { UniversalLink } from "../Links.react";
import { clickOnSearch } from "../../store/commonActions.react";
import {Click} from "../Animations";


class Search extends React.Component{

    componentWillUnmount() {
        if (typeof window !== "undefined"){
            document.documentElement.removeAttribute("style");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.activated){
            document.documentElement.removeAttribute("style");
        }else{
            document.documentElement.style = "width: calc(100% - 17px); position: fixed; top: 0px; overflow: hidden;";
        }
    }

    render(){
        const { activated, theme, dispatch, width } = this.props;

        console.log(activated)

        if (typeof window === "undefined"){
            return (<></>);
        }

        const {AnimateOnChange} = require('react-animation');

        return (
            <div style={{
                position: 'absolute',
                top: "72px", left: 0, zIndex: 9999, overflow: 'hidden'
            }}>
                <AnimateOnChange durationOut={500} animationIn="fadeInUp" animationOut="fadeOut">
                    {
                        activated &&
                        <Flex bg={theme.colors.backgroundInverted} width="100vw" sx={{
                            opacity: 0.96,
                            height: "calc(100vh - 72px)",
                            position: "relative"
                        }}>
                            <Box sx={{position: "absolute", top: "52px", right: "92px"}}>
                                <Click.SimpleClick style={{float: "right"}} onClick={()=>dispatch(clickOnSearch())}>
                                    <Icons.CloseIcon />
                                </Click.SimpleClick>
                            </Box>
                        </Flex>
                    }
                </AnimateOnChange>
            </div>
        );
    }
}


function mapStateToProps(state){
    return{
        width: state.common.pageSize.width,
        activated: state.common.activeSearch
    }
}

export default connect(mapStateToProps)(withTheme(Search));