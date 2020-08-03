import React from 'react';
import {Flex, Box} from 'rebass';
import { Hide } from '@rebass/hide';
import { withTheme } from 'styled-components';

import {Images, Cards, Typography, Containers} from '../components';
import {PostLink} from "../components/Links.react";
import { connect } from "react-redux";
import {CardText} from "../components/Typography";

class TopPosts extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.width != this.props.width;
    }

    render(){
        const {posts, theme, width} = this.props;
        const [ first = null, ...otherPosts ] = posts;

        if (width > 1023){
            return (
                <>
                    {
                        first !== null &&
                            <Images.Lazy cover={first.post.cover}  blur height="384px" blackout>
                                <Containers.Default>
                                    <Flex mt={[81]}>
                                        <Box>
                                            <Typography.TagLabel type="large"
                                                                 color={theme.text.onPrimary}
                                                                 margin={`0 0 ${theme.spacing.m} 0`}
                                                                 textTransform="lowercase">
                                                {first.post.rubric.title}
                                            </Typography.TagLabel>
                                            <Typography.Heading level={1}
                                                                color={theme.text.onPrimary}
                                                                maxWidth="816px"
                                                                margin={` ${theme.spacing.m} 0 0 0`}>
                                                {first.post.title}
                                            </Typography.Heading>
                                        </Box>
                                    </Flex>
                                </Containers.Default>
                            </Images.Lazy>
                    }
                    <Containers.Default>
                        <Flex height="400px" >
                            {
                                first !== null &&
                                    <Box width={[2/4]} pb={["20px"]} mr="5px" height="490px"
                                         sx={{transform: "translate(0, -20%)"}}>
                                        <PostLink postSlug={first.post.slug}>
                                            <Cards.Large cover={first.post.cover} type="bottomLeft">
                                                {first.post.description}
                                            </Cards.Large>
                                        </PostLink>
                                    </Box>
                            }
                            {
                                otherPosts.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Box width={[1/4]} mx="5px"  mt={["56px"]}>
                                            <Cards.Post post={item.post} float="right"/>
                                        </Box>
                                    </React.Fragment>
                                ))
                            }
                        </Flex>
                    </Containers.Default>
                </>
            );
        }else{
            return (
                <Containers.Mini>
                    <CardText type="normal" margin={`${theme.spacing.block} 0 0 0`} color={theme.colors.primary}>Популярное</CardText>
                    {
                        posts.map((item, index) => (
                            <React.Fragment key={index}>
                                <Box width="100%" height="350px" mx="auto" mb="40px" mt={index === 0 ? "24px" : "40px"}>
                                    <Cards.Post post={item.post}/>
                                </Box>
                            </React.Fragment>
                        ))
                    }
                </Containers.Mini>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(withTheme(TopPosts));