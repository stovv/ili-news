import React from "react";
import { Flex, Box } from 'rebass';
import { connect } from 'react-redux';
import {withTheme} from "styled-components";

import { Public } from '../../api';
import { Logo } from '../../assets';


class LoginLayout extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cover: null
        }
    }

    componentDidMount() {
        Public.randomUnsplashImage()
            .then(response => {
                this.setState({cover: response.request.responseURL})
            })
            .catch(reason => console.log(reason));
    }

    render(){
        const { theme, width, children } = this.props;
        const { cover } = this.state;

        return (
            <Flex height="100vh" width="100vw" bg={theme.colors.backgroundInverted}>
                {
                    width > 768 &&
                    <Box width={3/5} sx={{
                        height: "100vh",
                        background: `url(${cover}) center`,
                        backgroundSize: 'cover'
                    }}/>
                }
                <Box width={width > 768 ? 2/5 : '100%'} height="100%">
                    <Flex flexDirection="column">
                        <Box ml="auto" mr="36px" mt="36px">
                            {/*<Icons.HelpIcon/>*/}
                        </Box>
                        <Box width={["150px"]} height={["150px"]} mx="auto">
                            <a href="/">
                                <Logo width="100%" primary={theme.colors.primary}
                                      background={theme.colors.secondary}/>
                            </a>
                        </Box>
                        <Box mt="auto" mx="10%">
                            {children}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        );
    }
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(withTheme(LoginLayout));