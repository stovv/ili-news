import React from 'react';
import { Emoji} from 'emoji-mart'
import { Flex, Box } from "rebass";
import PropTypes from 'prop-types';
import styled from 'styled-components';


import { lightTheme } from "../../../theme/theme.react";
import Heading from "../../Typography/Heading.react";


const Wrapper = styled.div`
    margin: 10px 0;
`;

const CalloutBox = styled.div`
  width: 98%;
  height: fit-content;
  border-radius: 8px;
  margin: 0 0 20px 0;
  background-color: ${props=> props.theme.colors.backgroundSecondary};
`;

class Callout extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            emoji: props.data.emoji || { id: 'ok_hand', skin: 3 },
            text: props.data ? props.data.text: null
        }
    }
    render(){
        const { data  } = this.props;

        return(
            <Wrapper>
                <CalloutBox>
                    <Flex height="fit-content" py="18px" px="24px">
                        <Box my="auto" width={1/10} height="100%">
                            <Box id="emoji"  sx={{margin: "0 5px"}}>
                                <Emoji emoji={{ id: data.emoji, skin: 3 }} size={45} />
                            </Box>
                        </Box>
                        <Box my="auto" width={9/10}>
                            <Heading margin="0" level={6} color={lightTheme.text.backgroundInverted} breakWord>{data.text}</Heading>
                        </Box>
                    </Flex>
                </CalloutBox>
            </Wrapper>
        );
    }
}


Callout.propTypes = {
    data: PropTypes.object,
}

export default Callout;