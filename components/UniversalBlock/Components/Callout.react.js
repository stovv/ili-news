import React from 'react';
// import { Emoji} from 'emoji-mart'
import PropTypes from 'prop-types';

import { lightTheme } from "../../../theme/theme.react";
import Heading from "../../Typography/Heading.react";
import styles from './styles/callout.module.css';
import { Flex, Box } from 'reflexbox';

class Callout extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            emoji: props.data.emoji || { id: 'ok_hand', skin: 3 },
            text: props.data ? props.data.text: null
        }
    }
    render(){
        const { data } = this.props;

        return(
            <div className={styles.wrapper}>
                <div className={styles.calloutBox}>
                    <Flex height="fit-content" py="18px" px="24px">
                        <Box my="auto" width={1/10} height="100%">
                            <Box id="emoji"  sx={{margin: "0 5px"}}>
                                {/*<Emoji emoji={{ id: data.emoji, skin: 3 }} size={45} />*/}
                            </Box>
                        </Box>
                        <Box my="auto" width={9/10}>
                            <Heading margin="0" level={6} color={lightTheme.text.backgroundInverted} breakWord>{data.text}</Heading>
                        </Box>
                    </Flex>
                </div>
            </div>
        );
    }
}


Callout.propTypes = {
    data: PropTypes.object,
}

export default Callout;