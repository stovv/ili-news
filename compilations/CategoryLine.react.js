import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';

import { Cards, Containers, Typography } from '../components';
import {CategoryLink} from "../components/Links.react";
class CategoryLine extends React.Component {

    render() {
        const { posts, category } = this.props;
        return(
            <Containers.Default mt="62px" mb="120px">
                <CategoryLink categorySlug={category.slug}>
                    <Typography.CardText type="large">{category.title}</Typography.CardText>
                </CategoryLink>
                <Flex height="248px">
                    {
                        posts.slice(0,4).map((item, index)=>
                            <React.Fragment key={index}>
                                <Box width={[1/4]}>
                                    <Cards.Post post={item}/>
                                </Box>
                            </React.Fragment>
                        )
                    }
                </Flex>
            </Containers.Default>
        );
    }
}

CategoryLine.propTypes = {
    category: PropTypes.string,
    posts: PropTypes.array.isRequired
}

export default CategoryLine;