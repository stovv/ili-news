import React from "react";
import { Flex, Box } from 'rebass';
import { connect } from 'react-redux';
import { withTheme } from "styled-components";

import { Layouts, Typography, Form } from '../../components';
import {Auth} from "../../actions";
import {BallPulseSync} from "react-pure-loaders";


class RegisterPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: {}
        }
        this.submitRegister = this.submitRegister.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Auth.setRegisterBad());
    }

    submitRegister(e){
        e.preventDefault();
        let errors = {};
        if (e.target.name.value.length <= 3){
            errors.name = "имя не заполено";
        }
        if (e.target.secondName.value.length <= 3){
            errors.secondName = "фамилия не заполена";
        }
        if (e.target.email.value.length <= 6){
            errors.email = "email не заполен";
        }
        if (e.target.password.value.length <= 6){
            errors.password = "пароль не меньше 6 символов";
        }
        if (Object.keys(errors).length > 0){
            this.setState({
                errors
            });
            return;
        }

        this.setState({
            loading: true
        })
        const { dispatch } = this.props;

        dispatch(Auth.registerAction({
            name: e.target.name.value,
            secondName: e.target.secondName.value,
            email: e.target.email.value,
            password: e.target.password.value
        })).then(response => {
            this.setState({
                loading: false
            })
        });
    }

    render(){
        const { theme, inRegister, registered } = this.props;
        const { loading, errors } = this.state;

        return <Layouts.Login>
            <Typography.TagLabel type={'large'} color={theme.text.onPrimary} textAlign={'center'}>
                Присоединись первым<br/>
                к обновлённому журналу
            </Typography.TagLabel>
            {
                registered
                    ? <>
                        <Typography.TagLabel type={'large'} color={theme.text.onPrimary}
                                             textAlign={'center'} margin={"166px 0 20px 0"}>
                            Отлично! Проверьте почту 😊
                        </Typography.TagLabel>
                    </>
                    : <>
                        <Typography.TagLabel type={'normal'} color={theme.colors.primary}
                                             textAlign={'center'} margin={"166px 0 20px 0"}>
                            {
                                (inRegister && !registered) &&
                                "Такой пользователь существует"
                            }
                        </Typography.TagLabel>
                        <form onSubmit={this.submitRegister}>
                            <Flex justifyContent={'center'} >
                                <Form.Inputs.LoginInput placeholder={"имя"} width={"25%"}
                                                        margin={"0 10px 0 0"} name="name" error={errors.name}/>
                                <Form.Inputs.LoginInput placeholder={"фамилия"} width={"25%"}
                                                        name="secondName" error={errors.secondName}/>
                            </Flex>
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
                                                : "Присоедениться"
                                        }
                                    </Flex>
                                </Form.Buttons.LoginButton>
                            </Flex>
                        </form>
                    </>
            }
        </Layouts.Login>
    }
}

function mapStateToProps(state){
    return {
        inRegister: state.auth.inRegister,
        registered: state.auth.registered
    }
}

export default connect(mapStateToProps)(withTheme(RegisterPage));