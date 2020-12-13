import containers from "../styles/Containers.module.css";
import JournalHeader from "../components/Journal/Header";
import wrapper from "../store";

import { randomChoice } from "../tools";
import Error from "./_error";

import InfinityPosts from "../compilations/InfinityPosts";
import { PostsLine } from "../infinityBlocks";

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
            const blockIdentifier = Object.keys(InfinityComponents)[0];
            const blockData = await InfinityComponents[blockIdentifier].fetchMore({
                ...store.getState().common,
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

const InfinityComponents = {
    ...PostsLine("posts-line", 3, 4),
    ...PostsLine("post-ad", 1, 1, "leftAd"),
    ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
}

export default function Archive({rubrics, errorCode, initial}){
    if ( errorCode ){
        return <Error statusCode={errorCode}/>
    }

    return (
        <>
            <JournalHeader rubrics={rubrics}>Статьи</JournalHeader>
            <div className={containers.CommonContainer}>
                {
                    initial.map(({id, data}) => {
                        const { Component } = InfinityComponents[id];
                        return <Component {...data}/>
                    })
                }
                <InfinityPosts blocks={InfinityComponents}/>
            </div>
        </>
    );
}