import containers from "../styles/Containers.module.css";
import JournalHeader from "../components/Journal/Header";
import wrapper from "../store";

import { getRubrics, loadPosts } from '../api/methods/public.react';
import Error from "./_error";

export const getServerSideProps = wrapper.getServerSideProps(
    async ({store, res, ...props}) => {

        const rubrics = await getRubrics()
            .then(response => response.data.rubrics)
            .catch(reason => {
                console.log("Something wrong with getting rubrics -> ", reason);
                return 502;
            });

        const posts = await loadPosts(null, null, 0, 7, null)
            .then(response => response.data.posts)
            .catch(reason => {
                console.log("Something wrong with loading archive posts -> ", reason);
                return 502;
            });

        if ( typeof rubrics === "number" || typeof posts === "number") {
            res.statusCode = typeof rubrics === "number" ? rubrics : posts;
            return { props: { errorCode: typeof rubrics === "number" ? rubrics : posts } }
        }

        return {
            props: { rubrics, posts }
        };
    }
);

export default function Archive({rubrics, errorCode, posts}){

    if ( errorCode ){
        return <Error statusCode={errorCode}/>
    }

    return (
        <>
            <JournalHeader rubrics={rubrics}>Статьи</JournalHeader>
            <div className={containers.CommonContainer}>

            </div>
        </>
    );
}