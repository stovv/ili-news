import React from "react"
import PropTypes from 'prop-types';

import { Icons } from "../../assets";
import { ReadMoreBlock } from '../UniversalBlock';
import { RatingCounter } from './Components/Typo';
import { LikeBar, Bookmark, Comments } from '../Forms';
import { Flex } from 'reflexbox';
import styles from './styles/footer.module.css';

class PostFooter extends React.Component{
    render() {
        const { rating, clientId, slug, readMore, commentThreadId } = this.props;

        return (
            <>
                <div className={styles.footerWrapper}>
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