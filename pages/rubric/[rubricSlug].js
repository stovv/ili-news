import React from 'react';
import { NextSeo } from 'next-seo';
import Error from '../error__';
import { Public } from '../../api';
import { Flex, Box } from 'rebass';
import {SITE_URL} from "../../constants";
import {Images, Typography, Containers, Form, Cards, Links} from "../../components";
import {Emoji} from "emoji-mart";
import { withTheme } from 'styled-components';
import {CategoryLine, CompsBannerAd, PostsWithAd} from "../../compilations";
import InfiniteScroll from "react-infinite-scroll-component";
import {CardText} from "../../components/Typography";
import {PostLink} from "../../components/Links.react";
import {connect} from "react-redux";
import {changeInfinityState} from "../../store/commonActions.react";

function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

const isYesterday = (date) => {
    let yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();
};

function TimeString(date){
    let postDate = new Date(date);
    var options = { minute: '2-digit', hour: '2-digit' };
    return postDate.toLocaleString("ru-RU", options).replace('г.', '');
}

function isEqualDate(date, otherDate){
    const dateL = new Date(date);
    const dateR = new Date(otherDate);
    return dateL.getDate() === dateR.getDate() &&
        dateL.getMonth() === dateR.getMonth() &&
        dateL.getFullYear() === dateR.getFullYear();
}

function DateSting( date ){
    let postDate = new Date(date);
    if (isToday(postDate)){
        return "Cегодня";
    }else if (isYesterday(postDate)){
        return "Вчера"
    }
    var options = { month: 'long', day: 'numeric' };
    return postDate.toLocaleString("ru-RU", options).replace('г.', '');
}



class Rubric extends React.Component {
    static async getInitialProps({ query: { rubricSlug } }) {
        let rubric = null;
        await Public.getRubric(rubricSlug)
            .then((response)=>{
                if ( response.data.length > 0 ){
                    rubric = response.data[0]
                }
            })

        let popularPosts = [];
        if ( rubric !== null && !rubric.cover ){
            await Public.getPopularDuringWeek()
                .then(response=> popularPosts = response.data)
                .catch(reason=> console.log("LOAD POPULAR", reason));
        }

        let postsCount = 0;
        if ( rubric !== null ){
            await Public.getPostCountInRubric(rubric.id)
                .then(response=> postsCount = response.data);
        }


        let prevBlocks = [];
        let start = 0;
        let uid = 2;
        let items = [];
        let loadedPostsCount = 0;
        for (let i = 0; i < 4; i++){
            let limit = randomChoice([1, 4, 6, 8]);
            while (prevBlocks.length > 0 && prevBlocks[prevBlocks.length - 1] === limit || (prevBlocks.length > 1 && prevBlocks[prevBlocks.length - 2] === limit)) {
                limit = randomChoice([1, 4, 6, 8]);
            }

            prevBlocks.push(limit);
            let posts = null;
            if ( rubric !== null ){
                await Public.loadPosts( rubric.id, null, start, limit, null)
                    .then(response => {
                        loadedPostsCount += response.data.posts.length;
                        posts = response.data.posts;
                    })
                    .catch(reason => console.log("LOAD POSTS", reason));
            }
            items.push({posts, uid})
            start += limit;
            uid += 1;
        }

        return { rubric, rubricSlug, prevBlocks, uid, start, items, popularPosts, loadedPostsCount, postsCount};
    }

    constructor(props){
        super(props);
        this.state = {
            prevBlocks: props.prevBlocks,
            items: [],
            uid: props.uid,
            latestDate: null,
            start: props.start,
            hasMore: props.loadedPostsCount < props.postsCount
        }
        this.fetchMoreWithCover = this.fetchMoreWithCover.bind(this);
        this.fetchMoreWithoutCover = this.fetchMoreWithoutCover.bind(this);
        props.dispatch(changeInfinityState(false))
    }


    async fetchMoreWithCover(){
        let items = [];
        let start = this.state.start;
        let prevBlocks = this.state.prevBlocks;
        if ( prevBlocks.length > 5 ){
            prevBlocks = prevBlocks.slice(-4);
        }

        for (let i = 0; i < 4; i++){
            let limit = randomChoice([1, 4, 6, 8]);

            while (prevBlocks[prevBlocks.length - 1] === limit || (prevBlocks.length > 1 && prevBlocks[prevBlocks.length - 2] === limit)) {
                limit = randomChoice([1, 4, 6, 8]);
            }
            prevBlocks.push(limit);
            let posts = null;
            await Public.loadPosts( this.props.rubric.id,null, start, limit, null)
                .then(response => posts = response.data.posts)
                .catch(reason => console.log(reason));


            if ( posts == null || posts.length === 0){
                this.setState({
                    hasMore: false
                })
                this.props.dispatch(changeInfinityState(false))
                return;
            }
            items.push(<PostsWithAd posts={posts} uid={this.state.uid}/>)
            start += limit;
            this.state.uid += 1;
        }

        this.setState({
            items: this.state.items.concat([
                items
            ]),
            start,
            prevBlocks,
        })
    }


