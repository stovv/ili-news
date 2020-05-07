import React from 'react';
import {Flex, Box} from 'rebass';
import { withTheme } from 'styled-components';

import {Images, Cards, Typography, Containers} from '../components';
import {Upper} from "../components/Animations";
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
                        <Box width={[2/4]} pb={["20px"]} height="490px" sx={{transform: "translate(0, -20%)"}}>
                            <PostLink postId={id}>
                                <Cards.Large cover={cover} type="bottomLeft">{description}</Cards.Large>
                            </PostLink>
                        </Box>
                        {
                            posts.slice(1).map((item, index) => (
                                <React.Fragment key={index}>
                                    <Box width={[1/4]} mr={0} mt={["56px"]}>
                                        <Cards.Post post={item.post} float="right"/>
                                    </Box>
                                </React.Fragment>
                            ))
                        }
                    </Flex>
                </Containers.Default>
            </React.Fragment>
        );
    }
}

export default withTheme(TopPosts);