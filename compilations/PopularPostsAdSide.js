import React from "react";
import { Box } from "rebass";
import PropTypes from 'prop-types';

import { Form, Typography, Cards } from '../components';


class AdWithPopularPosts extends React.Component{
    render() {

        const { posts, sticky } = this.props;

        const additional = sticky
            ? {
                sx: {
                  position: "sticky",
                  top: "20px"
                }
            }
            : {};

        return (
            <Box width="100%"{...additional}>
                <Form.AdBlock id="R-A-351229-6" width="100%" height="584px"/>
                {
                    posts.length > 0 &&
                    <>
                        <Typography.CardText type="large" weight="bold" margin="59px 0 30px 0">Лучшее за неделю</Typography.CardText>
                        {
                            posts.slice(0, 4).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box mb="48px">
                                        <Cards.Mini heading={item.post.rubric.title} cover={item.post.cover} slug={item.post.slug}>
                                            {item.post.title}
                                        </Cards.Mini>
                                    </Box>
                                </React.Fragment>
                            )

                        }
                    </>
                }
            </Box>
        )
    }
}

AdWithPopularPosts.propTypes = {
    posts: PropTypes.array.isRequired,
    sticky: PropTypes.bool
}

export default AdWithPopularPosts;