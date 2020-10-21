
export async function getServerSideProps(context){
    return {
        props: {
            test: 1
        }
    }
}

export default function Category({props}){
    return <></>;
}