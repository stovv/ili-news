import { Component } from 'react';
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import Error from '../_error';
import wrapper from "../../store";
import containers from '../../styles/Containers.module.css';

import { PostsLine } from '../../infinityBlocks';
import { randomChoice } from "../../tools";

const JournalHeader = dynamic(() => import("../../components/Journal/Header"));
const InfinityPosts = dynamic(() => import("../../compilations/InfinityPosts"));

const InfinityComponents = {
    ...PostsLine("posts-line", 2, 4),
    ...PostsLine("post-ad", 1, 1, "leftAd"),
    ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
}

export const getStaticProps = wrapper.getStaticProps(
    async ({store, params: {categorySlug}, ...props}) => {
        const { getCategory } = require("../../api/methods/public.react");

        const category = await getCategory(categorySlug)
            .then(response => response.data.length > 0 ? response.data[0] : 404)
            .catch(reason => {
                console.log("Something wrong with getting category by Slug -> ", reason);
                return 502;
            });

        let props_data = { category };
        if ( typeof category === "number" ) {
            props_data = { errorCode: category, category: {} }
        }else{
            const blockIdentifier = Object.keys(InfinityComponents)[0];
            const blockData = await InfinityComponents[blockIdentifier].fetchMore({
                ...store.getState().common,
                category: category.id,
                dispatch: store.dispatch
            });

            props_data.initial = [{
                id: blockIdentifier,
                data: blockData
            }];
        }

        return {
            revalidate: 36000,
            props: props_data
        };
    }
);

export async function getStaticPaths() {
    const { fetchCategories } = require("../../api/methods/public.react");
    // Call an external API endpoint to get posts
    const slugs = await fetchCategories(["slug"])
        .then(response => {
            return response.data.categories.map(category => ({
                params: {
                    categorySlug: category.slug
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
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.category.id !== this.props.category.id) {
            this.setState({rebuild: true});
        }
    }

    render(){
        const { router, category: { id, title, rubrics } = {}, initial = [], errorCode } = this.props;
        const { rebuild } = this.state;

        if (router.isFallback) {
            return <></>
        }

        if ( errorCode ){
            return <Error statusCode={errorCode}/>
        }
        const initialBlocks = initial.map(({id, data}) => {
            const { Component } = InfinityComponents[id];
            return <Component {...data}/>
        });

        if (rebuild) {
            this.setState({rebuild: false});
            return <section>
                <JournalHeader rubrics={rubrics}>{title}</JournalHeader>
                <div className={containers.CommonContainer}>
                    { initialBlocks }
                </div>
            </section>
        }

        return (
            <section>
                <JournalHeader rubrics={rubrics}>{title}</JournalHeader>
                <div className={containers.CommonContainer}>
                    { initialBlocks }
                    <InfinityPosts blocks={InfinityComponents}
                                   additionalProps={{category: id}}/>
                </div>
            </section>
        );

    }
}

export default withRouter(Category);