import React from 'react';
import { useAmp } from 'next/amp'
import { Flex, Box } from 'rebass';
import { connect } from "react-redux";
import { withTheme } from 'styled-components';

import Error from './error__';
import { Public } from '../api';
import { OLD_SITE_URL } from '../constants';
import { Post as PostCompilation } from '../compilations';
import {
    Post as PostComponents, PostBlocks ,Containers,
    Typography, Images, Cards, Form, Blocks
} from '../components';


//export const config = { amp: 'hybrid' };

// const AmpMode = ({ children, ampOnly }) => {
//     const isAmp = useAmp()
//     console.log(isAmp);
//     return children
// }

const RegularPost = ({data, theme}) => {
    const { postId, width, rubric, title, publish_at, popularPosts, clientIp, authors, dispatch,
        blocks:{ blocks }, slug, cover, rating, commentThread, readMoreLinks,
        eventDate, eventLink, eventLocation, eventPrice } = data;
    // TODO Remove it after beta release
    return (
        <>
        <Containers.Default>
            <PostComponents.Header rubric={rubric.title} slug={slug} authors={authors}
                                   date={publish_at} cover={cover} eventDate={eventDate}>
                {title}
            </PostComponents.Header>
            { rubric.cover && <Images.Lazy cover={cover} width="100%" height={width > 1023 ? "560px" : "229px"}/> }
            <Flex mt={["54px"]}>
                <Box width={width > 1023 ? [9/12] : '100%' } pr={width > 1023 ? ["10%"] : '0'}>
                    {
                        (eventLink != null && eventLocation != null && eventPrice != null)
                        && <Blocks.EventBanner data={{ eventLink, eventLocation, eventPrice, eventDate  }}/>
                    }
                    <PostBlocks data={blocks}/>
                    <PostComponents.Footer slug={slug} clientId={clientIp} commentThreadId={commentThread.id}
                                           rating={rating} readMore={readMoreLinks}/>
                </Box>
                {
                    width > 1023
                    && <Box width={[3/12]} pl={["2%"]}>
                        <Form.AdBlock id={'R-A-351229-6'} width={["100%"]} height={["584px"]}/>
                        {
                            popularPosts.length > 0 &&
                            <>
                                <Typography.CardText type="large" weight="bold" margin="59px 0 30px 0">Лучшее за неделю</Typography.CardText>
                                {
                                    popularPosts.map((item, index)=> {
                                        if ( item.post.slug ===  slug ) return null;
                                        return (
                                            <React.Fragment key={index}>
                                                <Box mb="48px">
                                                    <Cards.Mini heading={item.post.rubric.title} cover={item.post.cover} slug={item.post.slug}>
                                                        {item.post.title}
                                                    </Cards.Mini>
                                                </Box>
                                            </React.Fragment>
                                        );

                                    })

                                }
                            </>
                        }
                    </Box>
                }

            </Flex>

        </Containers.Default>
        </>
    );

};


class Post extends React.Component{
    static async getInitialProps({ query: { postSlug, amp }, store, isServer, pathname, req, res }) {
        let current_post = null;
        let readMoreLinks = [];
        let popularPosts = [];


        //todo Add some logged client Id
        await Public.getPost(postSlug)
            .then(response=>{
                if (response.data.length > 0){
                    current_post = response.data[0];
                }
            }).catch(reason => {
                console.log(reason)
            });

        if ( current_post === null ){
            if (req) {
                res.writeHead(302, { Location: `${OLD_SITE_URL}/${postSlug}` });
                res.end();
            }
            return {
                error: 404
            }
        }

        let clientIp = null
        if (req != null ){
            clientIp = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
                req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            await Public.viewPost(current_post.rating.id, clientIp)
                //.then(response=> console.log("View ", clientIp, response.data.views))
                .catch(reason => console.log("View", reason));
        }
        await Public.getReadMore(current_post.rubric.id, current_post.id)
            .then(response=>{
                if ( response.data.posts !== null && response.data.posts.length > 0 ){
                    readMoreLinks = response.data.posts;
                }
            })
            .catch(reason => {
                console.log(reason);
            })

        await Public.getPopularDuringWeek()
            .then(response=> {
                if ( response.data !== null && response.data.length > 0 ){
                    popularPosts = response.data;
                }
            })
            .catch(reason=> {
                console.log(reason)
            });

        return {
            error: current_post != null ? null : 404,
            current_post,
            readMoreLinks,
            popularPosts,
            clientIp,
            postId: current_post.id,
            store,
            amp: amp
        }
    }

    render(){
        const { error, current_post, theme, width, popularPosts } = this.props;

        if (error !== null){
            return <Error statusCode={error}/>;
        }

        // TODO AMP Checking
        // TODO Use this.props.user for head component

        try {
            return (
                <>
                    <PostComponents.Seo post={current_post}/>
                    {
                        current_post.rubric.infinityScroll
                            ? <PostCompilation.Infinity post={current_post}/>
                            : <RegularPost data={data} theme={theme}/>
                    }
                </>
            );
        }catch (e) {
            console.log("ERROR", e)
            return <Error statusCode={404}/>
        }

    }
}

function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(withTheme(Post));