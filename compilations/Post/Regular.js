import React from 'react';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Common } from "../../actions";
import PopularPostsAdSide from "../PopularPostsAdSide";
import { Post as PostComponents, PostBlocks, Blocks } from "../../components";

import { Default, PostMarginContainer, RightSidePost, LeftSidePost } from '../../components/Containers';
const Images = dynamic(import("../../components/Images"));


class RegularPost extends React.Component{
    componentDidMount() {
        this.props.dispatch(Common.changeInfinityState(false))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { post, dispatch } = this.props;
        if ( post && prevProps.post.slug !== post.slug){
            dispatch(Common.changeInfinityState(false))
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext){
        return nextProps.post.id !== this.props.post.id || nextProps.width !== this.props.width;
    }

    render(){
        const { post, popularPosts, readMore, width, clientIp } = this.props;
        const { title, rubric, slug, authors, cover, publish_at, eventDate, eventLink, eventLocation, eventPrice,
            blocks: { blocks }, commentThread, rating } = post;

        return (
            <Default>
                <PostComponents.Header rubric={rubric.title} slug={slug} authors={authors}
                                       date={publish_at} cover={cover} eventDate={eventDate}>
                    {title}
                </PostComponents.Header>
                { rubric.cover && <Images.Lazy cover={cover} width="100%" height={width > 1023 ? "560px" : "229px"}/> }
                <PostMarginContainer>
                    <LeftSidePost>
                        {
                            (eventLink != null && eventLocation != null && eventPrice != null)
                            && <Blocks.EventBanner data={{ eventLink, eventLocation, eventPrice, eventDate  }}/>
                        }
                        <PostBlocks data={blocks}/>
                        <PostComponents.Footer slug={slug} clientId={clientIp} commentThreadId={commentThread.id}
                                               rating={rating} readMore={readMore}/>
                    </LeftSidePost>
                    <RightSidePost>
                        <PopularPostsAdSide posts={popularPosts}/>
                    </RightSidePost>
                </PostMarginContainer>
            </Default>
        );
    }
}

RegularPost.propTypes = {
    post: PropTypes.object.isRequired,
    popularPosts: PropTypes.array,
    readMore: PropTypes.array
}

function mapStateToProps(state){
    return{
        width: state.common.pageSize.width
    }
}

export default connect(mapStateToProps)(RegularPost);