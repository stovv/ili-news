import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import {Cards, Containers, Form, Typography} from '../components';
import {connect} from "react-redux";


function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

class PostsWithAd extends React.Component {

    offset = "50px";
    render() {
        const { posts, uid, width, mobileAdId } = this.props;

        if ( width >= 1280 ){
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
            }
            else if ( posts.length === 8 ) {
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
        }
        else if (width > 1023){
            if ( posts.length === 1 ){
                let type = randomChoice(['left', 'right']);

                switch (type) {
                    case 'left':{
                        return(
                            <Flex height="248px" mb="100px" >
                                <Box width={2/3} mx="15px">
                                    <Form.AdBlock uid={uid} id="R-A-351229-8" width="100%" height="100%" infinity/>
                                </Box>
                                <Box width={[1/3]}>
                                    <Cards.Post post={posts[0]}/>
                                </Box>
                            </Flex>
                        );
                    }
                    case 'right':{
                        return(
                            <Flex height="248px" mb="100px">
                                <Box width={[1/3]}>
                                    <Cards.Post post={posts[0]}/>
                                </Box>
                                <Box width={2/3} mx="15px">
                                    <Form.AdBlock id="R-A-351229-8" uid={uid} width="100%" height="100%" infinity/>
                                </Box>
                            </Flex>
                        );
                    }
                }

            }
            else if ( posts.length === 4 ){
                return(
                    <>
                        <Flex height="248px" mb="100px">
                            {
                                posts.slice(0, 3).map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box width={[1/3]}>
                                            <Cards.Post post={item}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                        </Flex>
                        <Flex height="248px" mb="100px">
                            {
                                posts.slice(3).map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box width={[1/3]}>
                                            <Cards.Post post={item}/>
                                        </Box>
                                    </React.Fragment>
                                )
                            }
                            <Box width={2/3} mx="15px">
                                <Form.AdBlock uid={uid} id="R-A-351229-8" width="100%" height="100%" infinity/>
                            </Box>
                        </Flex>
                    </>
                );
            }
            else if ( posts.length === 6 ) {
                let items = [];
                for (let i = 0, j = posts.length; i < j; i += 2) {
                    let tempPosts = posts.slice(i, i + 2);
                    items.push(
                        <Flex height="248px" mb={i < posts.length -1 && "90px"}>
                            {
                                tempPosts.map((item, index)=>
                                    <React.Fragment key={index}>
                                        <Box width={[1/2]}>
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
                        <Box width={2/3}>
                            {items}
                        </Box>
                        <Box width={1/3}>
                            <Form.AdBlock uid={uid} infinity width="100%" height="100%" id="R-A-351229-6"/>
                        </Box>
                    </Flex>
                );
            }
            else if ( posts.length === 8 ) {
                let lines = [];
                for (let gi = 0, gj = posts.length; gi < gj; gi += 4) {
                    let items = [];
                    let twoPosts = posts.slice(gi, gi + 4);
                    for (let i = 0, j = twoPosts.length; i < j; i += 2) {
                        let tempPosts = twoPosts.slice(i, i + 2);
                        items.push(
                            <Flex height="248px" mb="100px">
                                {
                                    tempPosts.map((item, index)=>
                                        <React.Fragment key={index}>
                                            <Box width={[1/2]}>
                                                <Cards.Post post={item}/>
                                            </Box>
                                        </React.Fragment>
                                    )
                                }
                            </Flex>
                        );
                    }
                    lines.push (
                        gi === 0
                                ? <Flex my={this.offset}>
                                        <Box width={1/3}>
                                            <Form.AdBlock uid={uid} infinity width="100%" height="100%" id="R-A-351229-6"/>
                                        </Box>
                                        <Box width={2/3}>
                                            {items}
                                        </Box>
                                </Flex>
                                : <Flex my={this.offset}>
                                    <Box width={2/3}>
                                        {items}
                                    </Box>
                                    <Box width={1/3}>
                                        <Form.AdBlock uid={uid} infinity width="100%" height="100%" id="R-A-351229-6"/>
                                    </Box>
                                </Flex>
                    );
                }

                return lines;
            }
        }
        else{
            return(
                <>
                    {
                        posts.map((item, index)=>
                            <React.Fragment key={index}>
                                <Box width="100%" height="350px" mx="auto" my={"40px"}>
                                    <Cards.Post post={item}/>
                                </Box>
                            </React.Fragment>
                        )
                    }
                    <Box width="100%" height="350px" mx="auto" my={"40px"}>
                        <Form.AdBlock id={mobileAdId} uid={uid} infinity width="100%" height="100%"/>
                    </Box>
                </>
            );

        }

        if (posts.length > 0){
            let items = [];
            let sliceCount = 4;
            if (width <= 1023){
                sliceCount = 3
            }
            for (let i = 0, j = posts.length; i < j; i += sliceCount) {
                let tempPosts = posts.slice(i, i + sliceCount);
                items.push(
                    <Flex height="248px" mb="100px">
                        {
                            tempPosts.map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={[1/sliceCount]}>
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
    uid: PropTypes.number,
    mobileAdId: PropTypes.string,
}

function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(PostsWithAd);