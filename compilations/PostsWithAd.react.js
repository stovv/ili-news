import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import {Cards, Containers, Form, Typography} from '../components';


function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

class PostsWithAd extends React.Component {

    offset = "50px";

    render() {
        const { posts, uid } = this.props;

        if ( posts.length === 1 ){
            let type = randomChoice(['left', 'right']);

            switch (type) {
                case 'left':{
                    return(
                        <Flex height="248px" mb="100px" >
                            <Box width={3/4} mx="15px">
                                <Form.AdBlock uid={uid} id="R-A-351229-8" width="100%" height="100%" infinity/>
                            </Box>
                            <Box width={[1/4]}>
                                <Cards.Post post={posts[0]}/>
                            </Box>
                        </Flex>
                    );
                }
                case 'right':{
                    return(
                        <Flex height="248px" mb="100px">
                            <Box width={[1/4]}>
                                <Cards.Post post={posts[0]}/>
                            </Box>
                            <Box width={3/4} mx="15px">
                                <Form.AdBlock id="R-A-351229-8" uid={uid} width="100%" height="100%" infinity/>
                            </Box>
                        </Flex>
                    );
                }
            }

        }
        else if ( posts.length === 4 ){
            return(
                <Flex height="248px" mb="100px">
                    {
                        posts.map((item, index)=>
                            <React.Fragment key={index}>
                                <Box width={[1/4]}>
                                    <Cards.Post post={item}/>
                                </Box>
                            </React.Fragment>
                        )
                    }
                </Flex>
            );
        }
        else if ( posts.length === 6 ) {
            let items = [];
            for (let i = 0, j = posts.length; i < j; i += 3) {
                let tempPosts = posts.slice(i, i + 3);
                items.push(
                    <Flex height="248px" mb={i < posts.length -1 && "90px"}>
                        {
                            tempPosts.map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={[1/3]}>
                                        <Cards.Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                );
            }
            return(
                <Flex my={this.offset}>
                    <Box width={3/4}>
                        {items}
                    </Box>
                    <Box width={1/4}>
                        <Form.AdBlock uid={uid} infinity width="100%" height="100%" id="R-A-351229-6"/>
                    </Box>
                </Flex>
            );
        }else if ( posts.length === 8 ) {
            let items = [];
            for (let i = 0, j = posts.length; i < j; i += 4) {
                let tempPosts = posts.slice(i, i + 4);
                items.push(
                    <Flex height="248px" mb="100px">
                        {
                            tempPosts.map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={[1/4]}>
                                        <Cards.Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                );
            }
            return items;
        }

        if (posts.length > 0){

            let items = [];
            for (let i = 0, j = posts.length; i < j; i += 4) {
                let tempPosts = posts.slice(i, i + 4);
                items.push(
                    <Flex height="248px" mb="100px">
                        {
                            tempPosts.map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={[1/4]}>
                                        <Cards.Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                );
            }
            return items;
        }else{
            return (<></>);
        }
    }
}

PostsWithAd.propTypes = {
    posts: PropTypes.array.isRequired,
    uid: PropTypes.number
}

export default PostsWithAd;