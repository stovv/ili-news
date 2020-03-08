import React from 'react';
import { withRouter } from 'next/router';
import Error from './_error';
import { connect } from "react-redux";
import {fetchPosts, getPost} from '../api';


class Post extends React.Component{
    static async getInitialProps({ query: { old_post_slug }, store, isServer, pathname}) {
        var post_id = null;
        await fetchPosts(['slug', 'id'])
            .then(response => {
                response.data.data.posts.map(post =>{
                    if (post.slug === old_post_slug){
                        post_id = post.id;
                    }
                });

            })
            .catch(reason => {
                // TODO Add Reason processing
            });

        var post = null;
        await getPost(post_id)
            .then(response => {
                post = response.data;
            })
            .catch(reason=>{
                console.log(reason)
                // TODO Add Reason processing
            });
        //store.dispatch({ type: "FOO", payload: "foo" });
        return {post : post}
    }

    render(){
        //console.log(this.props);
        if (this.props.post === null){
            return <Error statusCode={404}/>;
        }
        return (<p>{this.props.post.content}</p>);
    }
}

export default connect()(withRouter(Post));
