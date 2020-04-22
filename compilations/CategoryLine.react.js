import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import { Cards, Containers, Typography } from '../components';
class CategoryLine extends React.Component {

    render() {
        const { posts } = this.props;
        return(
            <Containers.Default mt="62px" mb="120px">
                <Typography.CardText type="large">{posts[0].post.category.title}</Typography.CardText>
                <Flex height="248px">
                    {
                        posts.slice(0,4).map((item, index)=>
                            <React.Fragment key={index}>
                                <Box width={[1/4]}>
                                    <Cards.Post post={item.post}/>
                                </Box>
                            </React.Fragment>
                        )
                    }
                </Flex>
            </Containers.Default>
        );
    }
}

CategoryLine.PropTypes = {
    posts: PropTypes.array.isRequired
}

export default CategoryLine;