import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'rebass';
import { connect } from 'react-redux';

import { Cards, Containers, Typography } from '../components';
import {CategoryLink} from "../components/Links.react";
class CategoryLine extends React.Component {

    render() {
        const { posts, category, width } = this.props;

        if ( width > 1023 ) {
            return(
                <Containers.Default mt="62px" mb="120px">
                    {
                        category &&
                        <CategoryLink categorySlug={category.slug}>
                            <Typography.CardText type="large">{category.title}</Typography.CardText>
                        </CategoryLink>
                    }
                    <Flex height="248px">
                        {
                            posts.slice(0,4).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={[1/4]} mr={index !== posts.slice(0,4).length - 1 && "5px"} >
                                        <Cards.Post post={item} noPreFetch/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                </Containers.Default>
            );
        }else{
            return(
                <Containers.Mini mt="62px" >
                    {
                        category &&
                        <CategoryLink categorySlug={category.slug}>
                            <Typography.CardText type="large">{category.title}</Typography.CardText>
                        </CategoryLink>
                    }
                    <Flex flexDirection="column">
                        {
                            posts.slice(0,4).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width="100%" height="70vw" mx="auto" my={"40px"}>
                                        <Cards.Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                </Containers.Mini>
            );
        }
    }
}

CategoryLine.propTypes = {
    category: PropTypes.object,
    posts: PropTypes.array.isRequired
}

function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(CategoryLine);