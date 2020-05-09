import React from 'react';
import { NextSeo } from 'next-seo';
import Error from '../_error';
import { Public } from '../../api';
import { Flex, Box } from 'rebass';
import {SITE_URL} from "../../constants";
import {Images, Typography, Containers, Form} from "../../components";
import {Emoji} from "emoji-mart";
import { withTheme } from 'styled-components';
import {CategoryLine, CompsBannerAd, PostsWithAd} from "../../compilations";
import InfiniteScroll from "react-infinite-scroll-component";

function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

class Rubric extends React.Component {
    static async getInitialProps({ query: { rubricSlug } }) {
        let rubric_id = null;
        await Public.fetchRubrics(['slug', 'id'])
            .then(response => {
                response.data.rubrics.map(rubric =>{
                    if (rubric.slug === rubricSlug){
                        rubric_id = rubric.id;
                    }
                });
            })
            .catch(reason => {
                // TODO Add Reason processing
            });

        let rubric = null;
        if (rubric_id != null){
            await Public.getRubric(rubric_id)
                .then(response => {
                    rubric = response.data;
                })
                .catch(reason=>{
                    console.log(reason);
                    // TODO Add Reason processing
                });
        }


        let prevBlocks = [];
        let start = 0;
        let uid = 2;
        let items = [];
        for (let i = 0; i < 4; i++){
            let limit = randomChoice([1, 4, 6, 8]);
            while (prevBlocks.length > 0 && prevBlocks[prevBlocks.length - 1] === limit || (prevBlocks.length > 1 && prevBlocks[prevBlocks.length - 2] === limit)) {
                limit = randomChoice([1, 4, 6, 8]);
            }

            prevBlocks.push(limit);
            let posts = null;
            await Public.loadPosts( rubric_id, null, start, limit)
                .then(response => posts = response.data.posts)
                .catch(reason => console.log(reason));
            items.push({posts, uid})
            start += limit;
            uid += 1;
        }

        return { rubric, rubricSlug, prevBlocks, uid, start, items};
    }

    constructor(props){
        super(props);
        this.state = {
            prevBlocks: props.prevBlocks,
            items: [],
            uid: props.uid,
            start: props.start,
            hasMore: true
        }
        this.fetchMore = this.fetchMore.bind(this);
    }


    async fetchMore(){
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
                console.log()
            }
            prevBlocks.push(limit);
            let posts = null;
            await Public.loadPosts( this.props.rubric.id,null, start, limit)
                .then(response => posts = response.data.posts)
                .catch(reason => console.log(reason));


            if ( posts == null || posts.length === 0){
                this.setState({
                    hasMore: false
                })
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


    render() {
        // TODO Use this.props.user for head component
        const { rubric, rubricSlug, theme, items } = this.props;

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
                <Containers.Default>
                    <Flex justifyContent="center" m="88px 0 14px 0">
                        <Typography.Heading level={1} margin="auto 20px auto 0">{rubric.title}</Typography.Heading>
                        {
                            rubric.emoji &&
                            <Box my="auto">
                                <Emoji emoji={{ id: rubric.emoji }} size={48}/>
                            </Box>
                        }
                    </Flex>
                    {
                        ( rubric.subtitle != null && rubric.subtitle.length > 0 ) &&
                        <Flex justifyContent="center">
                            <Typography.Heading level={5} margin="auto 20px auto 0" color={theme.text.secondary}>{rubric.subtitle}</Typography.Heading>
                        </Flex>
                    }
                    {
                        items.map((item, index) =>
                            <React.Fragment key={index}>
                                <PostsWithAd posts={item.posts} uid={item.uid}/>
                            </React.Fragment>
                        )
                    }
                    <InfiniteScroll
                        dataLength={this.state.items.length}
                        next={this.fetchMore}
                        hasMore={this.state.hasMore}
                        loader={<Form.Loader/>}>
                        {this.state.items}
                    </InfiniteScroll>
                </Containers.Default>
            </>
        );
    }
}


export default withTheme(Rubric);