    async fetchMoreWithoutCover(){

        const { theme, width } = this.props;

        let items = [];
        let start = this.state.start;
        let prevBlocks = this.state.prevBlocks;
        if ( prevBlocks.length > 5 ){
            prevBlocks = prevBlocks.slice(-4);
        }

        let limit = 16;
        let posts = null;
        await Public.loadPosts( this.props.rubric.id,null, start, limit, null)
            .then(response => posts = response.data.posts)
            .catch(reason => console.log(reason));


        if ( posts == null || posts.length === 0){
            this.setState({
                hasMore: false
            })
            this.props.dispatch(changeInfinityState(false))
            return;
        }

        items.push(
            posts.map((post, index)=>{
                let dateHeading = null;
                if (this.state.latestDate === null || !isEqualDate(this.state.latestDate, post.publish_at)){
                    dateHeading = (
                        <Typography.Heading color={theme.text.hover} margin={`${this.state.latestDate === null ? "32px" : "85px"} 0 40px auto`}
                                            level={width > 1023 ? 2 : 3}>{DateSting(post.publish_at)}</Typography.Heading>
                    );
                    this.state.latestDate = post.publish_at;
                }
                return (
                    <React.Fragment key={index}>
                        {
                            width > 1023
                                ? <>
                                    {dateHeading}
                                    <Flex mb="30px">
                                        <Typography.CardText margin="0 35px auto 0" type="xlarge" color={theme.text.primary}>{TimeString(post.publish_at)}</Typography.CardText>
                                        <PostLink postSlug={post.slug}>
                                            <Typography.CardText hover margin="auto 0 auto 0" type="large" color={theme.text.secondary}>{post.title}</Typography.CardText>
                                        </PostLink>
                                    </Flex>
                                </>
                                : <>
                                    {dateHeading}
                                    <Flex mb="30px">
                                        <Typography.CardText margin={"0 10px auto 0"} type="normal" color={theme.text.primary}>{TimeString(post.publish_at)}</Typography.CardText>
                                        <PostLink postSlug={post.slug}>
                                            <Typography.CardText hover wrap margin="auto 0 auto 0" type="normal" color={theme.text.secondary}>{post.title}</Typography.CardText>
                                        </PostLink>
                                    </Flex>
                                </>
                        }
                    </React.Fragment>
                );
            })
        );

        start += limit;
        this.setState({
            items: this.state.items.concat([
                items
            ]),
            start,
        })
    }

