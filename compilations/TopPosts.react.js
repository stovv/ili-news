import React from 'react';
import {Flex, Box} from 'rebass';
import { Hide } from '@rebass/hide';
import { withTheme } from 'styled-components';

import {Images, Cards, Typography, Containers} from '../components';
import {PostLink} from "../components/Links.react";

class TopPosts extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return false;
    }

    render(){
        const {posts, theme} = this.props;
        const {id, title, description, cover, rubric } = posts[0].post;

        return (
            <React.Fragment>
                <Hide xsmall small medium>
                    <Images.Lazy cover={cover}  blur height="384px" blackout>
                        <Containers.Default>
                            <Flex mt={[81]}>
                                <Box>
                                        <Typography.TagLabel type="large"
                                                             color={theme.text.onPrimary}
                                                             margin={`0 0 ${theme.spacing.m} 0`}
                                                             textTransform="lowercase">{rubric.title}</Typography.TagLabel>
                                        <Typography.Heading level={1}
                                                            color={theme.text.onPrimary}
                                                            maxWidth="816px"
                                                            margin={` ${theme.spacing.m} 0 0 0`}
                                        >{title}</Typography.Heading>
                                </Box>
                            </Flex>
                        </Containers.Default>
                    </Images.Lazy>
                    <Containers.Default>
                        <Flex height="400px" >
                            <Box width={[2/4]} pb={["20px"]} mr="5px" height="490px" sx={{transform: "translate(0, -20%)"}}>
                                <PostLink postId={id}>
                                    <Cards.Large cover={cover} type="bottomLeft">{description}</Cards.Large>
                                </PostLink>
                            </Box>
                            {
                                posts.slice(1).map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Box width={[1/4]} mx="5px"  mt={["56px"]}>
                                            <Cards.Post post={item.post} float="right"/>
                                        </Box>
                                    </React.Fragment>
                                ))
                            }
                        </Flex>
                    </Containers.Default>
                </Hide>
                <Hide large xlarge>
                    <Containers.Mini mt="24px">
                            <Box width="90vw" height="90vw" mx="auto" mb="64px">
                                <PostLink postId={id}>
                                    <Cards.Large heading={rubric.title}  cover={cover} description={description} type="bottomLeft">{title}</Cards.Large>
                                </PostLink>
                            </Box>
                            {
                                posts.slice(1).map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Box width="70vw" height="70vw" mb={["100px"]} mx="auto">
                                            <Cards.Post post={item.post} float="right" full/>
                                        </Box>
                                    </React.Fragment>
                                ))
                            }
                    </Containers.Mini>
                </Hide>
            </React.Fragment>
        );
    }
}

export default withTheme(TopPosts);