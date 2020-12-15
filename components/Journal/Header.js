import dynamic from "next/dynamic";

const Emoji = dynamic(() => import('react-apple-emojis'));
const TagBar = dynamic(() => import("../Forms/TagBar"));
const Heading = dynamic(() => import("../Typography/Heading"));

// Emoji list here https://emojipedia.org/apple/
export default function JournalHeader({children, rubrics, emoji, description}){
    return (
        <>
            <Heading level={1} margin={"88px 0 0 0"} textAlign={"center"} >
                {children}
                { emoji && <Emoji name={emoji} width={46}/> }
            </Heading>
            {
                description &&
                <Heading level={5} margin={"14px 0 0 0"}
                         textAlign={"center"} color={"var(--text-secondary)"}>
                    {description}
                </Heading>
            }
            <div style={{marginBottom: "32px"}}/>
            {
                rubrics &&
                    <div style={{height: "104px", padding: "var(--spacing-block) 0"}}>
                        <TagBar tags={rubrics.map(rubric => ({
                            text: rubric.title,
                            link: { rubric }
                        }))}/>
                    </div>
            }
            <div style={{marginBottom: "26px"}}/>
        </>

    );
}