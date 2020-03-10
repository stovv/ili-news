import dynamic from 'next/dynamic'
const RedactorSSRSafe = dynamic(import('../../components/redactor/redactor.react'), {
    ssr: false
})

function Create(){
    return(
        <RedactorSSRSafe/>
    )
}

export default Create;