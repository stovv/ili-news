import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import NewsBlock from "./News.react";
import {Cards, Containers} from '../components';


class NewsPostsComps extends React.Component {
    render(){
        const {compilation, news, posts} = this.props;

        const {id, title, description, cover, tag} = compilation[compilation.length - 1].post;
        return (
            <Containers.Default>
                <Flex height={["672px"]} marginTop={["55px"]}>
                    <Box width={1/4} >
                        <Flex flexDirection="column" height="100%">
                            {
                                posts.slice(0,2).map((item,index)=>
                                    <React.Fragment key={index}>
                                        <Cards.Post post={item.post}>{title}</Cards.Post>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                    </Box>
                    <Box width={2/4} height="100%" >
                        <Flex flexDirection="column" height="100%">
                            <Box height={["75%"]} width="100%" mx="auto">
                                <Cards.Large url={cover.url} heading={tag.name} type="topRight" >{title}</Cards.Large>
                            </Box>
                            <Box height={["25%"]}>
                                <Flex>
                                    {
                                        compilation.slice(1, 3).map((item, index)=>
                                            <React.Fragment key={index}>
                                                <Box width={1/2} mt="32px">
                                                    <Cards.Mini heading={item.post.tag.name} coverUrl={item.post.cover.url}>
                                                        {item.post.title}
                                                    </Cards.Mini>
                                                </Box>
                                            </React.Fragment>
                                        )
                                    }
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                    <Box width={1/4} >
                        <NewsBlock news={news}/>
                    </Box>
                </Flex>
            </Containers.Default>
        );
    }
}

NewsPostsComps.propTypes = {
    compilation: PropTypes.object.isRequired,
    news: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
}

export default NewsPostsComps;