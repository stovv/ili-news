import {Component, Fragment} from 'react';
import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import { withRouter } from "next/router";

import wrapper from "../../store";
import containers from '../../styles/Containers.module.css';

import { PostsLine } from '../../infinityBlocks';
import { randomChoice } from "../../tools";
import { changeInfinityState } from "../../actions/common";

const Error = dynamic(() => import('../_error'));
const Seo = dynamic(() => import("../../components/Seo/Category"));
const JournalHeader = dynamic(() => import("../../components/Journal/Header"));
const InfinityPosts = dynamic(() => import("../../compilations/InfinityPosts"));

const InfinityComponents = {
    ...PostsLine("posts-line", 2, 4),
    ...PostsLine("post-ad", 1, 1, "leftAd"),
    ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
}

export const getStaticProps = wrapper.getStaticProps(
    async ({store, params: {slug}, ...props}) => {
        const { getCategory, countPostsByCategory } = require("../../api/methods/public.react");

        const category = await getCategory(slug)
            .then(response => response.data.length > 0 ? response.data[0] : 404)
            .catch(reason => {
                console.log("Something wrong with getting category by Slug -> ", reason);
                return 502;
            });

        let props_data = { category };
        if ( typeof category === "number" ) {
            props_data = { errorCode: category, category: {} }
        }else{
            const postsCount = await countPostsByCategory(category.id)
                .then(response => response.data)
                .catch(reason => {
                    console.log("Something went wrong in getting posts count by category -> ", reason);
                    return 0;
                });
            props_data.postsCount = postsCount;

            if (postsCount > 0){
                props_data.initial = [];

                for ( let i = 0; i < 2; i++ ){
                    const blockIdentifier = Object.keys(InfinityComponents)[0];
                    const blockData = await InfinityComponents[blockIdentifier].fetchMore({
                        ...store.getState().common,
                        category: category.id,
                        dispatch: store.dispatch
                    });

                    props_data.initial.push({
                        id: blockIdentifier,
                        data: blockData
                    });
                }
            }
        }

        return {
            revalidate: 36000,
            props: props_data
        };
    }
);

export async function getStaticPaths() {
    const { fetchCategories } = require("../../api/methods/public.react");

    const slugs = await fetchCategories(["slug"])
        .then(response => {
            return response.data.categories.map(category => ({
                params: {
                    slug: category.slug
                }
            }));
        });
    return { paths: slugs, fallback: true}
}

//const InfinityComponents = [
    // {
    //     id: "post-banner-left",
    //     required: true,
    //     fetchMore: () =>{},
    //     Component: (props) => <></>
    // },
    // {
    //     id: "post-banner-right",
    //     required: true,
    //     fetchMore: () =>{},
    //     Component: (props) => <></>
    // },

    // {
    //     id: "big-post-left",
    //     required: true,
    //     fetchMore: () =>{},
    //     Component: (props) => <></>
    // },
    // {
    //     id: "big-post-right",
    //     required: true,
    //     fetchMore: () =>{},
    //     Component: (props) => <></>
    // },
//];

class Category extends Component {
    state = {
        rebuild: false
    }

    componentDidMount() {
        this.props.dispatch(changeInfinityState(true));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.category !== undefined && prevProps.category.id !== this.props.category.id) {
            this.setState({rebuild: true});
            this.props.dispatch(changeInfinityState(true));
        }
    }

    render(){
        const { router, postsCount, errorCode, initial = [],
            category: { id, slug, title, description, rubrics } = {}} = this.props;
        const { rebuild } = this.state;

        if (router.isFallback) return <></>;
        if ( errorCode ) return <Error statusCode={errorCode}/>;

        let initialBlocks = initial.map(({id, data}, index) => {
            if ( InfinityComponents[id] === undefined ){
                return null;
            }
            const { Component } = InfinityComponents[id];
            return <Fragment key={index}><Component {...data}/></Fragment>
        });

        if (rebuild) this.setState({rebuild: false});

        return (
            <>
                <Seo slug={slug} title={title} description={description}/>
                <section>
                    <JournalHeader rubrics={rubrics}>{title}</JournalHeader>
                    <div className={containers.CommonContainer}>
                        {
                            !rebuild && initialBlocks
                        }
                        {
                            postsCount === 0 &&
                            <p>Здесь пока ничего нет</p>
                        }
                        {
                            ( !rebuild && postsCount > 0 ) &&
                            <InfinityPosts blocks={InfinityComponents}
                                           additionalProps={{category: id}}/>
                        }
                    </div>
                </section>
            </>
        );

    }
}

export default connect()(withRouter(Category));