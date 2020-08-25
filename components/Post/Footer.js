import React from "react"
import { Flex } from 'rebass';
import PropTypes from 'prop-types';
import styled, { withTheme } from "styled-components";

import { Icons } from "../../assets";
import { ReadMoreBlock } from '../UniversalBlock';
import { RatingCounter } from './Components/Typo';
import { LikeBar, Bookmark, Comments } from '../Forms';


const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  margin-top: 70px;
  margin-bottom: 46px;
  
  @media screen and ( min-width: 1024px ){
      margin-left: 26px;
      margin-right: 26px;
  }
  
  @media screen and ( max-width: 1023px ){
      margin-left: 4px;
      margin-right: 4px;
  }
`;


class PostFooter extends React.Component{
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.slug !== this.props.slug;
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if ( prevProps.slug !== this.props.slug ){
    //         this.forceUpdate();
    //     }
    // }

    render() {
        const { rating, clientId, slug, readMore, commentThreadId } = this.props;
        const { theme } = this.props;

        return (
            <>
                <FooterWrapper>
                    <Flex my="auto">
                        <LikeBar rating={rating} clientId={clientId}/>
                        <Icons.CommentsIcon style={theme.post.footer.iconSpacing.comments}/>
                        <RatingCounter>10</RatingCounter>
                    </Flex>
                    <Flex my="auto">
                        <Bookmark slug={slug}/>
                        <Icons.EyeIcon style={theme.post.footer.iconSpacing.view}/>
                        <RatingCounter>{rating.views}</RatingCounter>
                    </Flex>
                </FooterWrapper>
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

export default withTheme(PostFooter);