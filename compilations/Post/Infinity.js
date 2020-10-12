import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { Public } from "../../api";
import { Common } from "../../actions";
import PopularPostsAdSide from '../PopularPostsAdSide';
import { Post as PostComponents, PostBlocks, Containers, Form } from "../../components";
import { Flex } from 'reflexbox';
import styles from './styles/infinity.module.css';


const PostContent = ({post}) =>{
    const {title, rubric, slug, authors, cover, publish_at, blocks: { blocks }, clientIp, commentThread, rating} = post;
    return (
        <>
            <PostComponents.Header rubric={rubric.title} slug={slug} authors={authors}
                                   date={publish_at} cover={cover}>
                {title}
            </PostComponents.Header>
            <PostBlocks data={blocks}/>
            <PostComponents.Footer slug={slug} clientId={clientIp} commentThreadId={commentThread.id} rating={rating}/>
        </>
    );
};


class InfinityPost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
            start: 0,
            skipPostIds: [ props.post.id ],
            items: []
        }
        this.fetchMore = this.fetchMore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(Common.changeInfinityState(true));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { post, dispatch } = this.props;
        if ( post && prevProps.post.slug !== post.slug){
            dispatch(Common.changeInfinityState(true));
        }
    }

    async fetchMore(){
        const { dispatch, clientIp, post } = this.props;
        const { rubric } = post;
        const { start, skipPostIds } = this.state;
        let items = [];
        let posts = [];

        await Public.loadPosts( rubric.id, null, start, 3, skipPostIds)
            .then(response => posts = response.data.posts)
            .catch(reason => {
                console.log("Something wrong with load infinity posts -> ", reason);
            });

        if ( posts == null || posts.length === 0){
            this.setState({
                hasMore: false
            })
            dispatch(Common.changeInfinityState(false));
            return;
        }

        items = posts.map((post, index) => {
            Public.viewPost(post.rating.id, clientIp)
                .catch(reason => console.log("Something wrong with view infinity posts -> ", reason));

            return (
                <React.Fragment key={index}>
                    <div className={styles.dividerWrapper}><div className={styles.divider}/></div>
                    <PostContent post={post}/>
                </React.Fragment>
            )
        })

        this.setState({
            items: this.state.items.concat([
                items
            ]),
            start: this.state.start + 3,
        })
    }

    render(){
        const { post, popularPosts, width } = this.props;
        const { items, hasMore } = this.state;

        return (
            <Containers.Default>
                <Flex>
                    <Containers.LeftSidePost>
                        <PostContent post={post}/>
                        <InfiniteScroll
                            dataLength={items.length}
                            next={this.fetchMore}
                            hasMore={hasMore}
                            loader={<Form.Loader/>}>
                            {items}
                        </InfiniteScroll>
                    </Containers.LeftSidePost>
                    <Containers.RightSidePost>
                        <PopularPostsAdSide posts={popularPosts} sticky/>
                    </Containers.RightSidePost>
                </Flex>
            </Containers.Default>
        )
    }
}


function mapStateToProps(state){
    return {
        width: state.common.pageSize.width
    }
}

InfinityPost.propTypes = {
    post: PropTypes.object.isRequired,
    popularPosts: PropTypes.array
}

export default connect(mapStateToProps)(InfinityPost);