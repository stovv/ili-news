import React from 'react';
import { withRouter } from 'next/router';
import Error from 'next/error';
import { connect } from "react-redux";
import {fetchPosts, getPost} from '../../api';


class Post extends React.Component{
    static async getInitialProps({ query: { post_id }, store, isServer, pathname}) {
        var current_post = null;
        await getPost(post_id)
            .then(response=>{
                current_post = response.data;
            })
            .catch();

        //store.dispatch({ type: "FOO", payload: "foo" });
        return {post : current_post}
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
