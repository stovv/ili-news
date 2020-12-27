import { Component } from 'react';
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import wrapper from "../store";
import Header from "../components/Post/Header";

import { PostContainer } from '../styles/Containers.module.css';

const Error = dynamic(() => import('./_error'));

export const getStaticProps = wrapper.getStaticProps(
    async ({store, params: {slug}, ...props}) => {
        const { getPost } = require("../api/methods/public.react");

        const post = await getPost(slug)
            .then(response => response.data.length > 0 ? response.data[0] : 404)
            .catch(reason => {
                console.log("Something went wrong with getting post -> ", reason);
                return 404;
            });

        let props_data = { };
        if ( typeof post === "number") {
            props_data.errorCode = post;
        }else{

            props_data.post = {
                ...post,
                authors: post.authors.map(author => {
                  let additionalData = {};
                  if ( post.authorsDescription.length > 0 ){
                      for (let descr of post.authorsDescription){
                          if ( descr.author.id === author.id){
                              const { icon, roleDescription } = descr;
                              additionalData = {
                                  icon,
                                  roleDescription,
                              }
                          }
                      }
                  }
                  return {
                      ...author,
                      ...additionalData
                  }
                })
            };
        }

        return {
            revalidate: 36000,
            props: props_data
        };
    }
);

export async function getStaticPaths() {
    const { fetchPosts } = require("../api/methods/public.react");

    const slugs = [];
    let start = 0;
    let stop = false;

    while (!stop){
        await fetchPosts(["slug"], start, 100)
            .then(response => {
                if ( response.data.posts.length === 0 ){
                    stop = true;
                } else {
                    response.data.posts.forEach(post => {
                        slugs.push({
                            params: {
                                slug: post.slug
                            }
                        })
                    });
                }
            })
            .catch(reason => {
                stop = true;
                console.log("Something went wrong with fetching posts slugs -> ", reason)
            })
        start += 100;
    }

    return { paths: slugs, fallback: true}
}


const PostStructure = ({ data }) =>(
    <>
        <Header data={data}/>
    </>
);


class Post extends Component{
    render(){
        const { errorCode, router, post, popularPosts, readMoreLinks } = this.props;

        if ( router.isFallback ) return null;
        if ( errorCode ) return <Error statusCode={errorCode}/>;
        const isInfinity = post.rubric && post.rubric.infinityScroll;

        // TODO AMP Checking
        // TODO Use this.props.user for head component

        return (
            <div className={PostContainer}>
                {/*<Seo post={current_post}/>*/}
                <Header data={post}/>
            </div>
        );
    }
}


export default withRouter(Post);