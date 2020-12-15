import { Component } from 'react';
import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import { withRouter } from "next/router";

import containers from "../styles/Containers.module.css";

import wrapper from "../store";
import { randomChoice } from "../tools";
import { PostsLine } from "../infinityBlocks";
import { changeInfinityState } from "../actions/common";

const Error = dynamic(() => import("./_error"));
const JournalHeader = dynamic(() => import("../components/Journal/Header"));
const InfinityPosts = dynamic( () => import("../compilations/InfinityPosts"));


export const getStaticProps = wrapper.getStaticProps(
    async ({store, res, ...props}) => {
        const { getRubrics } = require('../api/methods/public.react');
        const rubrics = await getRubrics()
            .then(response => response.data.rubrics)
            .catch(reason => {
                console.log("Something wrong with getting rubrics -> ", reason);
                return 502;
            });

        let props_data = { rubrics };

        if ( typeof rubrics === "number") {
            res.statusCode = rubrics;
            props_data.errorCode = rubrics;
        }else{
            props_data.initial = [];

            for ( let i = 0; i < 2; i++ ){
                const blockIdentifier = Object.keys(InfinityComponents)[0];
                const blockData = await InfinityComponents[blockIdentifier].fetchMore({
                    ...store.getState().common,
                    dispatch: store.dispatch
                });

                props_data.initial.push({
                    id: blockIdentifier,
                    data: blockData
                });
            }
        }

        return {
            revalidate: 36000,
            props: props_data
        };
    }
);

const InfinityComponents = {
    ...PostsLine("posts-line", 3, 4),
    ...PostsLine("post-ad", 1, 1, "leftAd"),
    ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
}

class Archive extends Component {
    componentDidMount() {
        this.props.dispatch(changeInfinityState(true));
    }


    render(){
        const { rubrics, initial, errorCode } = this.props;
        if ( errorCode ) return <Error statusCode={errorCode}/>;

        return (
            <>
                <JournalHeader rubrics={rubrics}>Статьи</JournalHeader>
                <div className={containers.CommonContainer}>
                    {
                        initial.map(({id, data}) => {
                            if ( InfinityComponents[id] === undefined ) return <></>;
                            const { Component } = InfinityComponents[id];
                            return <Component {...data}/>
                        })
                    }
                    <InfinityPosts blocks={InfinityComponents}/>
                </div>
            </>
        );
    }
}

export default connect()(withRouter(Archive));