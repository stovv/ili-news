import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { connect } from "react-redux";

import NewsBlock from "./Banners/News.react";
import {Cards, Containers} from '../components';
import {PostLink} from "../components/Links.react";


class NewsPostsComps extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.width != this.props.width;
    }

    render(){
        const {compilation, news, posts, width} = this.props;

        const {id, title, description, cover, tag, } = compilation.posts[0];


        if ( width > 1023 ){
            return (
                <Containers.Default>
                    <Flex height={["672px"]} marginTop={["55px"]}>
                        <Box width={1/4} >
                            <Flex flexDirection="column" height="100%">
                                {
                                    posts.slice(0,2).map((item,index)=>
                                        <React.Fragment key={index}>
                                            <Box height="50%" mr="5px">
                                                <Cards.Post post={item}/>
                                            </Box>
                                        </React.Fragment>
                                    )
                                }
                            </Flex>
                        </Box>
                        <Box width={2/4} height="100%" mr="5px">
                            <Flex flexDirection="column" height="100%">
                                <Box height={["75%"]} width="100%" mx="auto">
                                    <PostLink postId={id}>
                                        <Cards.Large cover={cover} heading={compilation.title} type="topRight" >{title}</Cards.Large>
                                    </PostLink>
                                </Box>
                                <Box height={["25%"]} mx="5px">
                                    <Flex>
                                        {
                                            compilation.posts.slice(1, 3).map((item, index)=>
                                                <React.Fragment key={index}>
                                                    <Box width={1/2} mt="32px" mr="20px">
                                                        <Cards.Mini heading={compilation.title} cover={item.cover} id={item.id}>
                                                            {item.title}
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
        }else{
            return (
                <Containers.Mini>
                    {
                        compilation.posts.map((item, index)=>
                            <React.Fragment key={index}>
                                <Box width="100%" height="350px" mx="auto" my={"40px"}>
                                    <Cards.Post post={item}/>
                                </Box>
                            </React.Fragment>
                        )
                    }
                    <NewsBlock news={news}/>
                    {
                        posts.map((item,index)=>
                            <React.Fragment key={index}>
                                <Box width="100%" height="350px" mx="auto" my={"40px"}>
                                    <Cards.Post post={item}/>
                                </Box>
                            </React.Fragment>
                        )
                    }
                </Containers.Mini>
            );
        }
    }
}

NewsPostsComps.propTypes = {
    compilation: PropTypes.object.isRequired,
    news: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
}

function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(NewsPostsComps);