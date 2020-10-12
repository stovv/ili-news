import React from 'react';

import { Images, Cards, Typography } from '../components';
import { Default, Mini } from '../components/Containers';
import { PostLink } from "../components/Links.react";
import { connect } from "react-redux";
import { CardText } from "../components/Typography";
import { Flex, Box } from 'reflexbox';

class TopPosts extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.width != this.props.width;
    }

    render(){
        const {posts, width} = this.props;
        const [ first = null, ...otherPosts ] = posts;

        if (width > 1023){
            return (
                <>
                    {
                        first !== null &&
                            <Images.Lazy cover={first.cover}  blur height="384px" blackout>
                                <Default>
                                    <Flex mt={"80px"}>
                                        <Box>
                                            <Typography.TagLabel type="large"
                                                                 color={"var(--text-onPrimary)"}
                                                                 margin={`0 0 var(--spacing-m) 0`}
                                                                 textTransform="lowercase">
                                                {first.rubric.title}
                                            </Typography.TagLabel>
                                            <Typography.Heading level={1}
                                                                color={"var(--text-onPrimary)"}
                                                                maxWidth="816px"
                                                                margin={`var(--spacing-m) 0 0 0`}>
                                                {first.title}
                                            </Typography.Heading>
                                        </Box>
                                    </Flex>
                                </Default>
                            </Images.Lazy>
                    }
                    <Default>
                        <Flex height="400px" >
                            {
                                first !== null &&
                                    <Box width={2/4} pb={"20px"} mr="5px" height="490px"
                                         sx={{transform: "translate(0, -20%)"}}>
                                        <PostLink postSlug={first.slug}>
                                            <Cards.Large cover={first.cover} type="bottomLeft">
                                                {first.description}
                                            </Cards.Large>
                                        </PostLink>
                                    </Box>
                            }
                            {
                                otherPosts.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Box width={1/4} mx="5px"  mt={"56px"}>
                                            <Cards.Post post={item} float="right"/>
                                        </Box>
                                    </React.Fragment>
                                ))
                            }
                        </Flex>
                    </Default>
                </>
            );
        }else{
            return (
                <Mini>
                    <CardText type="normal" margin={`var(--spacing-block) 0 0 0`} color={"var(--primary)"}>
                        Популярное
                    </CardText>
                    {
                        posts.map((item, index) => (
                            <React.Fragment key={index}>
                                <Box width="100%" height="350px" mx="auto" mb="40px" mt={index === 0 ? "24px" : "40px"}>
                                    <Cards.Post post={item}/>
                                </Box>
                            </React.Fragment>
                        ))
                    }
                </Mini>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(TopPosts);