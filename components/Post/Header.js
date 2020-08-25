import React from "react"
import Moment from "react-moment";
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { connect } from 'react-redux';
import styled, { withTheme } from "styled-components";

import Share from './Components/Share';
import AuthorList from './Components/Author';
import { Heading, Rubric, PublishDate, EventDateDay, EventDateMouth } from './Components/Typo';


const EventDateWrapper = styled.div`
     display: flex;

     @media screen and ( min-width: 1024px ){
         border-right: 2px solid ${props=> props.theme.colors.primary};
         margin-right: 23px;
         padding: 10px 0;
     }
     
     @media screen and ( max-width: 1023px ){
         border-right: 1px solid ${props=> props.theme.colors.primary};
         margin-right: 18px;
     }
`;


class PostHeader extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.slug !== this.props.slug
            || (nextProps.width >= 600 && this.props.width < 600)
            || (nextProps.width < 600 && this.props.width >= 600) ;
    }

    render() {
        const { children: title, rubric, authors, date, slug, eventDate, cover } = this.props;
        const { width, theme } = this.props;

        return (
            <>
                <Rubric>{rubric}</Rubric>
                {
                    eventDate
                        ? <Flex mb={"10px"}>
                            <EventDateWrapper>
                                <Box m="auto">
                                    <EventDateDay>
                                        <Moment locale="ru" format="DD">{eventDate}</Moment>
                                    </EventDateDay>
                                    <EventDateMouth>
                                        <Moment locale="ru" format="MMM">{eventDate}</Moment>
                                    </EventDateMouth>
                                </Box>
                            </EventDateWrapper>
                            <Heading>{title}</Heading>
                        </Flex>
                        : <Heading>{title}</Heading>
                }
                <Flex mb={theme.spacing.m}>
                    <PublishDate>
                        <Moment locale="ru" format={"DD MMMM YYYY"}>{date}</Moment>
                    </PublishDate>
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

export default connect(mapStateToProps)(withTheme(PostHeader));