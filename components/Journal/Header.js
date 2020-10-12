import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';

import Emoji from "../Emoji";
import {TagBar} from "../../compilations";
import { JournalHeadingContainer } from '../Containers';
import typoStyles from './styles/typo.module.css';


class JournalHeader extends React.Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.title !== this.props.title;
    }

    render(){
        const { title, subTitle, emoji, tags } = this.props;

        return (
            <>
            <JournalHeadingContainer >
                <h1 className={typoStyles.journalTitle}>{title}</h1>
                {
                    emoji && <Emoji emoji={emoji} size={48} />
                }
            </JournalHeadingContainer>
            {
                subTitle &&
                <Flex justifyContent="center">
                    <h2 className={typoStyles.journalSubTitle}>{subTitle}</h2>
                </Flex>
            }
            { tags && <TagBar tags={tags} defaultSpeed={6}/> }
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