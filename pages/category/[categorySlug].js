import React from 'react';
import dynamic from "next/dynamic";
//import { NextSeo } from 'next-seo';
import Error from '../error__';
import { fetchCategories, getCategory, fetchPostsCountInCategory, loadPosts } from '../../api/methods/public.react';
//import { Containers } from "../../components";

//CategoryLine, CompsBannerAd, TagBar

import { connect } from "react-redux";
const InfiniteScroll = dynamic(import("react-infinite-scroll-component"));
const Loader = dynamic(import("../../components/Forms/Loader.react"));
const Header = dynamic(import("../../components/Journal/Header"));
const Seo = dynamic(import("../../components/Seo/Category"));
const DefaultContainer = dynamic(import("../../components/Containers/Default"));
const Links = dynamic(import("../../components/Links.react"));
const PostsWithAd = dynamic(import("../../compilations/PostsWithAd.react"));


function randomChoice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

class Category extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            prevBlocks: props.prevBlocks,
            items: [],
            uid: props.uid ? props.uid : 10,
            start: props.start,
            hasMore: (props.start >= props.postsCount)
        }
        this.fetchMore = this.fetchMore.bind(this);
    }

    async fetchMore(){
        let items = [];
        let { postsCount } = this.props;
        let { start, prevBlocks } = this.state;

        if (start >= postsCount){
            this.setState({ hasMore: false })
        }

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
            await Public.loadPosts( null, this.props.category.id, start, limit, null)
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.categorySlug !== prevProps.categorySlug){
            console.log("UPDATE RUBRIC");
            this.setState({
                prevBlocks: this.props.prevBlocks,
                items: [],
                uid: this.props.uid ? this.props.uid : 10,
                start: this.props.start,
                hasMore: (this.props.start >= this.props.postsCount)
            });
        }
    }


    render() {
        // TODO Use this.props.user for head component
        const { category, items, width } = this.props;
        let empty = true;

        if (category === null){
            return (<Error statusCode={404}/>);
        }

        let tags = category.rubrics.map(rubric => ({
            text: rubric.title,
            link: Links.RubricLink,
            linkProps: {
                rubricSlug: rubric.slug
            }
        }));

        return (
            <>
                <Seo category={category}/>
                <Header title={category.title} tags={tags}/>
                <DefaultContainer mt={0}>
                    {
                        items.map((item, index) =>{
                            if ( item.posts.length > 0 ){
                                empty = false;
                            }
                            return <React.Fragment key={index}>
                                <PostsWithAd posts={item.posts} uid={item.uid} mobileAdId="R-A-351229-6"/>
                            </React.Fragment>
                        })
                    }
                    {
                        this.props.start < this.props.postsCount &&
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMore}
                            hasMore={!empty && this.state.hasMore}
                            loader={<Loader/>}>
                            {this.state.items}
                        </InfiniteScroll>
                    }
                </DefaultContainer>
            </>
        );
    }
}


function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}


export default connect(mapStateToProps)(Category);


Category.getInitialProps = async ({ query: { categorySlug } }) => {
    let category_id = null;
    await fetchCategories(['slug', 'id'])
        .then(response => {
            response.data.categories.map(category =>{
                if (category.slug === categorySlug){
                    category_id = category.id;
                }
            });
        })
        .catch(reason => {
            // TODO Add Reason processing
        });

    let category = null;
    let postsCount = 0;
    if (category_id != null){
        await getCategory(category_id)
            .then(response => {
                category = response.data;
            })
            .catch(reason=>{
                //console.log(reason);
                // TODO Add Reason processing
            });
        postsCount = await fetchPostsCountInCategory(category_id)
            .then(response=> response.data);
    }


    let prevBlocks = [];
    let start = 0;
    let uid = 2;
    let items = [];
    const moment = (await import('moment')).default()
    moment.locale("ru");

    for (let i = 0; i < 4; i++){
        let limit = randomChoice([1, 4, 6, 8]);
        while (prevBlocks.length > 0 && prevBlocks[prevBlocks.length - 1] === limit || (prevBlocks.length > 1 && prevBlocks[prevBlocks.length - 2] === limit)) {
            limit = randomChoice([1, 4, 6, 8]);
        }

        prevBlocks.push(limit);
        let posts = null;
        await loadPosts( null, category_id, start, limit, null)
            .then(response => posts = response.data.posts.map(post => {
                if ( post.eventDate != null ) {
                    const eventDate = moment(post.eventDate);
                    post.eventDate = {
                        day: eventDate.format("DD"),
                        mouth: eventDate.format("DD MMMM").replace(/\d|\s/g, ''),
                        full: eventDate.format("DD MMMM YYYY")
                    }
                }
                return post;
            }))
            .catch(reason => console.log(reason));
        items.push({posts, uid})
        start += limit;
        uid += 1;
    }

    return { category, categorySlug, prevBlocks, uid, start, items, postsCount };
}

