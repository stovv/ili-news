import React from 'react';
import { withRouter } from 'next/router';
import Error from 'next/error';
import { connect } from "react-redux";
import {fetchPosts, getPost} from '../../api';
import { useAmp } from 'next/amp';

export const config = { amp: 'hybrid' };

class Post extends React.Component{
    static async getInitialProps({ query: { post_id, amp}, store, isServer, pathname, }) {
        var current_post = null;
        await getPost(post_id)
            .then(response=>{
                current_post = response.data;
            })
            .catch();

        //store.dispatch({ type: "FOO", payload: "foo" });
        return {post : current_post, amp: amp}
    }

    render(){
        if (this.props.post === null){
            return <Error statusCode={404}/>;
        }
        //console.log(this.props)
        // TODO AMP Checking
        return (<p>{this.props.post.content} {this.props.amp}</p>);
    }
}

export default connect()(withRouter(Post));
