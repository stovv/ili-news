import React from 'react';
import Router from 'next/router';
import Moment from "react-moment";
import { NextSeo } from 'next-seo';
import { Flex, Box } from 'rebass';
import { connect } from "react-redux";
import styled from 'styled-components';
import YandexShare from 'react-yandex-share';
import { withTheme } from 'styled-components';
import InfiniteScroll from "react-infinite-scroll-component";

import Error from './error__';
import { Public } from '../api';
import { Icons } from '../assets';
import { SITE_URL } from '../constants';
import { saveIpAction } from '../store/authActions.react';
import { getFormatedDate } from '../tools';
import { UniversalBlock, Containers, Typography, Images, Cards, Form, Blocks } from '../components';


export const config = { amp: 'hybrid' };

const iconSpacing = {
    margin: "auto 9px"
};

const Divider = styled.div`
    background: ${props => props.theme.colors.backgroundInvert};
    height: 2px;
    width: 100%;
    margin: 0 auto; 
    
    @media screen and (max-width: 1023px){
      width: 80%;
    }
`;

const EventDateWrapper = styled.div`
     border-right: ${ props=> props.mini ? '2px' : '4px' } solid ${props=> props.theme.colors.primary};
     padding: 10px 0;
     margin-right: ${ props=> props.mini ? '18px' : '46px' };
     margin-top: auto;
     margin-bottom: auto;
`;

const InfinityPost = ({data, theme}) => {

    const { width, rubric, title, publishedDate, clientIp, authors, theme: postTheme,
        blocks:{ blocks }, cover, rating, commentThread} = data;

    return (
        <>
            {
                width > 1023
                    ?
                    <>
                        <Typography.Heading level={4} color={theme.text.hover} textTransform="lowercase"
                                            margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.title}</Typography.Heading>
                        <Typography.Heading level={1} breakWord
                                            margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                    </>
                    :
                    <>
                        <Typography.Heading level={5} color={theme.text.hover} textTransform="lowercase"
                                            margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.title}</Typography.Heading>
                        <Typography.Heading level={3} breakWord margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                    </>
            }
            {
                rubric.cover && <Images.Lazy cover={cover} width="100%" height={width > 1023 ? "560px" : "229px"}/>
            }
            <Flex mb={["64px"]}>
                <Typography.Heading margin={`auto 0 auto 0`} level={4} color={theme.text.secondary}>{publishedDate}</Typography.Heading>
                <Form.AuthorList authors={authors}/>
                <Box  my="auto" ml="auto">
                    <YandexShare
                        content={{ title }}
                        theme={{ lang: 'ru', limit: 3, size: "m", popupPosition: "outer",
                            services: 'vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram' }}
                    />
                </Box>
            </Flex>
            {
                blocks.map((item, index)=>
                    <React.Fragment key={index}>
                        <UniversalBlock block={item}/>
                    </React.Fragment>
                )
            }
            <Flex mt={["71px"]} mb={["47px"]} mx={["4px", "26px"]}>
                <Box mr="auto" display="flex">
                    <Form.LikeBar rating={rating} clientId={clientIp}/>
                    <Form.Comments threadId={commentThread.id}/>
                </Box>
                <Box ml="auto">
                    <Flex my="auto">
                        <Form.Bookmark/>
                        <Icons.EyeIcon style={iconSpacing}/>
                        <Typography.CardText margin="0" type="normal" color={theme.text.secondary}>
                            {rating.views}
                        </Typography.CardText>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}


