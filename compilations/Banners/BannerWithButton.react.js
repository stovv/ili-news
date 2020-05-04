import React from 'react';
import PropTypes from 'prop-types';
import styled, {withTheme} from 'styled-components'
import {Flex, Box} from 'rebass';

import { Images } from '../../components';
import {CardText, TagLabel} from "../../components/Typography";

const Blackout = styled.div`
    width: 100%;
    height: 100%;
    ;
`

class BannerWithButton extends React.Component {

    render(){
        const {cover, buttonLink, buttonText, children, theme} = this.props;
        return(
            <Images.Lazy cover={cover}>
                <Box height="100%" sx={{
                    background: `linear-gradient(to right, rgba(229, 103, 82, 0), ${theme.colors.primary})`
                }}>
                    <Box sx={{
                        position: "absolute",
                        right: "31px",
                        top: "45px"
                    }}>
                        <CardText type="xlarge" margin="0" color={theme.text.onPrimary}
                                  maxWidth="361px" maxHeight="148px" textAlign="right">{children}</CardText>
                    </Box>
                </Box>
            </Images.Lazy>
        );
    }
}

BannerWithButton.propTypes = {
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    cover: PropTypes.object,
}

export default withTheme(BannerWithButton);