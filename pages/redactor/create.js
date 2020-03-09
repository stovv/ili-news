import dynamic from 'next/dynamic'

const DynamicCreate = dynamic(
    () => import('../../components/redactor/redactor.react'),
    { ssr: false }
)

function create(){
    return (
        <DynamicCreate/>
    )
}

export default create;
