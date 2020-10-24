//import CompsBannerAd from "../compilations/CompsBannerAd";
import KudaGo from "../components/Forms/KudaGo";
import { loadPosts } from "../api/methods/public.react";
import dayjs from "dayjs";


export async function getServerSideProps(){
    const posts = await loadPosts(null, null, null, 10, null)
        .then(response => response.data.posts)
        .catch(reason => null);

    return {
        props: {
            posts
        }
    }
}

export default function TT ({posts}) {
    console.log(dayjs().month(0).day(0).toISOString(), dayjs().toISOString());
    return (<KudaGo posts={posts}/>);
}