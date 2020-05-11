import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {connect} from 'react-redux'
import { Flex, Box } from 'rebass';
import { Input } from '@rebass/forms';

import { Public } from '../api';
import {Form, Images, Typography} from '../components';
import {BallPulseSync, BallRotate} from 'react-pure-loaders';
import { Icons, Logo } from '../assets'
import {loginAction} from "../store/authActions.react";
import {withTheme} from "styled-components";
import Link from "next/link";


class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            cover: "",
            password: null,
            rememberMe: false,
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.isLoggedIn === true){
            Router.back();
        }
        Public.randomUnsplashImage()
            .then(response => {
                this.setState({cover: response.request.responseURL})
            })
            .catch(reason => console.log(reason));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isLoggedIn === true){
            Router.back();
        }
    }

    handleSubmit () {
        this.setState({loading: true})
        const {dispatch} = this.props;
        dispatch(loginAction(this.state))
            .then(response => console.log(response))
            .catch(response => this.setState({loading: false}));
    };

    render() {
        const { theme } = this.props;
        var card_style = {
            width: '30vw',
            height: '30vh',
            margin: '35vh 35vw'
        }
        return (
            <>
                <Head>
                    <title>Login | ИЛИ</title>
                </Head>
                <Box height="100vh" bg={theme.colors.backgroundInvert}>
                    <Flex height="100%" width="100%" maxHeight="900px" maxWidth="1440px" sx={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        position: "absolute",
                        boxShadow: "0px 0px 38px -7px rgba(0,0,0,0.75)"
                    }}>
                        <Box width={[3/5]} bg={theme.colors.backgroundInverted}>
                            <Images.Simple url={this.state.cover}/>
                        </Box>
                        <Box width={[2/5]} bg={theme.colors.backgroundInverted} height="100%">
                            <Flex flexDirection="column">
                                <Box ml="auto" mr="36px" mt="36px">
                                    <Icons.HelpIcon/>
                                </Box>
                                <Box width={["150px"]} height={["150px"]} mx="auto">
                                    <Link href="/">
                                        <a><Logo width="100%" primary={this.props.theme.colors.primary} background={this.props.theme.colors.secondary}/></a>
                                    </Link>
                                </Box>
                                <Box mx="auto">
                                    <Typography.TagLabel type="large" color={theme.text.onPrimary} textAlign="center">
                                        Присоединись первым<br/>
                                        к обновлённому журналу
                                    </Typography.TagLabel>
                                </Box>
                                <Box mx="104px" mt="160px">
                                    <Input
                                        sx={{outlineColor: theme.colors.primary, color: theme.text.onPrimary}}
                                        onChange={(e)=>this.setState({login: e.target.value})}
                                        type='email'
                                        placeholder='email'
                                    />
                                </Box>
                                <Box mx="104px" mt={theme.spacing.block}>
                                    <Input
                                        sx={{outlineColor: theme.colors.primary, color: theme.text.onPrimary}}
                                        onChange={(e)=>this.setState({password: e.target.value})}
                                        type='password'
                                        placeholder='пароль'
                                    />
                                </Box>
                                <Box width="364px" height="56px" mx="auto" mt="136px">
                                    <Form.Buttons.SimpleButton onClick={()=>this.handleSubmit()}>
                                        {
                                            this.state.loading
                                                ? <Flex justifyContent="center" margin="10px 0">
                                                    <BallRotate color={theme.colors.backgroundPrimary}  loading/>
                                                </Flex>
                                                : "Войти"
                                        }
                                    </Form.Buttons.SimpleButton>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </>
        )
    }
}


function mapStateToProps(state) {
   return {
       user: state.auth.user,
       isLoggedIn: state.auth.isLoggedIn
   };
}

export default connect(mapStateToProps)(withTheme(LoginPage));