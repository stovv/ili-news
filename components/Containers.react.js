import styled from 'styled-components';
import React from 'react';

const Common = styled.div`
    max-width: 1440px;
    margin: 0 auto;
`

const Def = styled.div`
  margin: 0 80px;
`;

export const Default = ({children})=>
<Common>
    <Def>
        {children}
    </Def>
</Common>

export const AppContainer = styled.div`
    background-color: ${props=> props.theme.colors.backgroundPrimary};
`;