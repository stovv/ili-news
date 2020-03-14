import React, { Component } from 'react';
import styled from 'styled-components';

// TODO: Use normal style!

class PleaseAuth extends Component {
    render() {
        const Center = styled.div`
        margin: 40vh 44vw;
       `

        return (
            <Center>
                <h1> Please auth</h1>
                <a href="/login">Login</a>
            </Center>
        )
    }
}


export default PleaseAuth;