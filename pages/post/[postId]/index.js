import React from 'react';

import { connect } from "react-redux";
import { withTheme } from 'styled-components';
import { NextSeo } from 'next-seo';
import {Flex, Box} from 'rebass';
import YandexShare from 'react-yandex-share';

import Error from '../../_error';
import {Public} from '../../../api';
import { UniversalBlock, Containers, Typography, Images, Cards} from '../../../components';

import {BACKEND_URL, SITE_URL} from '../../../constants';

import {Mocks} from '../../../assets';


export const config = { amp: 'hybrid' };

class Post extends React.Component{
    static async getInitialProps({ query: { postId, amp }, store, isServer, pathname, }) {
        var current_post = null;
        await Public.getPost(postId)
            .then(response=>{
                current_post = response.data;
            })
            .catch(reason=>{
                //TODO Add Toast
                console.log(reason);
            });

        let publichDate = current_post.publish_at || new Date();
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        const publish_at = publichDate.toLocaleString("ru-RU", options).replace('г.', '');

        return {
            error: current_post ? null : 404,
            publish_at,
            title : current_post.title,
            cover: `${current_post.cover.url}`,
            current_url: `${SITE_URL}/post/${postId}`,
            description: current_post.description,
            blocks: current_post.blocks.blocks,
            //meta_tags: current_post.meta_tags,
            rubric: current_post.rubric,
            authors: current_post.users ? current_post.users : [],
            amp: amp
        }
    }
    //shouldComponentUpdate(nextProps, nextState) {
        //return (nextProps.ids !== this.props.ids
        //    || nextProps.data !== this.props.data);
    //}

    render(){
        const {
            blocks, amp, error, title, theme, publish_at,
            current_url, description, rubric, cover
        } = this.props;
        
        if (error !== null){
            return <Error statusCode={error}/>;
        }
        // TODO AMP Checking
        // TODO Use this.props.user for head component
        return (
            <>
            <NextSeo title={title}
                     description={description}
                     canonical={SITE_URL}
                     openGraph={{
                         url: `${current_url}`,
                         locale: 'ru_RU',
                         type: "website",
                         title: title,
                         description: description,
                         images: [
                             { url: `${BACKEND_URL}${cover}` },
                         ],
                         site_name: 'Молодежный журнал ИЛИ',
                         article: {
                             // TODO: Add schedule post
                             publishedTime: new Date(),
                             modifiedTime: new Date(),
                             // TODO: Add authors links
                             authors: [
                                 'https://www.example.com/authors/@firstnameA-lastnameA',
                                 'https://www.example.com/authors/@firstnameB-lastnameB',
                             ],
                             // TODO Add meta tags
                             tags: []
                         }
                     }}
                     twitter={{
                         handle: '@handle',
                         site: '@site',
                         cardType: 'summary_large_image',
                     }}/>
            <Containers.Default>
                <Typography.Heading level={4} color={theme.text.hover}
                                    margin={`32px 0 ${theme.spacing.m} 0`}>{rubric.slug}</Typography.Heading>
                <Typography.Heading level={1} breakWord
                                    margin={`${theme.spacing.m} 0`}>{title}</Typography.Heading>
                <Flex>
                    <Typography.Heading margin={`0 0 ${theme.spacing.m} 0`} level={4} color={theme.text.secondary}>{publish_at}</Typography.Heading>
                    <Box  my="auto" ml="auto">
                        <YandexShare
                            content={{ title }}
                            theme={{ lang: 'ru', limit: 3, size: "m", popupPosition: "outer",
                                services: 'vkontakte,facebook,odnoklassniki,twitter,viber,whatsapp,telegram' }}
                        />
                    </Box>
                </Flex>
                <Images.Simple url={cover} width="100%" height="560px"/>

                <Flex mt={["64px"]}>
                    <Box width={[9/12]} >
                        {
                            blocks.map((item, index)=>
                                <React.Fragment key={index}>
                                    <UniversalBlock block={item}/>
                                </React.Fragment>
                            )
                        }
                    </Box>
                    <Box width={[3/12]} pl={["2%"]}>
                        {/* TODO ADD Ads*/}
                        <Box width={["100%"]} height={["584px"]} bg={theme.colors.backgroundInvert}/>
                        <Typography.CardText type="large" weight="bold" margin="59px 0 30px 0">Лучшее за неделю</Typography.CardText>
                        <Box>
                            <Cards.Mini heading="проект ломоносов" coverUrl={'/uploads/156d396b108c45dba51b844cc2bbac79.jpg'} >Побег из деревни: История Марии Константиновой</Cards.Mini>
                        </Box>
                    </Box>
                </Flex>

            </Containers.Default>
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withTheme(Post));
