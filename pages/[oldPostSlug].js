import React from 'react';
import Router from 'next/router';

import { Public } from '../api';
import Error from './_error';

class OldPost extends React.Component{
    static async getInitialProps({ query: { oldPostSlug }, ...props}) {
        var postId = null;
        await Public.getPostIdBySlug(oldPostSlug)
            .then(response => {
                if (response.data.posts.length > 0){
                    postId = response.data.posts[0].id;
                }
            })
            .catch(reason => {
                // TODO Add Reason processing
            });
        return {postId}
    }

    render(){
        if (this.props.postId === null){
            return <Error statusCode={404}/>;
        }
        if (typeof window !== 'undefined'){
            Router.push(`/post/${this.props.postId}`);
        }
        return (<></>);
    }
}

export default OldPost;
