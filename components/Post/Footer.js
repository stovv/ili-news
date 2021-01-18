import React from "react"
import PropTypes from 'prop-types';

import styles from './styles/postFooter.module.css';
import { Icons } from "../../assets";
import { ReadMoreBlock } from '../UniversalBlock';
import { RatingCounter } from './Typo';
import { LikeBar, Bookmark, Comments } from '../Forms';
import { Flex } from 'reflexbox';

class PostFooter extends React.Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    render() {
        const { rating, clientId, slug, readMore, commentThreadId } = this.props;

        return (
            <>
                <div className={styles.postFooterWrapper}>
                    <Flex my="auto">
                        <LikeBar rating={rating} clientId={clientId}/>
                        {/*<Icons.CommentsIcon style={theme.post.footer.iconSpacing.comments}/>*/}
                        {/*<RatingCounter>10</RatingCounter>*/}
                    </Flex>
                    <Flex my="auto">
                        {/*<Bookmark slug={slug}/>*/}
                        <Icons.EyeIcon style={{
                            margin: "auto 9px auto 0"
                        }}/>
                        <RatingCounter>{rating.views}</RatingCounter>
                    </Flex>
                </div>
                {
                    commentThreadId && <Comments threadId={commentThreadId}/>
                }
                {
                    readMore && <ReadMoreBlock post data={readMore}/>
                }
            </>
        );
    }
}

PostFooter.propTypes = {
    slug: PropTypes.string.isRequired,
    rating: PropTypes.object.isRequired,
    clientId: PropTypes.string.isRequired,

    readMore: PropTypes.array,
    commentThreadId: PropTypes.number,
}

export default PostFooter;