import dynamic from 'next/dynamic'

const DynamicCreate = dynamic(
    () => import('../../components/editor/create.react'),
    { ssr: false }
  )

function create(){
    return (
        <DynamicCreate/>
    )
}

export default create;