const RegularPost = ({data, theme}) => {
    const { postId, width, rubric, title, publishedDate, popularPosts, clientIp, authors, dispatch,
        blocks:{ blocks }, cover, rating, commentThread, readMoreLinks, event_date} = data;

    // TODO Remove it after beta release
    const { isLoggedIn } = data;

    return (
        <Containers.Default>
            {
                width > 1023
                    ?
                    <>
                        <Typography.Heading level={4} color={theme.text.hover}
                                            margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.title}</Typography.Heading>
                        <Flex>
                            {
                                ( rubric.withEventDate && event_date ) && <>
                                    <EventDateWrapper>
                                        <Typography.Common type={'mega'} margin={'0 10px 0 0'} textAlign="center">
                                            <Moment locale="ru" format="DD">{event_date}</Moment>
                                        </Typography.Common>
                                        <Typography.Common type={'regular'} margin={'0 10px 0 0'} textAlign="center">
                                            <Moment locale="ru" format="MMM">{event_date}</Moment>
                                        </Typography.Common>
                                    </EventDateWrapper>
                                </>
                            }
                            <Typography.Heading level={1} breakWord maxWidth="80%"
                                                margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                        </Flex>
                    </>
                    :
                    <>
                        <Typography.Heading level={5} color={theme.text.hover} textTransform="lowercase"
                                            margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.title}</Typography.Heading>
                        <Flex>
                            {
                                ( rubric.withEventDate && event_date ) && <>
                                    <EventDateWrapper mini>
                                        <Typography.Heading level={1} margin={'0 10px 0 0'} textAlign="center">
                                            <Moment locale="ru" format="DD">{event_date}</Moment>
                                        </Typography.Heading>
                                        <Typography.Heading level={3} margin={'0 10px 0 0'} textAlign="center">
                                            <Moment locale="ru" format="MMM">{event_date}</Moment>
                                        </Typography.Heading>
                                    </EventDateWrapper>
                                </>
                            }
                            <Typography.Heading level={3} breakWord margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                        </Flex>
                    </>
            }
            <Flex mb={theme.spacing.m}>
                <Typography.Heading margin={`auto 0 auto 0`} level={4} color={theme.text.secondary}>{publishedDate}</Typography.Heading>
                <Form.AuthorList authors={authors}/>
                <Box  my="auto" ml="auto">
                    <YandexShare
                        content={{ title }}
                        theme={{ lang: 'ru', limit: 3, size: "m", popupPosition: "outer",
                            services: 'vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram' }}
                    />
                </Box>

            </Flex>
            {
                rubric.cover && <Images.Lazy cover={cover} width="100%" height={width > 1023 ? "560px" : "229px"}/>
            }
            <Flex mt={["54px"]}>
                <Box width={width > 1023 ? [9/12] : '100%' } pr={width > 1023 ? ["10%"] : '0'}>
                    {
                        blocks.map((item, index)=>
                            <React.Fragment key={index}>
                                <UniversalBlock block={item}/>
                            </React.Fragment>
                        )
                    }
                    <Flex mt={["71px"]} mb={["47px"]} mx={["4px", "26px"]}>
                        <Box mr="auto" display="flex">
                            <Form.LikeBar rating={rating} clientId={clientIp}/>
                            <Form.Comments threadId={commentThread.id}/>
                        </Box>
                        <Box ml="auto">
                            <Flex my="auto">
                                <Form.Bookmark/>
                                <Icons.EyeIcon style={iconSpacing}/>
                                <Typography.CardText margin="0" type="normal" color={theme.text.secondary}>
                                    {rating.views}
                                </Typography.CardText>
                            </Flex>
                        </Box>
                    </Flex>
                    {/*<Blocks.ReadMore post data={readMoreLinks}/>*/}
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
                                    popularPosts.slice(0, 4).map((item, index)=>
                                        <React.Fragment key={index}>
                                            <Box mb="48px">
                                                <Cards.Mini heading={item.post.rubric.title} cover={item.post.cover} id={item.post.id}>
                                                    {item.post.title}
                                                </Cards.Mini>
                                            </Box>
                                        </React.Fragment>
                                    )

                                }
                            </>
                        }
                    </Box>
                }

            </Flex>

        </Containers.Default>
    );

};


