import React from 'react';
import {Flex, Box} from 'rebass';
import PropTypes from 'prop-types';


import BannerWithButton from './Banners/BannerWithButton.react';
import { Containers, Cards } from '../components';

class CompsBannerAd extends React.Component {

    render(){
        const { posts, bannerContent, bannerAdContent } = this.props;
        return (
            <Containers.Default >
                <Flex height="672px">
                    <Box width={9/12} height="100%" mr="32px">
                        <Flex height="304px">
                            <Box width={8/12} >
                                <Cards.Large type="bottomRight" url={posts[0].post.cover.url} heading={posts[0].post.tag.name}>
                                    {posts[0].post.title}
                                </Cards.Large>
                            </Box>
                            <Box width={4/12}  pl="32px">
                                <Box mb="48px" height="128px" width="100%">
                                    <Cards.Mini coverUrl={posts[1].post.cover.url} heading={posts[1].post.tag.name}>
                                        {posts[1].post.title}
                                    </Cards.Mini>
                                </Box>
                                <Box height="128px" width="100%">
                                    <Cards.Mini coverUrl={posts[2].post.cover.url} heading={posts[2].post.tag.name}>
                                        {posts[2].post.title}
                                    </Cards.Mini>
                                </Box>
                            </Box>
                        </Flex>
                        <Box height="320px" mt="48px" bg="#321654" width="100%">
                            <BannerWithButton
                                buttonText={bannerContent.buttonText}
                                buttonLink={bannerContent.buttonLink}
                                coverUrl="/uploads/9247cad50ec84b06a27d3c9eacc4fc4c.jfif"
                            >{bannerContent.text} </BannerWithButton>
                        </Box>
                    </Box>
                    <Box width={3/12} bg="#4a4a4a"/>
                </Flex>
            </Containers.Default>
        );
    }
}

CompsBannerAd.propTypes = {
    posts: PropTypes.array.isRequired,
    bannerContent: PropTypes.object.isRequired,
    bannerAdContent: PropTypes.node
}

export default CompsBannerAd;