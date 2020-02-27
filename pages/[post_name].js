import Link from "next/link";
import React from 'react';
import { withRouter } from 'next/router';
import { connect } from "react-redux";


class Post extends React.Component{
    static async getInitialProps({ query: { post_name }, store, isServer, pathname}) {
        store.dispatch({ type: "FOO", payload: "foo" });
        return {post_name : post_name}
    }

    render(){
        console.log(this.props);
        return (<h1>Comment: {this.props.post_name}</h1>);
    }
}

export default connect()(withRouter(Post));
