import React from 'react';
import Head from 'next/head';
import ScriptTag from 'react-script-tag';
import { connect } from "react-redux";
import { withTheme } from 'styled-components';
import { NextSeo } from 'next-seo';
import { Flex, Box } from 'rebass';
import YandexShare from 'react-yandex-share';


import Error from '../../_error';
import {UniversalBlock, Containers, Typography, Images, Cards, Form, PostComponents, Links} from '../../../components';
import { Icons } from '../../../assets';
import { Public } from '../../../api';
import { getFormatedDate } from '../../../tools';
import {SITE_URL, YANDEX_VERIFICATION} from '../../../constants';


export const config = { amp: 'hybrid' };

class Post extends React.Component{
    static async getInitialProps({ query: { postId, amp }, store, isServer, pathname, req}) {
        let current_post = null;
        let readMoreLinks = null;
        let popularPosts = null;

        const clientIp = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
            req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

        //todo Add some logged client Id
        await Public.getPost(postId)
            .then(response=>current_post = response.data.post)
            .catch(reason=>{
                //TODO Add Toast
                console.log(reason);
            });

        await Public.viewPost(current_post.rating.id, clientIp);

        await Public.getReadMore(current_post.rubric.id)
            .then(response=>readMoreLinks = response.data.ratings)
            .catch(reason => {
                console.log(reason);
            })

        await Public.getPopularDuringWeek()
            .then(response=> popularPosts = response.data.ratings)
            .catch(reason=> console.log(reason));


        return {
            error: current_post ? null : 404,
            current_post,
            readMoreLinks,
            popularPosts,
            clientIp,
            postId,
            amp: amp
        }
    }

    shouldComponentUpdate(nextProps){
        //return nextProps.postId !== this.props.postId;
    }

    componentDidMount(){
        const yaDiv = document.createElement('div')
        yaDiv.setAttribute('id', 'yandex_rtb_R-A-351229-6"')
        document.body.appendChild(yaDiv)
        const yaScript = document.createElement('script')
        yaScript.setAttribute('type', 'text/javascript')
        yaScript.innerHTML = `(function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
            console.log("Hello");
            Ya.Context.AdvManager.render({
                blockId: "R-A-351229-6",
                renderTo: "yandex_rtb_R-A-351229-6",
                async: true
            });
        });
        t = d.getElementsByTagName("script")[0];
        s = d.createElement("script");
        s.type = "text/javascript";
        s.src = "//an.yandex.ru/system/context.js";
        s.async = true;
        t.parentNode.insertBefore(s, t);
    })(this, this.document, "yandexContextAsyncCallbacks");`
        document.head.appendChild(yaScript)
    }

    render(){
        const {amp, error, current_post, postId, theme, readMoreLinks, popularPosts, clientIp } = this.props;

        if (error !== null){
            return <Error statusCode={error}/>;
        }
        // TODO AMP Checking
        // TODO Use this.props.user for head component
        const {rubric, title, description, publish_at, authors, updated_at,
               cover, blocks:{blocks }, comment_thread, rating} = current_post;

        const publishedDate = getFormatedDate(publish_at);
        let authorsLinks = [];
        authors.map(item=>{
            authorsLinks.push(`${SITE_URL}/user/${item.id}`);
        });

        const iconSpacing = {
            margin: "auto 9px"
        }

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
                                 image: {
                                     url: Images.Tools.geImageLink(cover),
                                     width: cover.width,
                                     height: cover.height,
                                 },
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
                     <Head>
                         <meta name="yandex-verification" content={YANDEX_VERIFICATION} />
                     </Head>
                    <Containers.Default>
                        <Typography.Heading level={4} color={theme.text.hover}
                                            margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.slug}</Typography.Heading>
                        <Typography.Heading level={1} breakWord maxWidth="80%"
                                            margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                        <Flex>
                            <Typography.Heading margin={`0 0 ${theme.spacing.m} 0`} level={4} color={theme.text.secondary}>{publishedDate}</Typography.Heading>
                            <Form.AuthorList authors={authors}/>
                            <Box  my="auto" ml="auto">
                                <YandexShare
                                    content={{ title }}
                                    theme={{ lang: 'ru', limit: 3, size: "m", popupPosition: "outer",
                                        services: 'vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram' }}
                                />
                            </Box>
                        </Flex>
                        <Images.Lazy cover={cover} width="100%" height="560px"/>

                        <Flex mt={["64px"]} >
                            <Box width={[9/12]} >
                                {
                                    blocks.map((item, index)=>
                                        <React.Fragment key={index}>
                                            <UniversalBlock block={item}/>
                                        </React.Fragment>
                                    )
                                }
                                <Flex mt={["71px"]} mb={["47px"]} mx={["26px"]}>
                                    <Box mr="auto" display="flex">
                                        <Form.LikeBar rating={rating} clientId={clientIp}/>
                                        <Form.Comments threadId={comment_thread.id}/>
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
                                <PostComponents.ReadMore post data={readMoreLinks}/>
                            </Box>
                            <Box width={[3/12]} pl={["2%"]}>
                                {/* TODO ADD Ads*/}
                                <Box  width={["100%"]} height={["584px"]} bg={theme.colors.backgroundInvert}>
                                    <div id="yandex_rtb_R-A-351229-6" >

                                    </div>
                                </Box>
                                {
                                    popularPosts.length > 0 &&
                                    <>
                                        <Typography.CardText type="large" weight="bold" margin="59px 0 30px 0">Лучшее за неделю</Typography.CardText>
                                        {
                                            popularPosts.slice(0, 4).map((item, index)=>
                                            <React.Fragment key={index}>
                                            <Box mb="48px">
                                            <Cards.Mini heading={item.post.rubric.title} cover={item.post.cover}
                                            link={Links.PostLink} postId={item.post.id}>
                                            {item.post.title}
                                            </Cards.Mini>
                                            </Box>
                                            </React.Fragment>
                                            )

                                        }
                                    </>
                                }
                            </Box>
                        </Flex>

                    </Containers.Default>
                </>
            );
        }catch (e) {
            return <Error statusCode={404}/>
        }

    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withTheme(Post));
