import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Picker, Emoji} from 'emoji-mart'
import {Flex, Box} from "rebass";


import { lightTheme } from "../../../theme/theme.react";
import EmojiList from './Emojis.react';
import {TitleArea} from "../../Forms/Inputs.react";
import {Form} from "../../index";
import Heading from "../../Typography/Heading.react";


const Wrapper = styled.div`
    margin: 10px 0;
`;

const CalloutBox = styled.div`
  width: 98%;
  height: fit-content;
  border-radius: 8px;
  margin: 0 0 20px 0;
  background-color: ${props=> props.theme.colors.backgroundInvert};
`;

class Callout extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            reactionShown: false,
            emoji: props.data.emoji || { id: 'ok_hand', skin: 3 },
            text: props.data ? props.data.text: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick(event){
        if (this.PickerRef && !this.PickerRef.contains(event.target)){
            this.setState({
                reactionShown: false
            })
        }
    }

    render(){
        const { input, data  } = this.props;

        if (input){
            return(
                <Wrapper>
                    <CalloutBox ref={el=>this.PickerRef=el}>
                        <Flex height="fit-content" py="10px" px="24px">
                            <Box my="auto" width={1/10} height="100%" style={{
                                cursor: 'pointer'
                            }}>
                                <Box id="emoji"  m="0 5px">
                                    <Emoji emoji={this.state.emoji} size={45}
                                           onClick={() => this.setState({reactionShown: true})} />
                                </Box>
                            </Box>
                            <Box my="auto" width={9/10}>
                                <TitleArea onChange={event => this.setState({text: event.target.value})}
                                           defaultValue={this.state.text}
                                           withoutLabel inverted fontSizeIndex={3}
                                />
                            </Box>
                        </Flex>
                        <div  className="reactions"
                             style={{display: this.state.reactionShown ? 'block' : 'none'}}>
                            <Picker
                                style={{
                                    width: "fit-content"
                                }}
                                showPreview={false}
                                custom={EmojiList}
                                include={['custom']}
                                onSelect={(emoji)=>this.setState({reactionShown: false, emoji})}
                                color={lightTheme.colors.primary}
                                showSkinTones={false}
                            />
                        </div>
                    </CalloutBox>
                </Wrapper>
            );
        }

        return(
            <Wrapper>
                <CalloutBox ref={el=>this.PickerRef=el}>
                    <Flex height="fit-content" py="18px" px="24px">
                        <Box my="auto" width={1/10} height="100%">
                            <Box id="emoji"  sx={{margin: "0 5px"}}>
                                <Emoji emoji={{ id: data.emoji, skin: 3 }} size={45} />
                            </Box>
                        </Box>
                        <Box my="auto" width={9/10}>
                            <Heading margin="0" level={6} color={lightTheme.text.onPrimary} breakWord>{data.text}</Heading>
                        </Box>
                    </Flex>
                </CalloutBox>
            </Wrapper>
        );
    }
}


Callout.propTypes = {
    input: PropTypes.bool,
    data: PropTypes.object,
}

export default Callout;