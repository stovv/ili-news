import React from 'react';
import { Flex, Box } from 'rebass';
import { withTheme } from "styled-components";
import { CardText } from "../Typography";
import { Icons } from "../../assets";



const MenuItem = ({ children, theme, selected }) =>(
    <Flex bg={selected && "#fff" } py="20px">
        <Flex maxWidth="200px" mx="auto">
            <Icons.DraftIcon style={{margin: "auto 0"}}/>
            <CardText type="small" margin="auto auto auto 30px" color={theme.text.secondary}>{children}</CardText>
        </Flex>
    </Flex>
);


class LeftMenu extends React.Component {
    render(){
        const { theme } = this.props;
        return(
            <Flex flexDirecton="column" bg={theme.colors.backgroundSecondary} width="100%" height="100%" sx={{display: 'hidden'}}>
                <Box mt="50px" width="100%">
                    <MenuItem theme={theme} selected>Черновики</MenuItem>
                </Box>
            </Flex>
        );
    }
}

export default withTheme(LeftMenu);