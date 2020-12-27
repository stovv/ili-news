import Error from "../_error";
import wrapper from "../../store";
import { getRubric } from "../../api/methods/public.react";
import JournalHeader from "../../components/Journal/Header";


export const getServerSideProps = wrapper.getServerSideProps(
    async ({store, query: { rubricSlug }, res, ...props}) => {

        const rubric = await getRubric(rubricSlug)
            .then(response => response.data.length > 0 ? response.data[0] : 404)
            .catch(reason => {
                console.log("Something wrong with getting rubric by Slug -> ", reason);
                return 502;
            });

        if ( typeof rubric === "number") {
            res.statusCode = rubric;
            return { props: { errorCode: rubric } }
        }

        return {
            props: { rubric }
        };
    }
);


export default function Rubric ({errorCode, rubric: { title } = {} }){
    if ( errorCode ){
        return <Error statusCode={errorCode}/>
    }

    return <>
            <JournalHeader>{title}</JournalHeader>
        </>
}
