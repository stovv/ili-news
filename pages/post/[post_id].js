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
            .catch(reason=>{
                //TODO Add Toast
                console.log(reason);
            });

        return {post : current_post, amp: amp}
    }

    render(){
        if (this.props.post === null){
            return <Error statusCode={404}/>;
        }
        // TODO AMP Checking
        // TODO Use this.props.user for head component
        return (<p>{this.props.post.content} {this.props.amp}</p>);
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(Post));
