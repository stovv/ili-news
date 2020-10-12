import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Lazy } from '../Images';
import {TagLabel, CardText, Heading} from '../Typography';
import { PostLink } from "../Links.react";
import { Box } from 'reflexbox';

class Post extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext){
        const { slug } = this.props.post || {};
        const { nextSlug } = nextProps.post || {};
        return slug !== nextSlug;
    }

    render(){
        const { float, full, width } = this.props;
        const { slug, title, cover, publish_at, rubric, eventDate } = this.props.post || {};

        let date = new Date(publish_at);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        const publishDate = date.toLocaleString("ru-RU", options).replace('г.', '');

        const additionalProps = {
            margin: "0 auto",
            maxWidth: full ? undefined : "296px",
            maxHeight: full ? undefined : "248px",
        };

        const EventDate = () => {
            if (eventDate){
                return (
                    width > 1023
                      ? <>
                            <Box height="100%" width="100%" bg="#000000" sx={{opacity: '0.4', position: 'absolute'}}/>
                            <Box sx={{position: 'absolute', top: "50%", transform: 'translateY(-50%)'}} width="100%">
                                <Heading level={1} color="#fff" textAlign="center" margin="0 0">
                                    {eventDate.day}
                                </Heading>
                                <Heading level={1} color="#fff" textAlign="center" margin="0 0">
                                    {eventDate.mouth}
                                </Heading>
                            </Box>
                        </>
                     : <>
                            <Box height="100%" width="100%" bg="#000000" sx={{opacity: '0.4', position: 'absolute'}}/>
                            <Box sx={{position: 'absolute', top: "40%", transform: 'translateY(-50%)'}} width="100%">
                                <Heading level={1} color="#fff" textAlign="center" margin="0 0">
                                    {eventDate.day}
                                </Heading>
                                <Heading level={1} color="#fff" textAlign="center" margin="0 0">
                                    {eventDate.mouth}
                                </Heading>
                            </Box>
                       </>
                );
            }
            return (<></>);
        }


        if (width > 1023){
            return (
                <Box height="100%" width="100%" >
                    <Lazy cover={cover} {...additionalProps} overflow="visible" hover float={float}
                          wrapper={PostLink} wrapperParams={{postSlug: slug}}>
                        {
                            ( rubric.withEventDate && eventDate ) && <>
                                <EventDate/>
                            </>
                        }
                        <Box bg={"var(--backgroundPrimary)"}
                             maxWidth={full ? undefined : "264px"} px={"var(--spacing-s)"}
                             sx={{
                                 position: "absolute",
                                 bottom: "-75px",
                                 right: 0
                             }}>

                            {
                                rubric &&
                                <TagLabel type="normal" color={"var(--text-hover)"}
                                          textTransform="lowercase" margin={`var(--spacing-xs) 0`}>
                                    {rubric.title}
                                </TagLabel>
                            }
                            <CardText type="normal" maxWidth={"240px"} margin="0" color={"var(--text-secondarySecondary)"}>
                                {title}
                            </CardText>
                            <TagLabel type="small" color={"var(--text-secondary)"} margin={`var(--spacing-xs) 0`}>
                                {publishDate}
                            </TagLabel>
                        </Box>
                    </Lazy>
                </Box>
            );
        }else{
            return (
                <Box height="100%" width="100%">
                    <Lazy cover={cover} wrapper={PostLink} wrapperParams={{postSlug: slug}}>
                        {
                            ( rubric.withEventDate && eventDate ) && <>
                                <EventDate/>
                            </>
                        }
                        <Box bg={"var(--backgroundPrimary)"} px={"var(--spacing-s)"}
                             width="100%" sx={{
                                 position: "absolute",
                                 bottom: 0,
                                 right: 0
                             }}>
                            {
                                rubric &&
                                <TagLabel type="normal" color={"var(--text-hover)"}
                                          textTransform="lowercase" margin={`var(--spacing-xs) 0`}>
                                    {rubric.title}
                                </TagLabel>
                            }
                            <CardText type="normal" margin="0" color={"var(--text-secondarySecondary)"}>
                                {title}
                            </CardText>
                            <TagLabel type="small" color={"var(--text-secondary)"} margin={`var(--spacing-xs) 0`}>
                                {publishDate}
                            </TagLabel>
                        </Box>
                    </Lazy>
                </Box>
            );
        }


    }
}


Post.propTypes = {
    post: PropTypes.object.isRequired,
    full: PropTypes.bool,
    float: PropTypes.string,
    noPreFetch: PropTypes.bool,
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(Post);