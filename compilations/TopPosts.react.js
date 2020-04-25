import React from 'react';
import {Flex, Box} from 'rebass';
import { withTheme } from 'styled-components';

import {Images, Cards, Typography, Containers} from '../components';
import {Upper} from "../components/Animations";

class TopPosts extends React.Component {

    render(){
        const {posts, theme} = this.props;
        console.log(posts);
        const {id, title, description, cover, } = posts[0].post;

        return (
            <React.Fragment>
                <Images.Simple url={cover.url}  blur height="384px" blackout>
                    <Flex mt={[81]}>
                        <Box>
                            <Containers.Default>
                                <Typography.TagLabel type="large"
                                                     color={theme.text.onPrimary}
                                                     margin={`0 0 ${theme.spacing.m} 0`}
                                                     textTransform="lowercase">test</Typography.TagLabel>
                                <Typography.Heading level={1}
                                                    color={theme.text.onPrimary}
                                                    maxWidth="816px"
                                                    margin={` ${theme.spacing.m} 0 0 0`}
                                >{title}</Typography.Heading>
                            </Containers.Default>
                        </Box>
                    </Flex>
                </Images.Simple>
                <Containers.Default>
                    <Flex height="400px" >
                        <Box width={[2/4]} pb={["20px"]} height="490px">
                            <Cards.Large url={cover.url} type="bottomLeft" tight>{description}</Cards.Large>
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