import React from 'react';
import {Flex, Box} from 'rebass';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import BannerWithButton from './Banners/BannerWithButton.react';
import { Containers, Cards, Form } from '../components';

class CompsBannerAd extends React.Component {

    render(){
        const { theme, bannerContent, bannerAdId, mobilebannerAdId, width } = this.props;
        const posts = theme.posts;
        //console.log(posts);

        if (width > 1023){
            return (
                <Containers.Default >
                    <Flex height="672px">
                        <Box width={9/12} height="100%" mr="32px">
                            <Flex height="304px">
                                <Box width={8/12} >
                                    <Cards.Large type="bottomRight" cover={posts[0].cover} heading={posts[0].rubric.title}>
                                        {posts[0].title}
                                    </Cards.Large>
                                </Box>
                                <Box width={4/12}  pl="32px">
                                    <Box mb="48px" height="128px" width="100%">
                                        <Cards.Mini cover={posts[1].cover} heading={posts[1].rubric.title}>
                                            {posts[1].title}
                                        </Cards.Mini>
                                    </Box>
                                    <Box height="128px" width="100%">
                                        <Cards.Mini cover={posts[2].cover} heading={posts[2].rubric.title}>
                                            {posts[2].title}
                                        </Cards.Mini>
                                    </Box>
                                </Box>
                            </Flex>
                            <Box height="320px" mt="48px" bg="#321654" width="100%">
                                <BannerWithButton
                                    buttonText={bannerContent.buttonText}
                                    buttonLink={bannerContent.buttonLink}
                                    cover={{
                                        "id": "6",
                                        "formats": null,
                                        "url": "/uploads/9247cad50ec84b06a27d3c9eacc4fc4c.jfif",
                                        "width": null,
                                        "height": null
                                    }}>{bannerContent.text} </BannerWithButton>
                            </Box>
                        </Box>
                        <Box width={3/12}>
                            <Form.AdBlock id={bannerAdId} width="100%" height="100%"/>
                        </Box>
                    </Flex>
                </Containers.Default>
            );
        }else{
            return (
                <Containers.Mini >
                    <Flex flexDirection="column">
                        {
                            posts.map((item, index)=>
                                <React.Fragment key={index}>
                                    <Box width="100%" height="70vw" mx="auto" my={"40px"}>
                                        <Cards.Post post={item}/>
                                    </Box>
                                </React.Fragment>
                            )
                        }
                        <Box width="100%" height="70vw" mx="auto" my={"40px"}>
                            <Form.AdBlock id={mobilebannerAdId} width="100%" height="100%"/>
                        </Box>
                        <Box height="320px" mt="48px" bg="#321654" width="100%">
                            <BannerWithButton
                                buttonText={bannerContent.buttonText}
                                buttonLink={bannerContent.buttonLink}
                                cover={{
                                    "id": "6",
                                    "formats": null,
                                    "url": "/uploads/9247cad50ec84b06a27d3c9eacc4fc4c.jfif",
                                    "width": null,
                                    "height": null
                                }}>{bannerContent.text} </BannerWithButton>
                        </Box>
                    </Flex>


                </Containers.Mini>
            );
        }
    }
}

CompsBannerAd.propTypes = {
    theme: PropTypes.array.isRequired,
    bannerContent: PropTypes.object.isRequired,
    bannerAdContent: PropTypes.node
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(CompsBannerAd);