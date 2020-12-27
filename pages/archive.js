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

        if ( typeof rubrics === "number") {
            res.statusCode = rubrics;
            return { props: { errorCode: rubrics } }
        }

        return {
            revalidate: 36000,
            props: { rubrics }
        };
    }
);

const InfinityComponents = {
    ...PostsLine("posts-line", 3, 4),
    ...PostsLine("post-ad", 1, 1, "leftAd"),
    ...PostsLine("six-posts-ad", 1, 6, () => randomChoice(["leftAd", "rightAd"])),
}

export default function Archive({rubrics, errorCode}){
    if ( errorCode ){
        return <Error statusCode={errorCode}/>
    }

    return (
        <>
            <JournalHeader rubrics={rubrics}>Статьи</JournalHeader>
            <div className={containers.CommonContainer}>
                <InfinityPosts blocks={InfinityComponents}/>
            </div>
        </>
    );
}