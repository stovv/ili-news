import { Component } from 'react';
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { withRouter } from "next/router";

// css
import containers from "../../styles/Containers.module.css";

// local functions
import wrapper from "../../store";
import { PostsLine } from "../../infinityBlocks";
import { randomChoice } from "../../tools";
import {changeInfinityState} from "../../actions/common";

// local blocks
const Error = dynamic(() => import("../_error"));
const Seo = dynamic(() => import("../../components/Seo/Rubric"));
const JournalHeader = dynamic(() => import("../../components/Journal/Header"));
const InfinityPosts = dynamic(() => import("../../compilations/InfinityPosts"));


const InfinityComponents = {
    ...PostsLine("posts-line", 2, 4),
    ...PostsLine("post-ad", 1, 1, "leftAd"),
    ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
}

export const getStaticProps = wrapper.getStaticProps(
    async ({store, params: {slug}, ...props}) => {
        const { getRubric, getPostCountInRubric } = require("../../api/methods/public.react");

        const rubric = await getRubric(slug)
            .then(response => response.data.length > 0 ? response.data[0] : 404)
            .catch(reason => {
                console.log("Something wrong with getting rubric by Slug -> ", reason);
                return 502;
            });

        let props_data = { rubric };

        if ( typeof rubric === "number") {
            props_data.errorCode = rubric;
        }else{
            const postsCount = await getPostCountInRubric(rubric.id)
                .then(response => response.data)
                .catch(reason => {
                    console.log("Something went wrong in getting posts count by rubric -> ", reason);
                    return 0;
                });
            props_data.postsCount = postsCount;

            if ( postsCount > 0 ){
                props_data.initial = [];

                for (let i = 0; i < 2; i++){
                    const blockIdentifier = Object.keys(InfinityComponents)[0];
                    const blockData = await InfinityComponents[blockIdentifier].fetchMore({
                        ...store.getState().common,
                        rubric: rubric.id,
                        dispatch: store.dispatch
                    });
                    props_data.initial.push({
                        id: blockIdentifier,
                        data: blockData
                    });
                }
            }

            if ( props_data.rubric.category === null ){
                props_data.rubric.category = {
                    title: "",
                    description: ""
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
    const { fetchRubrics } = require("../../api/methods/public.react");

    const slugs = await fetchRubrics(["slug"])
        .then(response => {
            return response.data.rubrics.map(rubric => ({
                params: {
                    slug: rubric.slug
                }
            }));
        });
    return { paths: slugs, fallback: true}
}


class Rubric extends Component {
    state = {
        rebuild: false
    }

    componentDidMount() {
        this.props.dispatch(changeInfinityState(true));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rubric.id !== this.props.rubric.id) {
            this.setState({rebuild: true});
            this.props.dispatch(changeInfinityState(true));
        }
    }

    render(){
        const {
            router, initial = [], errorCode, postsCount,
            rubric: { id, slug, title, subtitle, category = { title: "", description: "" }, emoji } = {}
        } = this.props;
        const { rebuild } = this.state;

        if (router.isFallback) return <></>;
        if ( errorCode ) return <Error statusCode={errorCode}/>;

        const initialBlocks = initial.map(({id, data}) => {
            const { Component } = InfinityComponents[id];
            return <Component {...data}/>
        });

        if (rebuild) this.setState({rebuild: false});

        return (
            <>
                <Seo slug={slug} title={title} subtitle={subtitle} category={category}/>
                <section>
                    <JournalHeader emoji={emoji} description={subtitle}>{title}</JournalHeader>
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
                            <InfinityPosts blocks={InfinityComponents} additionalProps={{rubric: id}}/>
                        }
                    </div>
                </section>
            </>
        );

    }
}

export default connect()(withRouter(Rubric));
