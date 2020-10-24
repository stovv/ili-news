import dynamic from "next/dynamic";

import Error from '../_error';
import wrapper from "../../store";
import containers from '../../styles/Containers.module.css';
import { getCategory } from "../../api/methods/public.react";

const JournalHeader = dynamic(() => import("../../components/Journal/Header"));


export const getServerSideProps = wrapper.getServerSideProps(
    async ({store, query: { categorySlug }, res, ...props}) => {

        const category = await getCategory(categorySlug)
            .then(response => response.data.length > 0 ? response.data[0] : 404)
            .catch(reason => {
                console.log("Something wrong with getting category by Slug -> ", reason);
                return 502;
            });

        if ( typeof category === "number") {
            res.statusCode = category;
            return { props: { errorCode: category } }
        }

        return {
            props: { category }
        };
    }
);


export default function Category({category: { title, rubrics }, errorCode}){

    if ( errorCode ){
        return <Error statusCode={errorCode}/>
    }

    return (
        <>
            <JournalHeader rubrics={rubrics}>{title}</JournalHeader>
            <div className={containers.CommonContainer}>
            </div>
        </>
    );
}