    render() {
        // TODO Use this.props.user for head component
        let empty = true;
        const { rubric, rubricSlug, theme, items, width, popularPosts } = this.props;
        if (rubric === null){
            return (<Error statusCode={404}/>);
        }

        return (
            <>
                <NextSeo title={rubric.title}
                     description={rubric.subtitle}
                     canonical={`${SITE_URL}/rubric/${rubricSlug}`}
                     openGraph={{
                         url: `${SITE_URL}/rubric/${rubricSlug}`,
                         locale: 'ru_RU',
                         type: "website",
                         title: rubric.title,
                         description: rubric.subtitle,
                         site_name: 'Молодежный журнал ИЛИ'
                     }}
                     twitter={{
                         handle: '@handle',
                         site: '@site',
                         cardType: 'summary_large_image',
                     }}/>

                {
                    width > 1023
                        ?
                        <>
                            <Flex justifyContent="center" m="88px 0 14px 0">
                                <Typography.Heading level={1} margin="auto 20px auto 0">{rubric.title}</Typography.Heading>
                                {
                                    rubric.emoji &&
                                    <Box my="auto">
                                        <Emoji emoji={{id: rubric.emoji}} size={48}/>
                                    </Box>
                                }
                            </Flex>
                            {
                                (rubric.subtitle != null && rubric.subtitle.length > 0) &&
                                <Flex justifyContent="center">
                                    <Typography.Heading level={5} margin={`auto 20px auto 0`} textAlign="center"
                                                        color={theme.text.secondary}>{rubric.subtitle}</Typography.Heading>
                                </Flex>
                            }
                        </>
                        :
                        <Flex justifyContent="center" m="20px 0 0 0">
                            <Box>
                                {
                                    rubric.emoji &&
                                    <Flex justifyContent="center" mb="10px">
                                        <Emoji emoji={{id: rubric.emoji}} size={48}/>
                                    </Flex>
                                }
                                <Typography.Heading level={4} margin="auto 0 5px 0" textAlign="center">{rubric.title}</Typography.Heading>
                                {
                                    (rubric.subtitle != null && rubric.subtitle.length > 0) &&
                                    <Flex justifyContent="center">
                                        <Typography.Heading level={6} margin={`0 auto`} textAlign="center"
                                                            color={theme.text.secondary}>{rubric.subtitle}</Typography.Heading>
                                    </Flex>
                                }
                            </Box>
                        </Flex>
                }
                {
                    rubric.cover
                        ? <>
                            <Containers.Default mt={'52px'}>
                                {
                                    items.map((item, index) => {
                                        if (item.posts.length > 0) {
                                            empty = false;
                                        }
                                        return (
                                            <React.Fragment key={index}>
                                                <PostsWithAd posts={item.posts} uid={item.uid} mobileAdId="R-A-351229-6"/>
                                            </React.Fragment>
                                        );
                                    })
                                }
                                <InfiniteScroll
                                    dataLength={this.state.items.length}
                                    next={this.fetchMoreWithCover}
                                    hasMore={!empty && this.state.hasMore}
                                    loader={<Form.Loader/>}>
                                    {this.state.items}
                                </InfiniteScroll>
                            </Containers.Default>
                        </>
                        : <>
                            {
                                width > 1023
                                    ? <Containers.Default>
                                        <Flex heigth={"300px"} mt="50px">
                                            <Box width={[9/12]} pr={["10%"]} >
                                                {
                                                    items.map(item=>Object.values(item.posts).map((post, index)=>{
                                                        empty = false;
                                                        let dateHeading = null;
                                                        if (this.state.latestDate === null || !isEqualDate(this.state.latestDate, post.publish_at)){
                                                            dateHeading = (
                                                                <Typography.Heading color={theme.text.hover} margin={`${this.state.latestDate === null ? "32px" : "85px"} 0 40px auto`}
                                                                                    level={2}>{DateSting(post.publish_at)}</Typography.Heading>
                                                            );
                                                            this.state.latestDate = post.publish_at;
                                                        }

                                                        return (
                                                            <React.Fragment key={index}>
                                                                {dateHeading}
                                                                <Flex mb="30px">
                                                                    <Typography.CardText margin={"0 35px auto 0"} type="xlarge" color={theme.text.primary}>{TimeString(post.publish_at)}</Typography.CardText>
                                                                    <PostLink postSlug={post.slug}>
                                                                        <Typography.CardText hover margin="auto 0 auto 0" type="large" color={theme.text.secondary}>{post.title}</Typography.CardText>
                                                                    </PostLink>
                                                                </Flex>
                                                            </React.Fragment>
                                                        );
                                                    }))
                                                }
                                                <InfiniteScroll
                                                    dataLength={this.state.items.length}
                                                    next={this.fetchMoreWithoutCover}
                                                    hasMore={!empty && this.state.hasMore}
                                                    loader={<Form.Loader/>}>
                                                    {this.state.items}
                                                </InfiniteScroll>
                                            </Box>
                                            <Box width={[3/12]} pl={["2%"]} height="max-content" sx={{
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
                                        </Flex>
                                    </Containers.Default>
                                    : <Containers.Mini>
                                        {
                                            items.map(item=>Object.values(item.posts).map((post, index)=>{
                                                empty = false;
                                                let dateHeading = null;
                                                if (this.state.latestDate === null || !isEqualDate(this.state.latestDate, post.publish_at)){
                                                    dateHeading = (
                                                        <Typography.Heading color={theme.text.hover} margin={`${this.state.latestDate === null ? "32px" : "85px"} 0 40px auto`}
                                                                            level={3}>{DateSting(post.publish_at)}</Typography.Heading>
                                                    );
                                                    this.state.latestDate = post.publish_at;
                                                }

                                                return (
                                                    <React.Fragment key={index}>
                                                        {dateHeading}
                                                        <Flex mb="30px">
                                                            <Typography.CardText margin={"0 10px auto 0"} type="normal" color={theme.text.primary}>{TimeString(post.publish_at)}</Typography.CardText>
                                                            <PostLink postSlug={post.slug}>
                                                                <Typography.CardText hover wrap margin="auto 0 auto 0" type="normal" color={theme.text.secondary}>{post.title}</Typography.CardText>
                                                            </PostLink>
                                                        </Flex>
                                                    </React.Fragment>
                                                );
                                            }))
                                        }
                                        <InfiniteScroll
                                            dataLength={this.state.items.length}
                                            next={this.fetchMoreWithoutCover}
                                            hasMore={!empty && this.state.hasMore}
                                            loader={<Form.Loader/>}>
                                            {this.state.items}
                                        </InfiniteScroll>
                                    </Containers.Mini>
                            }
                        </>
                }
            </>
        );
    }
}


function mapStateToProps(state){
    return {
        user: state.auth.user,
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(withTheme(Rubric));