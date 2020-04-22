import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import {Containers} from "./index";

const Common = styled.div`
    max-width: 1440px;
    margin: ${props=> props.mt ? props.mt : "0"} auto ${props=> props.mb ? props.mb : "0"} auto;
`

const Def = styled.div`
  margin: 0 80px;
`;

export const Default = ({children, mt, mb})=>
<Common mt={mt} mb={mb}>
    <Def>
        {children}
    </Def>
</Common>


Default.PropTypes = {
    mt: PropTypes.string,
    mb: PropTypes.string
}


export const AppContainer = styled.div`
    background-color: ${props=> props.theme.colors.backgroundPrimary};
`;