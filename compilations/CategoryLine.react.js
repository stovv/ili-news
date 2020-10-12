import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CardText } from '../components/Typography';
import { Post } from '../components/Cards';
import { Default, Mini } from '../components/Containers';
import { Flex, Box } from 'reflexbox';
import { CategoryLink } from "../components/Links.react";


class CategoryLine extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.width != this.props.width;
    }


    render() {
        const { posts, category, width } = this.props;

        if ( !category ){
            return null;
        }

        if ( width >= 1280 ) {
            return(
                <Default mt="62px" mb="120px">
                    {
                        category &&
                        <CategoryLink categorySlug={category.slug}>
                            <CardText type="large">{category.title}</CardText>
                        </CategoryLink>
                    }
                    <Flex height="248px">
                        {
                            posts.slice(0,4).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={1/4} mr={index !== posts.slice(0,4).length - 1 && "5px"} >
                                        <Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                </Default>
            );
        }else if ( width > 1023 ) {
            return(
                <Default mt="62px" mb="120px">
                    {
                        category &&
                        <CategoryLink categorySlug={category.slug}>
                            <CardText type="large">{category.title}</CardText>
                        </CategoryLink>
                    }
                    <Flex height="248px">
                        {
                            posts.slice(0,3).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={1/3} mr={index !== posts.slice(0,4).length - 1 && "5px"} >
                                        <Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                    <Flex height="248px" mt={"95px"}>
                        {
                            posts.slice(3).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width={1/3} mr={index !== posts.slice(0,4).length - 1 && "5px"} >
                                        <Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                </Default>
            );
        } else{
            return(
                <Mini mt="62px" >
                    {
                        category &&
                        <CategoryLink categorySlug={category.slug}>
                            <CardText type="large">{category.title}</CardText>
                        </CategoryLink>
                    }
                    <Flex flexDirection="column">
                        {
                            posts.slice(0,4).map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width="100%" height="350px" mx="auto" my={"40px"}>
                                        <Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                    </Flex>
                </Mini>
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