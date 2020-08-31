import React from 'react';
import PropTypes from 'prop-types';
import { Emoji } from "emoji-mart";
import { Flex, Box } from 'rebass';

import { JournalHeadingContainer } from '../Containers.react';
import { JournalTitle, JournalSubTitle } from './components/Typo';
import {TagBar} from "../../compilations";


class JournalHeader extends React.Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.title !== this.props.title;
    }

    render(){
        const { title, subTitle, emoji, tags } = this.props;

        return (
            <>
            <JournalHeadingContainer >
                <JournalTitle>{title}</JournalTitle>
                {
                    emoji &&
                    <Box my="auto">
                        <Emoji emoji={{id: emoji}} size={48}/>
                    </Box>
                }
            </JournalHeadingContainer>
            {
                subTitle &&
                <Flex justifyContent="center">
                    <JournalSubTitle>{subTitle}</JournalSubTitle>
                </Flex>
            }
            {
                tags && <TagBar tags={tags}/>
            }
            </>
        );
    }
}

JournalHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    emoji: PropTypes.string,
    tags: PropTypes.string
};

export default JournalHeader;