class Post extends React.Component{
    static async getInitialProps({ query: { postSlug, amp }, store, isServer, pathname, req }) {
        let current_post = null;
        let readMoreLinks = [];
        let popularPosts = [];
        if (store.getState().auth.ip.length === 0 && req != null){
            const clientIp = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
                req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            await store.dispatch(saveIpAction(clientIp));
        }

        //todo Add some logged client Id
        await Public.getPost(postSlug)
            .then(response=>{
                if (response.data.length > 0){
                    current_post = response.data[0];
                }
            });

        if ( current_post === null ){
            return {
                error: 404
            }
        }

        await Public.viewPost(current_post.rating.id, store.getState().auth.ip);
        await Public.getReadMore(current_post.rubric.id, current_post.id)
            .then(response=>{
                if ( response.data.ratings !== null && response.data.ratings.length > 0 ){
                    readMoreLinks = response.data.ratings;
                }
            })
            .catch(reason => {
                console.log(reason);
            })

        await Public.getPopularDuringWeek()
            .then(response=> {
                if ( response.data.ratings !== null && response.data.ratings.length > 0 ){
                    popularPosts = response.data.ratings;
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
            clientIp: store.getState().auth.ip,
            postId: current_post.id,
            store,
            amp: amp
        }
    }

    constructor(props){
        super(props);
        this.state = {
            hasMore: true,
            start: 0,
            skipPostIds: [ props.postId ],
            items: []
        }
        this.fetchMore = this.fetchMore.bind(this);
    }

    async fetchMore(){
        const { theme, width } = this.props;
        const { rubric, publish_at } = this.props.current_post;

        let items = [];

        let posts = [];
        await Public.loadPosts( rubric.id, null, this.state.start, 1, this.state.skipPostIds)
            .then(response => posts = response.data.posts)
            .catch(reason => console.log(reason));


        if ( posts == null || posts.length === 0){
            this.setState({
                hasMore: false
            })
            return;
        }

        let current_post = posts[0];
        const data = {
            ...this.props,
            ...current_post,
            publishedDate: getFormatedDate(publish_at)
        };

        items.push(
            <>
                <Flex justifyContent="center" my="108px">
                    <Box width="432px" height="10px">
                        <Divider/>
                    </Box>
                </Flex>
                <InfinityPost data={data} theme={theme}/>
            </>
        );

        this.setState({
            items: this.state.items.concat([
                items
            ]),
            start: this.state.start + 1,
        })
    }


    render(){
        const { amp, error, current_post, postId, theme, store, width, popularPosts } = this.props;

        if (error !== null){
            return <Error statusCode={error}/>;
        }
        const { rubric, title, description, publish_at, authors, updated_at, cover } = current_post;
        const data = {
            ...this.props,
            ...current_post,
            publishedDate: getFormatedDate(publish_at)
        };

        let authorsLinks = [];
        authors.map(item=>{
            authorsLinks.push(`${SITE_URL}/user/${item.id}`);
        });
        // TODO AMP Checking
        // TODO Use this.props.user for head component


        try {
            return (
                <>
                    <NextSeo title={title}
                             description={description}
                             canonical={`${SITE_URL}/post/${postId}`}
                             openGraph={{
                                 url: `${SITE_URL}/post/${postId}`,
                                 locale: 'ru_RU',
                                 type: "article",
                                 title: title,
                                 description: description,
                                 images: [
                                     {
                                         url: Images.Tools.getImageLink(cover)['url'],
                                         width: cover.width,
                                         height: cover.height,
                                     }
                                 ],
                                 site_name: 'Молодежный журнал ИЛИ',
                                 article: {
                                     section: rubric.slug,
                                     publishedTime: publish_at || new Date(),
                                     modifiedTime: updated_at || new Date(),
                                     authors: authorsLinks,
                                     // TODO Add meta tags
                                     tags: []
                                 }
                             }}
                             twitter={{
                                 handle: '@handle',
                                 site: '@site',
                                 cardType: 'summary_large_image',
                             }}/>

                    {
                        data.rubric.infinityScroll ?
                            <Containers.Default>
                                <Flex>
                                    <Box width={width > 1023 ? [9/12] : '100%' } pr={width > 1023 ? ["10%"] : '0'}>
                                        <InfinityPost data={data} theme={theme}/>
                                        <InfiniteScroll
                                            dataLength={this.state.items.length}
                                            next={this.fetchMore}
                                            hasMore={this.state.hasMore}
                                            loader={<Form.Loader/>}>
                                            {this.state.items}
                                        </InfiniteScroll>
                                    </Box>
                                    {
                                        width > 1023
                                        && <Box width={[3/12]} pl={["2%"]} >
                                            <Box sx={{
                                                position: "sticky",
                                                top: "20px"
                                            }}>
                                                <Form.AdBlock id={'R-A-351229-6'} width={["100%"]} height={["584px"]}/>
                                                {
                                                    popularPosts.length > 0 &&
                                                    <>
                                                        <Typography.CardText type="large" weight="bold" margin="59px 0 30px 0">Лучшее за неделю</Typography.CardText>
                                                        {
                                                            popularPosts.slice(0, 4).map((item, index)=>
                                                                <React.Fragment key={index}>
                                                                    <Box mb="48px">
                                                                        <Cards.Mini heading={item.post.rubric.title} cover={item.post.cover} id={item.post.id}>
                                                                            {item.post.title}
                                                                        </Cards.Mini>
                                                                    </Box>
                                                                </React.Fragment>
                                                            )

                                                        }
                                                    </>
                                                }
                                            </Box>
                                        </Box>
                                    }
                                </Flex>
                            </Containers.Default>
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
        user: state.auth.user,
        width: state.common.pageSize.width,
        isLoggedIn: state.auth.isLoggedIn
    }
}


export default connect(mapStateToProps)(withTheme(Post));