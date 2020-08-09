import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { connect } from 'react-redux';
import { withTheme } from 'styled-components';
import windowSize from 'react-window-size';

import { Lazy } from '../Images';
import {TagLabel, CardText, Heading} from '../Typography';
import { PostLink } from "../Links.react";

class Post extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext){
        return false;
    }

    render(){
        const { theme, float, full, width } = this.props;
        const { slug, title, cover, publish_at, rubric, event_date } = this.props.post || {};

        let date = new Date(publish_at);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        const publishDate = date.toLocaleString("ru-RU", options).replace('г.', '');

        const additionalProps = {
            margin: "0 auto",
            maxWidth: full ? undefined : "296px",
            maxHeight: full ? undefined : "248px",
        };

        const EventDate = () => {
            if (event_date){
                const date = new Date(event_date);
                let options = { month: 'long' };
                //console.log();
                return (
                    <>
                        <Box height="100%" width="100%" bg="#000000" sx={{opacity: '0.4', position: 'absolute'}}/>
                        <Box style={{position: 'absolute', top: "50%", transform: 'translateY(-50%)'}} width="100%">
                            <Heading level={1} color="#fff" textAlign="center" margin="0 0">{date.getDate()}</Heading>
                            <Heading level={1} color="#fff" textAlign="center" margin="0 0">{date.toLocaleDateString('ru-RU', options)}</Heading>
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
                            ( rubric.withEventDate && event_date ) && <>
                                <EventDate/>
                            </>
                        }
                        <Box bg={theme.colors.backgroundPrimary}
                             maxWidth={full ? undefined : ["264px"]} px={[theme.spacing.s]}
                             sx={{
                                 position: "absolute",
                                 bottom: "-75px",
                                 right: 0
                             }}>

                            {
                                rubric &&
                                <TagLabel type="normal" color={theme.text.hover}
                                          textTransform="lowercase" margin={`${theme.spacing.xs} 0`}>
                                    {rubric.title}
                                </TagLabel>
                            }
                            <CardText type="normal" maxWidth={"240px"} margin="0" color={theme.text.secondarySecondary}>
                                {title}
                            </CardText>
                            <TagLabel type="small" color={theme.text.secondary} margin={`${theme.spacing.xs} 0`}>
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
                        <Box bg={theme.colors.backgroundPrimary} px={[theme.spacing.s]}
                             width="100%" sx={{
                                 position: "absolute",
                                 bottom: 0,
                                 right: 0
                             }}>
                            {
                                rubric &&
                                <TagLabel type="normal" color={theme.text.hover}
                                          textTransform="lowercase" margin={`${theme.spacing.xs} 0`}>
                                    {rubric.title}
                                </TagLabel>
                            }
                            <CardText type="normal" margin="0" color={theme.text.secondarySecondary}>
                                {title}
                            </CardText>
                            <TagLabel type="small" color={theme.text.secondary} margin={`${theme.spacing.xs} 0`}>
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

export default connect(mapStateToProps)(withTheme(Post));