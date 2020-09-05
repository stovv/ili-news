import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {connect} from 'react-redux'
import { Flex, Box } from 'rebass';
import { Input } from '@rebass/forms';

import { Public } from '../api';
import {Form, Images, Layouts, Typography} from '../components';
import {BallClipRotate, BallPulseSync} from 'react-pure-loaders';
import { Icons, Logo } from '../assets'
import {Auth, Common} from "../actions";
import {withTheme} from "styled-components";
import Link from "next/link";
import {Heading} from "../components/Typography";


class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            errors: {},
            rememberMe: false,
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit (e) {
        e.preventDefault();
        let errors = {};

        if (e.target.email.value.length <= 6){
            errors.email = "email не заполен";
        }
        if (e.target.password.value.length <= 6){
            errors.password = "пароль не заполнен";
        }
        if (Object.keys(errors).length > 0){
            this.setState({
                errors
            });
            return;
        }


        this.setState({loading: true})
        const { dispatch, theme } = this.props;

        dispatch(Auth.loginAction({
            login: e.target.email.value,
            password: e.target.password.value
        })).then(() =>{
            this.setState({loading: false});
            dispatch(Common.notify('Отлично! Теперь вы с нами 🙌', theme.colors.backgroundPrimary, theme.text.primary));
            const { isLoggedIn } = this.props;
            if (isLoggedIn){
                Router.push('/users/me');
            }else{
                this.setState({
                    errors: {
                        ...this.state.errors,
                        global: "не правильный логин или пароль, мб вы что-то из этого забыли?"
                    }
                });
            }
        });
    };

    render() {
        const { theme, isLoggedIn } = this.props;
        const { loading, errors } = this.state;
        return (
            <Layouts.Login>
                <Typography.TagLabel type={'large'} color={theme.text.onPrimary} textAlign={'center'}>
                    Присоединись первым<br/>
                    к обновлённому журналу
                </Typography.TagLabel>
                <Typography.TagLabel type={'normal'} color={theme.colors.primary}
                                     textAlign={'center'} margin={"166px 0 20px 0"}>
                    {
                        errors.global
                          ? errors.global
                          : <>
                                {
                                    errors.email && <>{errors.email}<br/></>
                                }
                                {
                                    errors.password && <>{errors.password}<br/></>
                                }
                            </>
                    }
                </Typography.TagLabel>
                <form onSubmit={this.handleSubmit}>
                    <Flex justifyContent={'center'} mt={"40px"}>
                        <Form.Inputs.LoginInput placeholder={"email"} name="email" error={errors.email}/>
                    </Flex>
                    <Flex justifyContent={'center'} mt={"40px"}>
                        <Form.Inputs.LoginInput type={"password"} placeholder={"пароль"}
                                                name="password" error={errors.password}/>
                    </Flex>
                    <Flex justifyContent={'center'} mt={"136px"} >
                        <Form.Buttons.LoginButton type={"submit"} stuck={loading}>
                            <Flex justifyContent="center" >
                                {
                                    loading
                                        ? <BallPulseSync color={theme.colors.onPrimary} loading/>
                                        : "Войти"
                                }
                            </Flex>
                        </Form.Buttons.LoginButton>
                    </Flex>
                </form>
            </Layouts.Login>
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