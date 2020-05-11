import React from 'react';
import { Flex, Box } from 'rebass';
import { withTheme } from "styled-components";
import { CardText } from "../Typography";


class LeftMenu extends React.Component {
    render(){
        const { theme } = this.props;
        return(
            <Flex flexDirecton="column" bg={theme.colors.backgroundSecondary} width="100%" height="100%">
                <Box mt={theme.spacing.block} width="100%">
                    <CardText type="small" margin="0 auto" color={theme.text.secondary}>Черновики</CardText>
                </Box>
            </Flex>
        );
    }
}

export default withTheme(LeftMenu);