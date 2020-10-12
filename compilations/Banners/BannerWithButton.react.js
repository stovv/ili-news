import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';

import {CardText, TagLabel} from "../../components/Typography";
import { Emoji } from '../../components';


class BannerWithButton extends React.Component {

    render(){
        const {cover, buttonLink, buttonText, children} = this.props;
        return(
            // <Images.Lazy cover={cover}>
            //     <Box height="100%" sx={{
            //         background: `linear-gradient(to right, rgba(229, 103, 82, 0), ${theme.colors.primary})`
            //     }}>
            //         <Box sx={{
            //             position: "absolute",
            //             right: "31px",
            //             top: "45px"
            //         }}>
            //             <CardText type="xlarge" margin="0" color={theme.text.onPrimary}
            //                       maxWidth="361px" maxHeight="148px" textAlign="right">{children}</CardText>
            //         </Box>
            //     </Box>
            // </Images.Lazy>

        <Flex height="100%" justifyContent="center" sx={{
            background: `linear-gradient(to right, rgba(229, 103, 82, 0), var(--primary))`
        }}>
            <Emoji size={36} emoji={"🤔"} />
            <CardText type="xlarge" margin="auto 0 auto 40px" color={"var(--text-onPrimary)"}
                      maxWidth="361px" maxHeight="148px" textAlign="center">Тут скоро что то будет</CardText>
        </Flex>
        );
    }
}

BannerWithButton.propTypes = {
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string,
    cover: PropTypes.object,
}

export default BannerWithButton;