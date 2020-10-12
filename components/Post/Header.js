import React from "react"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Share from './Components/Share';
import AuthorList from './Components/Author';
import { Flex, Box } from 'reflexbox';
import { Heading, Rubric, PublishDate, EventDateDay, EventDateMouth } from './Components/Typo';
import styles from './styles/header.module.css';


class PostHeader extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.slug !== this.props.slug
            || (nextProps.width >= 600 && this.props.width < 600)
            || (nextProps.width < 600 && this.props.width >= 600) ;
    }

    render() {
        const { children: title, rubric, authors, date, slug, eventDate, cover } = this.props;
        const { width } = this.props;

        return (
            <>
                <Rubric>{rubric}</Rubric>
                {
                    eventDate
                        ? <Flex mb={"10px"}>
                            <div className={styles.eventDateWrapper}>
                                <Box m="auto">
                                    <EventDateDay>{eventDate.day}</EventDateDay>
                                    <EventDateMouth>{eventDate.mouth}</EventDateMouth>
                                </Box>
                            </div>
                            <Heading>{title}</Heading>
                        </Flex>
                        : <Heading>{title}</Heading>
                }
                <Flex my={"var(--spacing-m)"}>
                    <PublishDate>{date}</PublishDate>
                    {
                        width > 600 && <AuthorList authors={authors}/>
                    }
                    <Box  my="auto" ml="auto">
                        <Share slug={slug} cover={cover}>{title}</Share>
                    </Box>
                </Flex>
                {
                    width <= 600 && <AuthorList authors={authors}/>
                }
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

PostHeader.propTypes = {
    eventDate: PropTypes.string,
    date: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    rubric: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    cover: PropTypes.object
}

export default connect(mapStateToProps)(PostHeader);