import React from 'react';
import { withRouter } from 'next/router';
import Error from 'next/error';
import Head from 'next/head';
import { connect } from "react-redux";
import {getPost} from '../../../api';
import generate_jsx from '../../../tools/generator.react';
import {BACKEND_URL, SITE_URL} from '../../../tools/constants';


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

        return {
            error: current_post ? null : 404,
            created_at: current_post.publication_date ? current_post.publication_date : current_post.created_at,
            title : current_post.title,
            cover: `${BACKEND_URL}/${current_post.cover.url}`,
            current_url: `${SITE_URL}/post/${post_id}`,
            description: current_post.description,
            blocks: current_post.blocks.blocks,
            meta_tags: current_post.meta_tags,
            authors: current_post.users ? current_post.users : [],
            amp: amp
        }
    }

    render(){
        const {blocks, amp, error} = this.props;
        
        if (error !== null){
            return <Error statusCode={error}/>;
        }
        // TODO AMP Checking
        // TODO Use this.props.user for head component

        return (
            <>
            <Head>
                <title>{this.props.title}</title>
                <meta name="title" content={this.props.title}/>
                <meta name="description" content={this.props.description}/>
                <meta property="article:published_time" content={this.props.created_at}/>
                {/*TODO: Add author url*/}
                {this.props.authors.map(item=><meta property="article:author" content={item.id}/>)}
                {this.props.meta_tags.map((item,index)=><React.Fragment key={index}><meta property="article:tag" content={item.tag}/></React.Fragment>)}

                <meta property="og:locale" content="ru_RU"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={this.props.current_url}/>
                <meta property="og:title" content={this.props.title}/>
                <meta property="og:description" content={this.props.description}/>
                <meta property="og:image" content={this.props.cover}/>
                
                <meta property="og:site_name" content="Молодежный журнал ИЛИ"/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={this.props.current_url}/>
                <meta property="twitter:title" content={this.props.title}/>
                <meta property="twitter:description" content={this.props.description}/>
                <meta property="twitter:image" content={this.props.cover}/>
            </Head>
            {generate_jsx(blocks)}
            </>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(Post));
