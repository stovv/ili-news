import React from 'react';
import { withTheme } from "styled-components";
import { BallPulseSync } from 'react-pure-loaders';
import { Flex, Box } from 'rebass';
import {Default} from "../Containers.react";

const Loader = ({theme})=>(
    <Default>
        <Flex justifyContent="center" margin="80px 0">
            <BallPulseSync color={theme.colors.primary} loading/>
        </Flex>
    </Default>
);

export default withTheme(Loader);